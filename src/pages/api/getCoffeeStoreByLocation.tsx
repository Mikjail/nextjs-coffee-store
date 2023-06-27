import {getCoffeeShops} from "@/lib/coffee-store";

const getCoffeeStoreByLocation = async (req, res) => {
  try {
    const {latLong, limit} = req.query;
    const response = await getCoffeeShops(latLong, limit);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'something went wrong!'});
  }
}

export default getCoffeeStoreByLocation;