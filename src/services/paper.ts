import paperAxios from "../config/axios.config";
import type { AxiosRequestConfig } from "axios";

export const search = (
  data: Record<string, any>,
  options?: AxiosRequestConfig
) => {
  return paperAxios.get("/search", {
    params: data,
    ...options,
  });
};
