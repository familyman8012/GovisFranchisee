import AxiosUtil from "ApiFarm/index";

import { IPracticeListRequest } from "InterfaceFarm/Practice";

export const fetchPracticeList = async (params: IPracticeListRequest) => {
  const response = await AxiosUtil.get("/store/board/story", {
    params,
  });

  return response.data.data;
};

export const fetchPractice = async (id: number | string) => {
  const response = await AxiosUtil.get(`/store/board/story/${id}`);

  return response.data.data;
};
