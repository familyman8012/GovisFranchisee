import React from "react";
import { IRecipeProductListItem } from "InterfaceFarm/product-recipe";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import ToggleSort from "@ComponentFarm/atom/Sort/ToggleSort";
import { Table, TableWrap } from "@ComponentFarm/common";
import { QueryParams } from "HookFarm/useQueryParams";
import useSortable from "HookFarm/useSortable";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

interface TableProps {
  loading?: boolean;
  list: IRecipeProductListItem[];
  onClick: (item: IRecipeProductListItem) => void;
  updateParams: (params: QueryParams) => void;
}

const recipeSortItems = [
  { id: 1, label: "제품코드", sort: "product_code" },
  { id: 2, label: "제품 그룹", sort: "" },
  { id: 3, label: "제품 분류", sort: "" },
  { id: 4, label: "제품명", sort: "product_name_ko" },
  { id: 5, label: "제품 상태", sort: "" },
  { id: 6, label: "등록 수", sort: "" },
  { id: 7, label: "레시피 상태", sort: "" },
  { id: 8, label: "레시피 등록일", sort: "created_date" },
  { id: 9, label: "레시피 수정일", sort: "updated_date" },
];

const RecipeListTable = ({
  list,
  updateParams,
  onClick,
  loading,
}: TableProps) => {
  const { sortState, toggleSort } = useSortable(updateParams);

  return (
    <TableWrap>
      <Table className="basic">
        <colgroup>
          <col width={getTableWidthPercentage(170)} />
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(280)} />
          <col width={getTableWidthPercentage(130)} />
          <col width={getTableWidthPercentage(150)} />
          <col width={getTableWidthPercentage(160)} />
          <col width={getTableWidthPercentage(180)} />
          <col width={getTableWidthPercentage(180)} />
        </colgroup>
        <thead>
          <tr>
            {recipeSortItems.map((item, i) => (
              <th
                key={item.id}
                onClick={() => item.sort && toggleSort(item.sort)}
              >
                <span className="th_title">
                  {item.label}
                  {item.sort && <ToggleSort el={item} sortState={sortState} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && <SkeletonTh colLength={9} rowLength={10} />}
          {!loading && list.length === 0 && (
            <tr className="empty">
              <td colSpan={recipeSortItems.length}>
                <Empty>데이터가 없습니다.</Empty>
              </td>
            </tr>
          )}
          {list.map((recipeRowData) => (
            <tr
              key={recipeRowData.product_info_idx}
              onClick={() => onClick?.(recipeRowData)}
            >
              <td className="code">{recipeRowData.product_code}</td>
              <td>{recipeRowData.evi_product_group_str}</td>
              <td>{recipeRowData.evi_product_category_str}</td>
              <td>{recipeRowData.product_name_ko}</td>
              <td>
                <Badge
                  dot
                  color={
                    recipeRowData.evi_product_status_str === "운영"
                      ? "green"
                      : recipeRowData.evi_product_status_str === "중단"
                      ? "red"
                      : "yellow"
                  }
                  size="sm"
                >
                  {recipeRowData.evi_product_status_str}
                </Badge>
              </td>
              <td>{recipeRowData.recipe_count ?? 0}</td>
              <td>
                <Badge
                  dot
                  fill="transparent"
                  color={
                    recipeRowData.is_recipe_registration === 0 ? "red" : "green"
                  }
                >
                  {recipeRowData.is_recipe_registration === 0
                    ? "미등록"
                    : "등록"}
                </Badge>
              </td>
              <td>
                {recipeRowData.is_recipe_registration === 0
                  ? "-"
                  : recipeRowData.recipe_created_date ?? "-"}
              </td>
              <td>
                {recipeRowData.is_recipe_registration === 0
                  ? "-"
                  : recipeRowData.recipe_updated_date ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrap>
  );
};

export default RecipeListTable;
