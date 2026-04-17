import { AxiosRequestConfig } from "axios";

interface RequiredConfig {
  method: AxiosRequestConfig["method"];
  params?: unknown;
  data?: unknown;
  url: string;
}

interface OptionalConfig {
  axiosOptions?: AxiosRequestConfig;
  signal?: AbortSignal;
}

export type { RequiredConfig, OptionalConfig };
