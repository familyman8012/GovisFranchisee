import AxiosUtil from "./index";

import { IUseCouponResponse } from "InterfaceFarm/Coupon";
import { ICommonFetchParams } from "InterfaceFarm/Parameters";

import { BaseExceptionModule } from "LibFarm/error";

export const updateCoupon = async (coupon_number: string) => {
  try {
    const response = await AxiosUtil.post<IUseCouponResponse>("/store/coupon_used", {
      coupon_number,
    });

    return response.data.code === "0000" ? true : false;
  } catch (e: any) {
    const code = e.code;
    switch (true) {
      case code === "9001":
        throw new BaseExceptionModule(code, "발급되지 않은 쿠폰번호입니다.");
      case code === "9002":
        throw new BaseExceptionModule(code, "이미 사용 처리된 쿠폰입니다.");
      case code === "9003":
        throw new BaseExceptionModule(code, "사용 기간이 지난 쿠폰입니다.");
      case code === "9004":
        throw new BaseExceptionModule(code, "사용이 불가능한 매장입니다.");
      default:
        throw new BaseExceptionModule(code, "예기치 못한 오류로 처리에 실패하였습니다.");
    }
  }
};

export const fetchUsedCouponList = async (params: ICommonFetchParams) => {
  const response = await AxiosUtil.get("/store/coupon_used", {
    params,
  });

  return response.data.data;
};
