import { useRouter } from "next/router";
import { useCallback } from "react";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { authStore } from "src/mobx/store";

import useBack from "./useBack";

import { BaseExceptionModule, AuthExceptionModule } from "LibFarm/error";

export type TError = {
  message: string;
  code: string;
  status: number;
  response?: AxiosResponse<any>;
};

export default function useErrorHandler() {
  const back = useBack();
  const router = useRouter();

  const isDev = process.env.NODE_ENV === "development";

  const errorHandler = useCallback((error: any) => {
    let { message, code, response } = error;
    if (error instanceof AuthExceptionModule) {
      toast.error(error.getExceptionMessage(), {
        toastId: `${error.code}`,
        autoClose: 4000,
      });

      if (error.getAfterAction() === AuthExceptionModule.LOGOUT) {
        location.pathname !== "/" && authStore.logOut();
      } else if (error.getAfterAction() === AuthExceptionModule.BACK) {
        router.replace("/");
      }
    } else if (error instanceof BaseExceptionModule) {
      toast.error(error.getExceptionMessage(), {
        toastId: `${error.code}`,
        autoClose: 4000,
      });
    } else {
      isDev && console.error(error);
      const _code = response && response.status >= 400 ? response.status : code;
      toast.error(
        isDev
          ? `(${_code}) ${message}`
          : `요청 처리에 실패하였습니다. (Error Code: ${_code})`,
        {
          toastId: `${_code}`,
          autoClose: 4000,
        }
      );
    }
  }, []);

  const errorHandlerWithBack = useCallback((error: TError) => {
    errorHandler(error);
    back();
  }, []);

  const errorHandlerWithQueryPass = useCallback((error: TError) => {
    errorHandler(error);
    back(true);
  }, []);

  return {
    errorHandler,
    errorHandlerWithBack,
    errorHandlerWithQueryPass,
  };
}
