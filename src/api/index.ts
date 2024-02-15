import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
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
    reVal = "https://feature.api.gopizza.kr";
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

// Common Request 생성
export const CommonRequest = axios.create({
  baseURL: `${getBaseUrl()}/com/v2/`,
  // timeout: 3000,
});

export const BoRequest = axios.create({
  baseURL: `${getBaseUrl()}/bo/v1/`,
});
export const BoV2Request = axios.create({ baseURL: `${getBaseUrl()}/bo/v2` });
export const FcV2Request = axios.create({ baseURL: `${getBaseUrl()}/fc/v2` });

// 공통 Request
const handleRequestFullfilled = async (request: any) => {
  if (!authStore.isLoggedIn) {
    authStore.init();
  }

  // (request.headers as unknown) = {
  //   Authorization: `jwt ${String(authStore.token)}`,
  //   // Authorization: `jwt Q/aupDRJRa1klgevswkLSClrCGzvtfwGL1xfq20t5fZzA2/87YvQm/cXSD4kYw8vzu7m7bd4nZX9oJyvQOIv3kJF5R3KAjIW5Rik2K3qrJXKgLMES/kt/LyVw08suRlZ77MfSanHyW5jh1uydTRTKEP3cfFfADjglnN+JPNnhJg0s+rxNTOzh3FJ+t+cdjhrXpza3u74i2dFejqayvDKORHC+I1F1BSzU8NNUO1K57tfIg+LUc8T4EJZrJ331RK+WVTzVos4aoZqgPn2L2n7sA==`,
  //   ...request.headers,
  // };
  if (authStore.token) {
    // @ts-ignore
    request.headers = {
      "GO-AUTH": `${String(authStore.token)}`,
      ...request.headers,
    };
  }

  return request;
};

// 공통 Request - error
const handleRequestReject = (e: unknown) => Promise.reject(e);

export const handleResponseFullfilled = (
  response: AxiosResponse<IResponse<unknown>>
) => {
  if (response.data.code && response.data.code !== "0000") {
    /* eslint-disable no-throw-literal */
    throw {
      code: response?.data?.code,
      message: response.data.message,
      response,
    };
  }

  return response;
};

interface IErrorResponse {
  message: string;
  [key: string]: unknown; // 오류 응답이 다른 프로퍼티를 포함할 수 있습니다.
}

export const handleResponseReject = (error: AxiosError) => {
  if (
    error.response &&
    (error.response.data as IErrorResponse).message === "Signature has expired."
  ) {
    alert("로그인 시간이 만료되었습니다. 다시 로그인 해주세요");
    localStorage.clear();
    window.location.href = "/";
    return;
  }

  // eslint-disable-next-line consistent-return
  return Promise.reject(error);
};

const registerInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    handleRequestFullfilled,
    handleRequestReject
  );
  instance.interceptors.response.use(
    handleResponseFullfilled,
    handleResponseReject
  );
};

registerInterceptors(CommonRequest);
registerInterceptors(BoRequest);
registerInterceptors(BoV2Request);
registerInterceptors(FcV2Request);
