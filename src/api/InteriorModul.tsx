import AxiosUtil from "ApiFarm/index";

import {
  iInteriorBoardReplyDeleteRequest,
  iInteriorBoardReplyPostRequest,
  iInteriorListRequest,
  iInteriorReviewSend,
  iInteriorTitlePostRequest,
  iInteriorViewInfoRequest,
} from "InterfaceFarm/InteriorBoard";

export const InteriorBoardList = async (params: iInteriorListRequest) => {
  const response = await AxiosUtil.get(`/fc/v1/board/interior`, {
    params,
  });

  return response.data.data;
};

export const InteriorBoardReplyDelete = async (data: iInteriorBoardReplyDeleteRequest) => {
  const response = await AxiosUtil.delete(`fc/v1/board/interior_contentt`, {
    data,
  });

  return response.data.data;
};

export const InteriorBoardTitlePost = async (data: iInteriorTitlePostRequest) => {
  const response = await AxiosUtil.post(`/fc/v1/board/interior`, data);

  return response.data.data;
};

export const InteriorBoardViewinfo = async (params: iInteriorViewInfoRequest) => {
  const { sbi_idx } = params;

  const response = await AxiosUtil.get(`/fc/v1/board/interior/${sbi_idx}`);
  return response.data.data;
};

export const InteriorBoardReplyPost = async (data: iInteriorBoardReplyPostRequest) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, typeof value === "number" ? value.toString() : value);
  }

  const response = await AxiosUtil.post("fc/v1/board/interior_content", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.data;
};

export const InteriorReviewSend = async (data: iInteriorReviewSend) => {
  const response = await AxiosUtil.post(`fc/v1/board/interior/review`, data);

  return response.data.data;
};
