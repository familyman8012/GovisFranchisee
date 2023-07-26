import AxiosUtil from "ApiFarm/index";
import { INewsListRequest } from "InterfaceFarm/NewsLetter";

export const fetchNewsLetterCategories = async () =>
  AxiosUtil.get<IResponse<{ year_category_list: string[] }>>(
    "/store/board/newsletter/year_category"
  ).then((res) => res.data.data);

export const fetchNewsLetterList = async (params: INewsListRequest) => {
  const response = await AxiosUtil.get("/store/board/newsletter", {
    params: {
      ...params,
      page: 1,
      size: 9999,
    },
  });

  return response.data.data;
};

export const fetchNewsLetter = async (sbnl_idx: number) => {
  const response = await AxiosUtil.get(`/store/board/newsletter/${sbnl_idx}`);

  return response.data.data;
};
