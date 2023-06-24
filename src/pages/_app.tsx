import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {createContext, ReducerState, useReducer} from "react";

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_SHOPS: 'SET_COFFEE_SHOPS',
}

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return {...state, latLong: action.payload.latLong};
    case ACTION_TYPES.SET_COFFEE_SHOPS:
      return {...state, coffeeShops: action.payload.coffeeShops};
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const StoreContext = createContext();

const StoreProvider = ({children}) => {
  const initialState = {
    latLong: '',
    coffeeShops: [],
  }
  const [state, dispatch] = useReducer(storeReducer, initialState as ReducerState<{ latlong: string, coffeeShops: string }>);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export default function App({Component, pageProps}: AppProps) {
  return <StoreProvider><Component {...pageProps} /> </StoreProvider>
}
