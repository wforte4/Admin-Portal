import axios, { AxiosRequestConfig } from "axios";
import { catchAxiosError } from "./error";

// Base Url for the rest api -- Every other directory can be accessed baseURL + "/%s";
export const baseConfig = {
  baseURL: "http://localhost:3600",
};

// Post a request to the Go-lang Rest Api plus catch error if necessary
export const post = (url, data) => {
  return axios.post(url, data, baseConfig).catch(catchAxiosError);
};

export const postFile = (url, data, config) => {
  return axios.post(url, data, config).catch(catchAxiosError);
}

// Get the requested json from Go-lang Rest Api plus catch error
export const get = async (url, config = {}) => {
  const axiosConfig = {
    ...baseConfig,
    ...config,
  };
  return await axios.get(url, axiosConfig).catch(catchAxiosError)
};
