import axios, { AxiosError, CreateAxiosDefaults } from "axios";

import { errorCatch, getContentType } from "./api.helper";
import {
  getAccessToken,
  removeFromStorage,
} from "@/src/services/auth/auth-token.service";
import { authService } from "@/src/services/auth/auth.service";

const SERVER_URL = process.env.SERVER_URL as string;

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: getContentType(),
  withCredentials: true,
};
// danidagosudarev@gmail.com
const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provide") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await authService.getNewTokens();
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") {
          removeFromStorage();
        }
      }
    }

    throw error;
  },
);

axiosClassic.interceptors.response.use(
  (config) => config,
  (error: AxiosError<any>) => {
    const data = error.response?.data;

    const normalizedError = {
      message: Array.isArray(data?.message)
        ? data.message[0]
        : data?.message || "Неизвестная ошибка",
      statusCode: data?.statusCode || 500,
    };

    return Promise.reject(normalizedError);
  },
);

export { axiosClassic, axiosWithAuth };
