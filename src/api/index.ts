import axios, { AxiosRequestConfig } from "axios";
import { authStore } from "src/mobx/store";
import { BaseExceptionModule, AuthExceptionModule } from "LibFarm/error";

export interface AxiosUtilResponse<T> {
  code: string;
  data: T;
  message: string;
}

const getBaseUrl = () => {
  let reVal = "https://api.gopizza.kr";

  let host;
  if (typeof window !== "undefined") {
    host = window.location.host;
  }

  const hostSplit = host?.split(".");

  if (hostSplit && hostSplit[0] === "dev") {
    reVal = "https://dev.api.gopizza.kr";
  } else if (
    (hostSplit && hostSplit[0] === "192") ||
    (hostSplit && hostSplit[0].indexOf("localhost") >= 0) ||
    (hostSplit && hostSplit[0] === "local")
  ) {
    reVal = "https://dev.api.gopizza.kr";
    // reVal = "http://feature.api.gopizza.kr";
    //reVal = "http://api.gopizza.kr";
    // reVal = "http://192.168.0.10:8000";
  }

  return reVal;
};

const AxiosUtil = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
});

AxiosUtil.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("auth_token") !== null
    ) {
      authStore.newLogin();
    }
    const session = await authStore.sessionGet();
    const storeInfo = await authStore.storeGet();

    request.headers = {
      "auth-token": String(session?.auth_token),
      "store-token": String(storeInfo?.store_token),
      //"store-token": String(storeInfo?.store_token),
      //"auth-token":"03ihVMICyDqph+o9+D4V6g5VlkreL8WIYuG/GKwzHufdWTx+5Ri8IVVaD2pvqcKLarUBpNRjBNndTLPb6vGP820jQzY2431SMqGyNGLtbu2lifWolMMvjEpG0EuQj7im1ADTk02NqnTM1s1NB5qHz1/kgF5Xkh7fWx6I2ekGA0bJp6IkUA02iz1qyAse+GY14Hh3w5xusWEYDNBPjFLIoDKVgliaDQNBl8qeq7S2Jo62zfCwlAWWmh8kQ4jucbrlkNA4GZYc9qTUKGuVBwEhZ67Ead52o2rUnoo/h7/y8FaWKUCUMnVjk32wMeU9ULMXPAZcHdomaBcqoXji69YUXLXn3HI6foUpnO3X54wLd1PLlAnwSty+10FoX5q56hVRF7VvoowRtDyiRpYXTZaL6g==",
      ...request.headers,
    };

    return request;
  },
  (error) => {
    // 요청 에러 처리를 작성합니다.

    return Promise.reject(error);
  }
);

AxiosUtil.interceptors.response.use((response) => {
  const Exception = [AuthExceptionModule, BaseExceptionModule].find(
    (Exception) => Exception.match(response.data?.code)
  );

  /**
   * @desc
   * Global Exception 처리 모듈
   */
  if (Exception) {
    throw new Exception(response.data?.code, response.data?.message, response);
  }

  return response;
});

export default AxiosUtil;
