import axios, { AxiosError, AxiosResponse } from "axios";
import { ToastMessage } from "../../App";
import {
  Car,
  CarBrandResponse,
  CarModelResponse,
  CarsResponse,
  PostCar,
} from "../models/car";
import { GetCompaniesResponse } from "../models/company";
import { LoginCredentials, LoginResponse } from "../models/general";

class Agent {
  private baseURL: string;
  constructor() {
    this.baseURL = "http://127.0.0.1:5000";
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = this.baseURL;
    this.registerRequestInterceptors();
    this.registerResponseInterceptors();
  }

  get endpoint() {
    return this.baseURL;
  }

  get localeURL() {
    return `${this.baseURL}/lang/{{lng}}`;
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
  login: (credentials: LoginCredentials): Promise<LoginResponse> =>
    agent.post("/auth/login", credentials),

  current: () => agent.get("/auth/current", true),
  logout: () => agent.post("/auth/logout", {}),
};

export const Language = {
  loadPath: agent.localeURL,
};
interface ErrorData {
  message: string;
}

interface AxiosErrorData {
  [name: number]: ErrorData;
  other: {
    message: string;
  };
}

class AxiosErrorHandler {
  constructor() {}

  isAxiosError(error: any): error is AxiosResponse {
    return true;
  }

  handleError(error: any, statusCodeData: AxiosErrorData) {
    this.isAxiosError(error)
      ? this.handleAxiosError(error, statusCodeData)
      : this.handleUnkownError(error, statusCodeData);
  }
  handleAxiosError(error: AxiosResponse, statusCodeData: AxiosErrorData) {
    const statusCode = error.status;
    const errorData = statusCodeData[statusCode] || statusCodeData.other;
    ToastMessage("error", errorData.message);
  }
  handleUnkownError(error: any, statusCodeData: AxiosErrorData) {
    ToastMessage("error", statusCodeData.other.message);
  }
}

const axiosErrorHandler = new AxiosErrorHandler();

export default {
  Car,
  Brand,
  Model,
  Company,
  General,
  Language,
  axiosErrorHandler,
};
