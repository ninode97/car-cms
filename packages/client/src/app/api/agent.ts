import axios, { AxiosResponse } from "axios";
import {
  Car,
  CarBrandResponse,
  CarModelResponse,
  CarsResponse,
  PostCar,
} from "../models/car";
import { GetCompaniesResponse } from "../models/company";
import { LoginCredentials } from "../models/general";

class Agent {
  constructor() {
    axios.defaults.baseURL = "http://127.0.0.1:5000";
    this.registerRequestInterceptors();
    this.registerResponseInterceptors();
  }

  get(url: string, withCreds = false) {
    return axios
      .get(url, {
        withCredentials: withCreds,
      })
      .then(this.responseBody);
  }
  getWithParams(url: string, params: any, withCreds = false) {
    return axios
      .get(url, { params, withCredentials: withCreds })
      .then(this.responseBody);
  }
  post(url: string, body: {}) {
    return axios.post(url, body, {}).then(this.responseBody);
  }
  put(url: string, body: {}) {
    return axios.put(url, body, {}).then(this.responseBody);
  }
  delete(url: string) {
    return axios.delete(url, {}).then(this.responseBody);
  }
  postForm(url: string, file: Blob) {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(this.responseBody);
  }

  responseBody(response: AxiosResponse) {
    return response.data;
  }

  registerRequestInterceptors() {
    axios.interceptors.request.use(
      (config: any) => {
        // const token = window.localStorage.getItem("accessToken");
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  registerResponseInterceptors() {
    axios.interceptors.response.use(undefined, (error) => {
      if (error.message === "Network Error" && !error.response) {
        // toast.error("Network error - make sure API is running!");
        throw error;
      }
      const { status } = error.response;

      if (status === 500) {
        // toast.error("Server error - check the terminal for more info!");
      }
      throw error.response;
    });
  }
}

const agent = new Agent();

const Car = {
  get: (skip = 0, take = 10): Promise<CarsResponse> =>
    agent.get(`/car?skip=${skip}&take=${take}`, true),
  post: (car: PostCar) => agent.post("/car", car),
};

const Brand = {
  get: (): Promise<CarBrandResponse> => agent.get(`/brand`),
};

const Model = {
  get: (id: number): Promise<CarModelResponse> =>
    agent.get(`/brand/${id}/model`),
};

const Company = {
  get: (): Promise<GetCompaniesResponse> => agent.get(`/company`),
};

const General = {
  login: (credentials: LoginCredentials): Promise<{}> =>
    agent.post("/auth/login", credentials),
};

export default {
  Car,
  Brand,
  Model,
  Company,
  General,
};
