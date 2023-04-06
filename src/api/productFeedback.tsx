import AxiosUtil from "ApiFarm/index";

import {
  IRecipeFeedbackTitlePostRequest,
  IRecipeFeedbackTitleDeleteRequest,
  IRecipeFeedbackReplyPostRequest,
  IRecipeFeedbackReplyDeleteRequest,
  IRecipeFeedbackListRequest,
  IRecipeFeedbackViewInfoRequest,
} from "InterfaceFarm/ProductFeedback";

export const RecipeFeedbackTitlePost = async (data: IRecipeFeedbackTitlePostRequest) => {
  const response = await AxiosUtil.post(`/store/board/product_feedback`, data);
  return response.data.data;
};

export const RecipeFeedbackTitleDelete = async (data: IRecipeFeedbackTitleDeleteRequest) => {
  const response = await AxiosUtil.delete(`/store/board/product_feedback`, { data });
  return response.data.data;
};

export const RecipeFeedbackReplyPost = async (data: IRecipeFeedbackReplyPostRequest) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, typeof value === "number" ? value.toString() : value);
  }

  const response = await AxiosUtil.post(`/store/board/product_feedback_content`, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.data;
};

export const RecipeFeedbackReplyDelete = async (data: IRecipeFeedbackReplyDeleteRequest) => {
  const responseData = await AxiosUtil.delete(`/store/board/product_feedback_content`, {
    data: data,
  });
  return responseData.data.data;
};

export const RecipeFeedbackList = async (params: IRecipeFeedbackListRequest) => {
  const responseData = await AxiosUtil.get(`/store/board/product_feedback`, {
    params,
  });

  return responseData.data.data;
};

export const RecipeFeedbackViewInfo = async (data: IRecipeFeedbackViewInfoRequest) => {
  const responseData = await AxiosUtil.get(`/store/board/product_feedback/${data.sbf_idx}`);

  return responseData.data.data;
};
