import AxiosUtil from "ApiFarm/index";
import { IProductRecipeListRequest } from "InterfaceFarm/ProductRecipe";

export const fetchProductRecipeList = async (params: IProductRecipeListRequest) => {
  const response = await AxiosUtil.get("/store/board/recipe", {
    params: {
      ...params,
      page: 1,
      size: 9999,
    },
  });

  return response.data.data;
};

export const fetchProductRecipe = async (sbr_idx: number) => {
  const response = await AxiosUtil.get(`/store/board/recipe/${sbr_idx}`);

  return response.data.data;
};
