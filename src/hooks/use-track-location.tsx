import {useState, useContext} from "react";
import {ACTION_TYPES, StoreContext} from "@/store/store.context";


const useTrackLocation = () => {
  const {dispatch} = useContext(StoreContext);
  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const changed = `53.52200116384087%2C13.403034667518336`
    // STATE MANAGEMENT - DISPATCH
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: {latLong: changed}
    })
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  }

  const error = () => {
    setIsFindingLocation(false);
    setLocationErrorMsg("Unable to retrieve your location");

  }

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setIsFindingLocation(false);
      setLocationErrorMsg("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

  }

  return {
    // latLong,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation
  }
}

export default useTrackLocation;