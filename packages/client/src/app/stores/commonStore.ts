import { RootStore } from "./rootStore";
import {
  observable,
  action,
  reaction,
  computed,
  makeAutoObservable,
  runInAction,
} from "mobx";
import agent from "../api/agent";
import { ToastMessage } from "../../App";

export default class CommonStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.current();
  }

  // @observable token: string | null = window.localStorage.getItem("accessToken");
  @observable isLoading = true;
  @observable sidebarOpen = true;
  @observable user: any = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action setSidebarOpen = (state: boolean) => {
    this.sidebarOpen = state;
  };

  @action login = async (e: any, email: string, password: string) => {
    e && e.preventDefault();
    try {
      const user = await agent.General.login({ email, password });
      this.user = user;
    } catch (error: any) {
      agent.axiosErrorHandler.handleError(error, {
        401: {
          message: "Incorrect credentials",
        },
        403: {
          message: "Incorrect credentials",
        },
        other: {
          message: "Failed to sign in",
        },
      });
    }
  };

  @action current = async () => {
    try {
      const profile = await agent.General.current();
      runInAction(() => {
        this.user = profile;
      });
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  };
}
