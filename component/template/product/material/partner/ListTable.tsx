/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IPartnerRes } from "InterfaceFarm/material";
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
  data?: IPartnerRes;
  title: string;
  updateParams: (newParams: QueryParams) => void;
}

const ListTable = ({ isLoading, data, title, updateParams }: TableProps) => {
  const router = useRouter();
  const { sortState, setSortState, toggleSort } = useSortable(updateParams);

  const Th = [
    { id: 1, label: `${title} 코드`, sort: "partner_company_code" },
    { id: 2, label: `${title}명`, sort: "partner_company_name" },
    { id: 3, label: "제품 수", sort: "material_count" },
    { id: 4, label: "등록일", sort: "created_date" },
    { id: 5, label: "수정일", sort: "updated_date" },
    { id: 6, label: "상태", sort: "" },
  ];

  const handleGoIdxClick = (idx: string) => {
    router.push({
      pathname: `/material/partner/view/${idx}`,
      query: router.query,
    });
  };

  useEffect(() => {
    setSortState({});
  }, [title]);

  return (
    <TableWrap>
      <Table className="basic">
        <colgroup>
          {[240, 380, 200, 300, 300, 160].map((el, i) => (
            <col key={i} width={getTableWidthPercentage(el)} />
          ))}
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
            <SkeletonTh colLength={6} />
          ) : data?.list.length === 0 ? (
            <tr>
              <td colSpan={6} rowSpan={10}>
                <Empty Icon={<IoAlertCircleOutline size={42} />} />
              </td>
            </tr>
          ) : (
            data?.list.map((partner) => (
              <tr
                key={partner.partner_company_code}
                onClick={() =>
                  handleGoIdxClick(String(partner.partner_company_idx))
                }
              >
                <td className="code">{partner.partner_company_code}</td>
                <td>{partner.partner_company_name}</td>
                <td>{partner.material_count}개</td>
                <td>{partner.created_date}</td>
                <td>{partner.updated_date}</td>
                <td>
                  <Badge
                    dot
                    color={
                      partner.evv_partner_company_status === "운영"
                        ? "green"
                        : "red"
                    }
                  >
                    {partner.evv_partner_company_status}
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

export default ListTable;
