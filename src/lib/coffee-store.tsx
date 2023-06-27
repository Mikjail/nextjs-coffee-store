import {createApi} from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeShop = (latLong, query, limit) => {
  console.log('latLong', latLong)
  console.log('query', query);
  console.log('limit', limit);
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}

export const getCoffeeImages = async () => {

  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    perPage: 30,
    orientation: 'landscape',
  });

  return !photos.response ? [] : photos.response.results.map((result) => result.urls.small);
};

export const getCoffeeShops = async (latLong = '52.52200116384087,13.403034667518336', limit = 5) => {
  const photos = await getCoffeeImages();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    }
  };
  const resp = await fetch(getUrlForCoffeeShop(latLong, 'coffee', Number(limit)), options);

  const data = await resp.json();
  return data.results.map((result, index) => {
    const {location} = result;
    return {
      id: result.fsq_id,
      name: result.name,
      address: location.address,
      neighborhood: location.locality,
      imgUrl: photos[index] || null,
    }

  });
}