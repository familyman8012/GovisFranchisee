import AxiosUtil from "ApiFarm/index";
import type { INoticeBoardListRequest, INoticeBoardViewRequest } from "InterfaceFarm/Notice";

export const fetchNoticeList = async (params: INoticeBoardListRequest) => {
  const response = await AxiosUtil.get("/store/board/notice", {
    params,
  });

  return response.data.data;
};

export const fetchNotice = async (params: INoticeBoardViewRequest) => {
  const { sbn_idx, ...otherParams } = params;
  const response = await AxiosUtil.get(`/store/board/notice/${sbn_idx}`, {
    params: otherParams,
  });

  return response.data.data;
};

export const fetchPopupNoticeList = async () => {
  const response = await AxiosUtil.get("/store/board/notice/popup");

  return response.data.data;
};
