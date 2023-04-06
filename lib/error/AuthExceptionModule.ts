import { toNumber } from "LibFarm/number";

import { BaseExceptionModule } from "./BaseExceptionModule";

export type AUTH_EXCEPTION_AFTER_ACTIONS = "none" | "logout" | "refresh_token" | "back";

export const AuthExceptionModule = class extends BaseExceptionModule {
  /**
   * @desc 예외 후에 액션 코드: 로그아웃, 토큰 갱신 등등 없을 시 NONE
   */
  static readonly LOGOUT = "logout";
  static readonly BACK = "back";
  static readonly NONE = "none";
  static readonly REFRESH_TOKEN = "refresh_token";

  /**
   * @desc 프론트에서만 사용하는 로그인 예외처리 코드
   */

  // 사용가능한 권한 목록이 없을때
  static readonly FRONT_NO_PERMISSION = "front_no_permission";

  static match(code: string | number): boolean {
    const _code = toNumber(`${code}`) ?? 0;

    return _code >= 8000 && _code < 9000;
  }

  /**
   * @override
   */
  public getExceptionMessage() {
    switch (this.code) {
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
      case AuthExceptionModule.FRONT_NO_PERMISSION:
        return "할당된 권한이 없는 계정입니다.";
      default:
        return this.message;
    }
  }

  public getAfterAction(): AUTH_EXCEPTION_AFTER_ACTIONS {
    switch (this.code) {
      case "8001":
      case "8999":
      case "8001":
        return "logout";
      case "8991":
        return "back";
      default:
        return "none";
    }
  }
};

export default AuthExceptionModule;
