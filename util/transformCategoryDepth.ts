import { IMaterialCategoryItem } from "InterfaceFarm/material";

// 카테고리 변환
export const transformCategoryByDepth = (
  list: IMaterialCategoryItem[],
  depth: number
) => {
  return list
    ?.filter((el) => el.depth === depth)
    .map((item) => ({
      label: item.material_category_name,
      value: item.material_category_idx,
    }));
};
