import { IMenuCategoryItem } from "InterfaceFarm/menu";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import ToggleSort from "@ComponentFarm/atom/Sort/ToggleSort";
import { Table, TableWrap } from "@ComponentFarm/common";
import { QueryParams } from "HookFarm/useQueryParams";
import useSortable from "HookFarm/useSortable";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

interface ICategoryListTableProps {
  loading?: boolean;
  list: IMenuCategoryItem[];
  updateParams: (sort: QueryParams) => void;
}

const categorySortItems = [
  { id: 1, label: "카테고리 코드", sort: "menu_category_code" },
  { id: 2, label: "카테고리 명", sort: "menu_category_name" },
  { id: 3, label: "등록일", sort: "created_date" },
  { id: 4, label: "수정일", sort: "updated_date" },
];

const CategoryListTable = ({
  updateParams,
  list,
  loading,
}: ICategoryListTableProps) => {
  const { sortState, toggleSort } = useSortable(updateParams);

  return (
    <TableWrap>
      <Table className="basic">
        <colgroup>
          <col width={getTableWidthPercentage(200)} />
          <col width={getTableWidthPercentage(900)} />
          <col width={getTableWidthPercentage(220)} />
          <col width={getTableWidthPercentage(220)} />
        </colgroup>
        <thead>
          <tr>
            {categorySortItems.map((item, i) => (
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
          {loading && <SkeletonTh colLength={4} rowLength={10} />}
          {!loading && list.length === 0 && (
            <tr className="empty">
              <td colSpan={4}>
                <Empty>데이터가 없습니다.</Empty>
              </td>
            </tr>
          )}
          {list.map((categoryData) => (
            <tr key={categoryData.menu_category_code}>
              <td className="code">{categoryData.menu_category_code}</td>
              <td>{categoryData.menu_category_name}</td>
              <td>{categoryData.created_date}</td>
              <td>{categoryData.updated_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrap>
  );
};

export default CategoryListTable;
