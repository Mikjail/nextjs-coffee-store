import {createApi} from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeShop = (latLog, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLog}&limit=${limit}`;
}

export const getCoffeeImages = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    perPage: 30,
  });
  return photos.response.results.map((result) => result.urls.small);
};

export const getCoffeeShops = async () => {
  const photos = await getCoffeeImages();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    }
  };
  const resp = await fetch(getUrlForCoffeeShop('52.52200116384087%2C13.403034667518336', 'coffee', 5), options);
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