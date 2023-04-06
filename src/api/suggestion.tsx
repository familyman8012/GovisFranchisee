import AxiosUtil from "ApiFarm/index";

import {
  iSuggestionBoardReplyDeleteRequest,
  iSuggestionBoardReplyPostRequest,
  iSuggestionListRequest,
  iSuggestionTitlePostRequest,
  iSuggestionViewInfoRequest,
} from "InterfaceFarm/SuggestionBoard";

export const SuggestionBoardList = async (params: iSuggestionListRequest) => {
  const response = await AxiosUtil.get(`/store/board/qna`, {
    params,
  });

  return response.data.data;
};

export const SuggestionBoardReplyDelete = async (data: iSuggestionBoardReplyDeleteRequest) => {
  const response = await AxiosUtil.delete(`store/board/qna_content`, {
    data,
  });

  return response.data.data;
};

export const SuggestionBoardTitlePost = async (data: iSuggestionTitlePostRequest) => {
  const response = await AxiosUtil.post(`/store/board/qna`, data);

  return response.data.data;
};

export const SuggestionBoardViewinfo = async (params: iSuggestionViewInfoRequest) => {
  const { sbq_idx } = params;

  const response = await AxiosUtil.get(`/store/board/qna/${sbq_idx}`);
  return response.data.data;
};

export const SuggestionBoardReplyPost = async (data: iSuggestionBoardReplyPostRequest) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, typeof value === "number" ? value.toString() : value);
  }

  const response = await AxiosUtil.post("/store/board/qna_content", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.data;
};
