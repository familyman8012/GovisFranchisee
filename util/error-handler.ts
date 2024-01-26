import router from "next/router";
import { toast } from "react-toastify";
import { authStore } from "MobxFarm/store";

// 8001 ~8999 Auth Error
export const getExceptionMessage = (code: string, message?: string) => {
  switch (code) {
    case "8001":
      return "승인이 필요한 계정입니다. 관리자에게 문의하십시오.";
    case "8002":
      return "본사 서비스 이용이 불가능한 계정입니다.";
    case "8991":
      return "해당 페이지의 접근권한이 없습니다. 관리자에게 문의하십시오.";
    case "8996":
      return "인증된 카카오 정보를 찾을 수 없습니다.";
    case "8998":
      return "아이디 또는 비밀번호가 틀립니다.";
    case "8999":
      return "접근 권한이 없습니다. 다시 로그인해 주세요.";
    case "front_no_permission":
      return "할당된 권한이 없는 계정입니다.";
    default:
      return `Something went wrong: ${message}, code : ${code}`;
  }
};

export const errorHandler = (code: string, message?: string) => {
  const errorMsg = getExceptionMessage(code, message);

  if (Number(code) >= 8000 && Number(code) < 9000) {
    toast.error(errorMsg, {
      toastId: code,
    });

    if (code === "8001" || code === "8999") {
      authStore.logOut();
    }

    if (code === "8991") {
      router.replace("/");
    }
  } else {
    toast.error(`요청 처리에 실패하였습니다. (Error Code: ${code})`, {
      toastId: code,
    });
  }
};
