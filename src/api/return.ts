import AxiosUtil from "ApiFarm/index";

import {
  iReturnListRequest,
  iReturnApplyRequest,
  iReturnApplyModifyRequest,
  iReturnViewInfoRequest,
  iReturnBoardReplyPostRequest,
  iReturnBoardReplyDeleteRequest,
} from "InterfaceFarm/ReturnBoard";

export const ReturnBoardList = async (params: iReturnListRequest) => {
  const response = await AxiosUtil.get(`/fc/v1/board/return`, {
    params,
  });

  return response.data.data;
};

export const ReturApplyPost = async (data: iReturnApplyRequest) => {
  const response = await AxiosUtil.post(`/fc/v1/board/return`, data);

  return response.data.data;
};

export const ReturnApplyImgPost = async (data: FormData) => {
  const response = await AxiosUtil.post(`/fc/v1/board/return/attached_image`, data);

  return response.data.data;
};

export const ReturnApplyViewinfo = async (sbre_idx: string) => {
  const response = await AxiosUtil.get(`/fc/v1/board/return/${sbre_idx}`);

  return response.data.data;
};

export const ReturnApplyModifyinfo = async (data: iReturnApplyModifyRequest) => {
  const response = await AxiosUtil.put(`/fc/v1/board/return`, data);

  return response.data.data;
};

export const ReturnBoardViewinfo = async (data: iReturnViewInfoRequest) => {
  const response = await AxiosUtil.get(`/fc/v1/board/return_content?sbre_idx=${data.sbre_idx}`);

  return response.data.data;
};

export const ReturnBoardReplyPost = async (data: iReturnBoardReplyPostRequest) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, typeof value === "number" ? value.toString() : value);
  }

  const response = await AxiosUtil.post("/fc/v1/board/return_content", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.data;
};

export const ReturnBoardReplyDelete = async (data: iReturnBoardReplyDeleteRequest) => {
  const response = await AxiosUtil.delete(`fc/v1/board/return_content`, {
    data,
  });

  return response.data.data;
};
