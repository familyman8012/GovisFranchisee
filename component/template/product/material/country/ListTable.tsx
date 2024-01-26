/* eslint-disable camelcase */
import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IPartnerCountryRes } from "InterfaceFarm/material";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import ToggleSort from "@ComponentFarm/atom/Sort/ToggleSort";
import { Table, TableWrap } from "@ComponentFarm/common";
import { QueryParams } from "HookFarm/useQueryParams";
import useSortable from "HookFarm/useSortable";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

interface TableProps {
  isLoading: boolean;
  data?: IPartnerCountryRes;
  updateParams: (newParams: QueryParams) => void;
}

const ListTable = ({ isLoading, data, updateParams }: TableProps) => {
  const { sortState, toggleSort } = useSortable(updateParams);

  const Th = [
    { id: 1, label: "원산지 코드", sort: "origin_code" },
    { id: 2, label: "원산지명", sort: "origin_name" },
    { id: 3, label: "등록일", sort: "created_date" },
  ];

  return (
    <TableWrap>
      <Table className="basic">
        <colgroup>
          {[600, 700, 236].map((el, i) => (
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
            <SkeletonTh colLength={3} />
          ) : data?.list.length === 0 ? (
            <tr>
              <td colSpan={3} rowSpan={10}>
                <Empty Icon={<IoAlertCircleOutline size={42} />} />
              </td>
            </tr>
          ) : (
            data?.list.map((country) => (
              <tr key={country.origin_code}>
                <td className="code">{country.origin_code}</td>
                <td>{country.origin_name}</td>
                <td>{country.created_date}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </TableWrap>
  );
};

export default ListTable;
