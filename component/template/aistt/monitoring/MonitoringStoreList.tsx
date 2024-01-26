import { useRouter } from "next/router";
import { IFqsStoreDeviceListResponse } from "InterfaceFarm/ai-fqs";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
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
  {
    id: 3,
    label: "TABLE 카메라 상태",
    sort: "program_status",
    align: "center",
  },
  { id: 4, label: "영상 수", sort: "", align: "center" },
];

const MonitoringStoreList = ({ loading, list, updateParams }: Props) => {
  const router = useRouter();
  const { sortState, toggleSort } = useSortable(updateParams);

  return (
    <TableWrap className="">
      <Table className="basic">
        <colgroup>
          <col width={getTableWidthPercentage(140)} />
          <col width={getTableWidthPercentage(516)} />
          <col width={getTableWidthPercentage(395)} />
          <col width={getTableWidthPercentage(485)} />
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
            <SkeletonTh colLength={4} rowLength={10} />
          ) : !loading && list.length === 0 ? (
            <tr>
              <td colSpan={4}>
                <Empty>데이터가 없습니다.</Empty>
              </td>
            </tr>
          ) : (
            list.map((item) => (
              <tr
                key={item.store_idx}
                onClick={() =>
                  router.push({
                    pathname: `/aistt-monitoring/${item.store_idx}`,
                  })
                }
              >
                <td className="code">{item.store_idx}</td>
                <td>{item.store_name}</td>
                <td className="center">
                  <Badge
                    dot
                    color={item.program_status === 0 ? "red" : "green"}
                    size="sm"
                  >
                    {item.program_status === 0 ? "OFF" : "ON"}
                  </Badge>
                </td>
                <td className="center">{item.cctv_video_count}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </TableWrap>
  );
};

export default MonitoringStoreList;
