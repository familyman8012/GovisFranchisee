import axios, { AxiosRequestConfig } from "axios";
import { authStore } from "src/mobx/store";
import { BaseExceptionModule, AuthExceptionModule } from "LibFarm/error";

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
    // reVal = "https://dev.api.gopizza.kr";
    reVal = "http://feature.api.gopizza.kr";
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
    if (authStore.token) {
      request.headers = {
        "GO-AUTH": authStore.token,
        ...request.headers,
      };
    }

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
