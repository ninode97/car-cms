import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import CarsStore from "./carsStore";

configure({ enforceActions: "always" });

export class RootStore {
  commonStore: CommonStore;
  carsStore: CarsStore;

  constructor() {
    this.commonStore = new CommonStore(this);
    this.carsStore = new CarsStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
