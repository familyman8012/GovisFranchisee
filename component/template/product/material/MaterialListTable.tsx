/* eslint-disable camelcase */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IMaterialRes } from "InterfaceFarm/material";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import ToggleSort from "@ComponentFarm/atom/Sort/ToggleSort";
import { Table, TableWrap } from "@ComponentFarm/common";
import { QueryParams } from "HookFarm/useQueryParams";
import useSortable from "HookFarm/useSortable";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

interface TableProps {
  isLoading: boolean;
  data?: IMaterialRes;
  updateParams: (newParams: QueryParams) => void;
}

const ManageListTable = ({ isLoading, data, updateParams }: TableProps) => {
  const router = useRouter();
  const { sortState, toggleSort } = useSortable(updateParams);

  const handleGoIdxClick = (idx: string) => {
    // 현재 쿼리 파라미터를 /add 경로에 추가
    router.push({
      pathname: `/material/view/${idx}`,
      query: router.query,
    });
  };

  const Th = [
    { id: 1, label: "원재료 코드", sort: "material_code" },
    { id: 2, label: "상품 구분", sort: "" },
    { id: 3, label: "대분류", sort: "" },
    { id: 4, label: "중분류", sort: "" },
    { id: 5, label: "소분류", sort: "" },
    { id: 6, label: "구분", sort: "evi_material_storage_type" },
    { id: 7, label: "원재료명", sort: "material_name_ko" },
    { id: 8, label: "매입가", sort: "purchase_price" },
    { id: 9, label: "판매가", sort: "sale_price" },
    { id: 10, label: "거래처", sort: "" },
    { id: 11, label: "등록일", sort: "created_date" },
    { id: 12, label: "수정일", sort: "updated_date" },
    { id: 13, label: "상태", sort: "" },
  ];

  return (
    <TableWrap>
      <Table className="basic">
        <colgroup>
          {[140, 80, 95, 80, 95, 100, 170, 110, 110, 180, 130, 130, 116].map(
            (el, i) => (
              <col key={i} width={getTableWidthPercentage(el)} />
            )
          )}
        </colgroup>
        <thead>
          <tr>
            {Th.map((el, i) => (
              <th key={i} onClick={() => el.sort && toggleSort(el.sort)}>
                <span className="th_title">
                  {el.label}
                  {el.sort && <ToggleSort el={el} sortState={sortState} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonTh colLength={13} />
          ) : data?.list.length === 0 ? (
            <tr>
              <td colSpan={10} rowSpan={10}>
                <Empty Icon={<IoAlertCircleOutline size={42} />} />
              </td>
            </tr>
          ) : (
            data?.list.map((material) => (
              <tr
                key={material.material_code}
                onClick={() =>
                  handleGoIdxClick(String(material.material_info_idx))
                }
              >
                <td className="code">
                  <Link
                    href={{
                      pathname: `/material/view/${material.material_info_idx}`,
                      query: router.query,
                    }}
                  >
                    {material.material_code}
                  </Link>
                </td>
                <td>{material.evv_material_product_type}</td>
                <td>{material.mcn_large}</td>
                <td>{material.mcn_middle}</td>
                <td>{material.mcn_small}</td>
                <td>{material.evv_material_storage_type}</td>
                <td>{material.material_name_ko}</td>
                <td>{material.purchase_price.toLocaleString()}원</td>
                <td>{material.sale_price.toLocaleString()}원</td>
                <td>{material.pcn_manufacturer}</td>
                <td>{material.created_date}</td>
                <td>{material.updated_date}</td>
                <td>
                  <Badge
                    color={
                      material.evv_material_status === "운영" ? "green" : "red"
                    }
                    size="sm"
                    dot
                  >
                    {material.evv_material_status}
                  </Badge>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </TableWrap>
  );
};

export default ManageListTable;
