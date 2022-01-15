import { RootStore } from "./rootStore";
import {
  observable,
  action,
  reaction,
  computed,
  makeAutoObservable,
} from "mobx";

export default class CommonStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("accessToken", token);
        } else {
          window.localStorage.removeItem("accessToken");
        }
        this.isLoading = false;
      }
    );
  }

  @observable token: string | null = window.localStorage.getItem("accessToken");
  @observable isLoading = true;
  @observable sidebarOpen = true;

  @computed get isLoggedIn() {
    return !!this.token;
  }

  @action setToken = (token: string) => {
    this.token = token;
    localStorage.setItem("accessToken", token);
  };

  @action clearToken = () => {
    localStorage.removeItem("accessToken");
    this.token = null;
  };

  @action setSidebarOpen = (state: boolean) => {
    this.sidebarOpen = state;
  };
}
