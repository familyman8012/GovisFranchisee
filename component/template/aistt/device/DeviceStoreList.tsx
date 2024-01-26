import { useMemo } from "react";
import { useRouter } from "next/router";
import { IFqsStoreDeviceListResponse } from "InterfaceFarm/ai-fqs";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import ToggleSort from "@ComponentFarm/atom/Sort/ToggleSort";
import { Table, TableWrap } from "@ComponentFarm/common";
import { QueryParams } from "HookFarm/useQueryParams";
import useSortable from "HookFarm/useSortable";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

interface Props {
  loading?: boolean;
  list: IFqsStoreDeviceListResponse["list"];
  updateParams: (sort: QueryParams) => void;
}

const sortItems = [
  { id: 1, label: "매장 번호", sort: "" },
  { id: 2, label: "매장명", sort: "store_name" },
  { id: 3, label: "도입 상태", sort: "is_use_stt", align: "center" },
  { id: 4, label: "프로그램 상태", sort: "program_status", align: "center" },
  { id: 5, label: "활성 카메라 수", sort: "camera_enabled", align: "center" },
  { id: 6, label: "총 카메라 수", sort: "camera_total", align: "center" },
  { id: 7, label: "", sort: "" },
];

const DeviceStoreList = ({ loading, list, updateParams }: Props) => {
  const router = useRouter();
  const { sortState, toggleSort } = useSortable(updateParams);

  const search = useMemo(() => router.asPath.split("?")[1], [router]);

  return (
    <TableWrap className="">
      <Table className="basic">
        <colgroup>
          <col width={getTableWidthPercentage(140)} />
          <col width={getTableWidthPercentage(450)} />
          <col width={getTableWidthPercentage(150)} />
          <col width={getTableWidthPercentage(150)} />
          <col width={getTableWidthPercentage(210)} />
          <col width={getTableWidthPercentage(210)} />
          <col width={getTableWidthPercentage(250)} />
        </colgroup>
        <thead>
          <tr>
            {sortItems.map((item, i) => (
              <th
                key={item.id}
                onClick={() => item.sort && toggleSort(item.sort)}
                className={item.align}
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
          {loading ? (
            <SkeletonTh colLength={7} rowLength={10} />
          ) : !loading && list.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <Empty>데이터가 없습니다.</Empty>
              </td>
            </tr>
          ) : (
            list.map((item) => (
              <tr
                key={item.store_idx}
                onClick={() =>
                  router.push({
                    pathname: `/aistt-device/view/${item.store_idx}`,
                    search,
                  })
                }
              >
                <td className="code">{item.store_idx}</td>
                <td>{item.store_name}</td>

                <td className="center">
                  <Badge
                    color={item.is_use_stt === 0 ? "red" : "green"}
                    size="sm"
                  >
                    {item.is_use_stt === 0 ? "미사용" : "사용"}
                  </Badge>
                </td>
                <td className="center">
                  <Badge
                    dot
                    color={item.program_status === 0 ? "red" : "green"}
                    size="sm"
                  >
                    {item.program_status === 0 ? "OFF" : "ON"}
                  </Badge>
                </td>
                <td className="center">{item.camera_enabled}</td>
                <td className="center">{item.camera_total}</td>
                <td className="center">
                  <Button variant="gostSecondary">기기 정보 관리</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </TableWrap>
  );
};

export default DeviceStoreList;
