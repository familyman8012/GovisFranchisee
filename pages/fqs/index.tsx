import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
// import { Container } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import dayjs from "dayjs";

import { Calendar } from "@emotion-icons/bootstrap/Calendar";

import { iFQSListItem, iFQSListRequest } from "InterfaceFarm/Fqs";
import { fetchFQSList } from "ApiFarm/fqs";

import { Button } from "ComponentsFarm/elements/Button";
import ListMoreButton from "ComponentsFarm/elements/ListMoreButton";

import Layout from "ComponentsFarm/layouts";
import { Datepicker } from "ComponentsFarm/elements/Datepicker";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import { FqsListPageStyle } from "ComponentsFarm/pageComp/fqs/styles";
import { FormCheckbox } from "ComponentsFarm/elements/Checkbox";
import { ListLoading } from "ComponentsFarm/elements/Loading";
import CategorySelect from "ComponentsFarm/pageComp/fqs/CategorySelect";
import FqsListItem from "ComponentsFarm/pageComp/fqs/ListItem";

const DatepickerButton = React.forwardRef<
  any,
  { value?: string; disasbled?: boolean; onClick?: () => void }
>(({ value, disasbled, onClick, ...otherProps }, ref) => {
  return (
    <Button {...otherProps} leftIcon={<Calendar />} clear onClick={onClick}>
      {value ? value.split(" - ").join("\n~ ") : ""}
    </Button>
  );
});

const SORT_TYPE_OPTIONS = [
  { label: "최근 제조 순", value: 1 },
  { label: "평균 평점 순", value: 2 },
];

export default function FoodQualityList() {
  const router = useRouter();
  const [params, setParams] = useState<iFQSListRequest>({
    current_page_number: 1,
    per_page_number: 3,
    category_idx: "",
    record_start_dt: dayjs().add(-30, "day").format("YYYY-MM-DD"),
    record_end_dt: dayjs().format("YYYY-MM-DD"),
    sort_type: 1,
  });

  const { fetchNextPage, hasNextPage, data, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      ["fqs-list", params],
      ({ pageParam = 1 }) =>
        fetchFQSList({ ...params, current_page_number: pageParam }),
      {
        getNextPageParam: (response, allPages) => {
          const maxPageNumber = response.total / params.per_page_number;
          if (maxPageNumber < allPages.length + 1) return undefined;
          return allPages.length + 1;
        },
        cacheTime: 0,
      }
    );

  const goDetail = (item: iFQSListItem) =>
    router.push(`/fqs/${item.quality_info_idx}`);
  const handleDate = ([record_start_dt, record_end_dt]: string[]) =>
    setParams({
      ...params,
      record_start_dt,
      record_end_dt,
      current_page_number: 1,
    });

  return (
    <Layout title="제조 목록">
      <FqsListPageStyle>
        <div className="header">
          <Datepicker
            value={[params.record_start_dt, params.record_end_dt]}
            editable={false}
            className={"filter-datepicker header-item"}
            customInput={<DatepickerButton />}
            range
            onChange={handleDate}
          />
          <div className="header-item">
            <CategorySelect
              onSelect={(ids) =>
                setParams((params) => ({
                  ...params,
                  category_idx: ids.join(","),
                }))
              }
            />
          </div>
        </div>
        <div className="content">
          <div className="sort">
            {SORT_TYPE_OPTIONS.map((opt) => (
              <FormCheckbox
                checked={params.sort_type === opt.value}
                value={opt.value}
                label={opt.label}
                onChange={() =>
                  setParams((params) => ({ ...params, sort_type: opt.value }))
                }
              />
            ))}
          </div>
          <div className="list">
            {data?.pages.map(({ list }) =>
              list.map((row) => <FqsListItem item={row} onClick={goDetail} />)
            )}
            {data?.pages[0].list.length === 0 && (
              <EmptyView>조회된 데이터가 없습니다.</EmptyView>
            )}
          </div>
          {(isFetchingNextPage || isLoading) && <ListLoading />}
          {hasNextPage && (
            <ListMoreButton
              loading={isFetchingNextPage || isLoading}
              handler={fetchNextPage}
            />
          )}
        </div>
      </FqsListPageStyle>
    </Layout>
  );
}
