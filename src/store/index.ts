import { createContext, useContext } from "react";
import TankStore from "./TankStore";

const store = {
  tankStore: new TankStore(),
};

export const StoreContext = createContext({} as typeof store);

export const useStore = () => {
  return useContext(StoreContext) as typeof store;
};

export default store;
