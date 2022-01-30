import { RootStore } from "./rootStore";
import {
  observable,
  action,
  reaction,
  computed,
  makeAutoObservable,
} from "mobx";
import agent from "../api/agent";

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

  @action login = async (e: any, email: string, password: string) => {
    e && e.preventDefault();
    try {
      const r = await agent.General.login({ email, password });
      this.setToken("a");
    } catch (error) {
      console.error(error);
    }
  };
}
