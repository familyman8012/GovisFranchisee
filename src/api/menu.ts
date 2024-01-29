import dayjs from "dayjs";
import {
  IMenuCategoryItem,
  MenuCreateParams,
  IMenuCategoryFetchParams,
  IMenuListItem,
  IMenuInfoResponse,
  IMenuOptionListResponse,
  IMenuFormFields,
  IMenuOptionInfo,
  MenuUpdateParams,
  MenuCategoryCreateParams,
  IUnLinkMenuListItem,
  IMenuLinkHistoryItem,
} from "InterfaceFarm/menu";

import { QueryParams } from "HookFarm/useQueryParams";
import { downloadAxiosResponse } from "@UtilFarm/download";
import { BoV2Request } from "./index";
import { IProductReq, IProductRes } from "InterfaceFarm/product-bo";

const fetchMenuData = async <T>(endpoint: string, params?: any) => {
  return BoV2Request.get<IResponse<T>>(endpoint, { params }).then(
    (res) => res.data.data
  );
};

const downloadMenuData = async (
  endpoint: string,
  filename: string,
  params?: any
) => {
  return BoV2Request.get(endpoint, {
    params: {
      ...params,
      is_export: "1",
    },
    responseType: "blob",
  })
    .then(downloadAxiosResponse(filename))
    .catch(() => new Error("다운로드에 실패하였습니다."));
};

export const fetchMenuCategoryList = (params: IMenuCategoryFetchParams) => {
  return fetchMenuData<{
    total_count: number;
    list: IMenuCategoryItem[];
  }>("/menu/category/list", params);
};

export const fetchMenuList = (params: any) => {
  return fetchMenuData<{
    total_count: number;
    list: IMenuListItem[];
  }>(`/menu/info/list`, params);
};

export const fetchMenuProductList = async (params?: IProductReq) => {
  const response = await BoV2Request.get<IResponse<IProductRes>>(
    "/menu/product/info/list",
    {
      params,
    }
  );

  return response.data.data;
};

export const downloadMenuCategoryList = (params: IMenuCategoryFetchParams) => {
  return downloadMenuData(
    `/menu/category/list`,
    `메뉴 카테고리 목록_${dayjs().format("YYYY-MM-DD HH:mm:ss")}.xlsx`,
    params
  );
};

export const downloadMenuList = (params: any) => {
  return downloadMenuData(
    `/menu/info/list`,
    `메뉴 목록_${dayjs().format("YYYY-MM-DD HH:mm:ss")}.xlsx`,
    params
  );
};

export const fetchMenuOptionList = async (menu_option_category_idx: number) => {
  return fetchMenuData<IMenuOptionListResponse>(
    `/menu/option/category/${menu_option_category_idx}`
  );
};

export const fetchMenuOptionInfo = async (menu_option_info_idx: number) => {
  return fetchMenuData<IMenuOptionInfo>(
    `/menu/option/info/${menu_option_info_idx}`
  );
};

export const fetchMenu = async (
  menu_info_idx: number
): Promise<
  IMenuInfoResponse & {
    menu_categories: IMenuFormFields["menu_categories"];
  }
> => {
  const info = await fetchMenuData<IMenuInfoResponse>(
    `/menu/info/${menu_info_idx}`
  );

  if (!info.menu_option_category_list?.length) {
    return { ...info, menu_categories: [] };
  }

  const menu_categories = await Promise.all(
    info.menu_option_category_list.map(
      async ({ menu_option_category_idx, menu_option_category_name }) => {
        const menu_option_info_list = await fetchMenuOptionList(
          menu_option_category_idx
        );

        return {
          menu_option_category_idx,
          menu_option_category_name,
          menu_options: menu_option_info_list.menu_option_info_list.map(
            (option) => ({
              menu_option_info_idx: option.menu_option_info_idx,
              menu_option_name: option.menu_option_name,
            })
          ),
        };
      }
    )
  );

  return { ...info, menu_categories };
};

export const copyMenu = async ({
  menu_info_idx,
  ...params
}: {
  menu_info_idx: number;
  menu_name: string;
  evi_menu_group: string;
}) => {
  return BoV2Request.post<
    IResponse<{
      menu_info_idx: number;
      menu_code: string;
    }>
  >(`/menu/copy/${menu_info_idx}`, params).then((res) => res.data.data);
};

export const createMenuCategory = (params: MenuCategoryCreateParams) => {
  return BoV2Request.post<
    IResponse<{
      menu_category_idx: number;
      menu_category_code: string;
    }>
  >(`/menu/category`, params).then((res) => res.data.data);
};

export const createMenuOptionCategory = (params: {
  menu_info_idx: number;
  menu_option_category_name: string;
}) => {
  return BoV2Request.post<
    IResponse<{
      menu_info_idx: number;
      menu_option_category_idx: number;
    }>
  >(`/menu/option/category`, params).then((res) => res.data.data);
};

export const createMenuOptionInfo = (
  params: Partial<IMenuOptionInfo> & {
    menu_info_idx: number;
    menu_option_category_idx: number;
  }
) => {
  return BoV2Request.post<
    IResponse<{
      menu_info_idx: number;
      menu_option_category_idx: number;
      menu_option_info_idx: number;
    }>
  >("/menu/option/info", params).then((res) => res.data.data);
};

export const createMenuOption = async (
  params: MenuCreateParams["menu_categories"][number] & {
    menu_info_idx: number;
  }
) => {
  const { menu_option_category_idx, menu_info_idx } =
    await createMenuOptionCategory({
      menu_info_idx: params.menu_info_idx,
      menu_option_category_name: params.menu_option_category_name,
    });

  const menu_option_info_idx_list = await Promise.all(
    params.menu_options.map(async (menuOption) =>
      createMenuOptionInfo({
        menu_info_idx,
        menu_option_category_idx,
        ...menuOption,
      }).then((data) => data.menu_option_info_idx)
    )
  );

  return { menu_option_category_idx, menu_option_info_idx_list };
};

export const createMenu = async (params: MenuCreateParams) => {
  const { menu_info_idx } = await BoV2Request.post<
    IResponse<{
      menu_info_idx: number;
      menu_code: string;
    }>
  >(`/menu/info`, params).then((res) => res.data.data);

  if (!params.menu_categories || params.is_menu_option === "0") {
    return { menu_info_idx };
  }

  const menu_options = await Promise.all(
    params.menu_categories.map((group) =>
      createMenuOption({ ...group, menu_info_idx })
    )
  );

  return { menu_info_idx, menu_options };
};

export const updateMenuInfo = async ({
  menu_info_idx,
  ...params
}: MenuUpdateParams) => {
  return BoV2Request.put<IResponse<{ menu_info_idx: number }>>(
    `/menu/info/${menu_info_idx}`,
    params
  ).then((res) => res.data.data);
};

export const updateMenuOptionInfo = async ({
  menu_option_info_idx,
  ...params
}: Partial<IMenuOptionInfo> & {
  menu_option_info_idx: number;
}) => {
  return BoV2Request.put<IResponse<{ menu_option_info_idx: number }>>(
    `/menu/option/info/${menu_option_info_idx}`,
    params
  ).then((res) => res.data.data);
};

export const updateMenuOptionCategory = ({
  menu_option_category_idx,
  ...params
}: {
  menu_option_category_idx: number;
  menu_option_category_name: string;
}) => {
  return BoV2Request.put<
    IResponse<{
      menu_option_category_idx: number;
    }>
  >(`/menu/option/category/${menu_option_category_idx}`, params).then(
    (res) => res.data.data
  );
};

export const removeMenuOptionCategory = (menu_option_category_idx: number) => {
  return BoV2Request.delete<
    IResponse<{
      menu_option_category_idx: number;
    }>
  >(`/menu/option/category/${menu_option_category_idx}`).then(
    (res) => res.data.data
  );
};

export const removeMenuOptionInfo = (menu_option_info_idx: number) => {
  return BoV2Request.delete<
    IResponse<{
      menu_option_info_idx: number;
    }>
  >(`/menu/option/info/${menu_option_info_idx}`).then((res) => res.data.data);
};

// 미확인 메뉴 등록
export const fetchUnLinkedMenuList = async (params: QueryParams) => {
  const response = await BoV2Request.get<
    IResponse<{
      total_count: number;
      list: IUnLinkMenuListItem[];
    }>
  >("/unidentified_menu/list", { params });

  return response.data.data;
};

export const updateLinkMenu = async (params: {
  unidentified_menu_name: string;
  menu_info_idx: number;
}) => {
  const response = await BoV2Request.post<IResponse<null>>(
    `/unidentified_menu/linking`,
    params
  );

  return response.data.data;
};

// 미확인 메뉴 연결내역 목록
export const fetchLinkedHistoryList = async (params: QueryParams) => {
  const response = await BoV2Request.get<
    IResponse<{
      total_count: number;
      list: IMenuLinkHistoryItem[];
    }>
  >("/unidentified_menu/linking/history", { params });

  return response.data.data;
};

export const updateUnLinkMenu = async (params: {
  unidentified_menu_name: string;
}) => {
  const response = await BoV2Request.post<IResponse<null>>(
    `/unidentified_menu/unlink`,
    params
  );

  return response.data.data;
};
