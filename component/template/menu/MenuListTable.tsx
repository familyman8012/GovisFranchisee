import { IMenuListItem } from "InterfaceFarm/menu";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import Copy from "@ComponentFarm/atom/icons/Copy";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import ToggleSort from "@ComponentFarm/atom/Sort/ToggleSort";
import { Table, TableWrap } from "@ComponentFarm/common";
import { QueryParams } from "HookFarm/useQueryParams";
import useSortable from "HookFarm/useSortable";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { toPrice } from "@UtilFarm/number";

interface IMenuListTableProps {
  loading?: boolean;
  list: IMenuListItem[];
  onClick: (item: IMenuListItem) => void;
  onClickCopy?: (item: IMenuListItem) => void;
  updateParams: (sort: QueryParams) => void;
}

const menuSortItems = [
  { id: 1, label: "메뉴 코드", sort: "menu_code" },
  { id: 2, label: "메뉴 그룹", sort: "" },
  { id: 3, label: "메뉴 종류", sort: "" },
  { id: 4, label: "메뉴 구분", sort: "" },
  { id: 5, label: "카테고리", sort: "" },
  { id: 6, label: "메뉴명", sort: "menu_name" },
  { id: 7, label: "메뉴 상태", sort: "" },
  { id: 8, label: "내점 정상가", sort: "" },
  { id: 9, label: "등록일", sort: "created_date" },
  { id: 10, label: "-", sort: "" },
];

const MenuListTable = ({
  loading,
  list,
  onClick,
  onClickCopy,
  updateParams,
}: IMenuListTableProps) => {
  const { sortState, toggleSort } = useSortable(updateParams);

  return (
    <TableWrap>
      <Table className="basic">
        <colgroup>
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(260)} />
          <col width={getTableWidthPercentage(160)} />
          <col width={getTableWidthPercentage(140)} />
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(200)} />
        </colgroup>
        <thead>
          <tr>
            {menuSortItems.map((item, i) => (
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
          {loading && <SkeletonTh colLength={10} rowLength={10} />}
          {!loading && list.length === 0 && (
            <tr className="empty">
              <td colSpan={menuSortItems.length}>
                <Empty>데이터가 없습니다.</Empty>
              </td>
            </tr>
          )}
          {list.map((menuRowData) => (
            <tr
              key={menuRowData.menu_code}
              onClick={() => onClick?.(menuRowData)}
            >
              <td className="code">{menuRowData.menu_code}</td>
              <td>{menuRowData.evv_menu_group}</td>
              <td>{menuRowData.evv_menu_type}</td>
              <td>{menuRowData.evv_menu_classification}</td>
              <td>{menuRowData.menu_category_name}</td>
              <td>{menuRowData.menu_name}</td>

              <td>
                <Badge
                  dot
                  fill="transparent"
                  color={
                    menuRowData.evv_menu_status === "중단" ? "red" : undefined
                  }
                >
                  {menuRowData.evv_menu_status}
                </Badge>
              </td>
              <td>{`${toPrice(menuRowData.visit_normal_price)}원`}</td>
              <td>{menuRowData.created_date}</td>
              <td>
                <Button
                  variant="gostPrimary"
                  LeadingIcon={<Copy />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickCopy?.(menuRowData);
                  }}
                >
                  복사하기
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrap>
  );
};

export default MenuListTable;
