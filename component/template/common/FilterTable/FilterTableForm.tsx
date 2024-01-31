import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { fetchProductSearchModal } from "ApiFarm/search-modal";
import {
  DiffDateRanger,
  DiffDateType,
} from "@ComponentFarm/modules/DateRange/DiffDateRanger";
import { BtnDelete, Button } from "@ComponentFarm/atom/Button/Button";
import ProductSearchPopup from "@ComponentFarm/modal/SearchPopup/ProductSearchPopup";
import { QueryParams } from "HookFarm/useQueryParams";
import { FilterTable, FilterTableBtnBox, FilterTableWrap } from "./style";
import useSelectItems from "./useFilterHandler";
import Sync from "@ComponentFarm/atom/icons/Sync";
import { Search } from "@ComponentFarm/atom/icons";

interface FilterTableFormProps {
  type?: string;
  dateKeys?: {
    startKey: string; // 시작 날짜의 파라미터 키
    endKey: string; // 종료 날짜의 파라미터 키
  };
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
}

const FilterTableForm = ({
  type,
  dateKeys = {
    startKey: "search_start_dt",
    endKey: "search_end_dt",
  },
  params,
  updateParams,
  resetParams,
}: FilterTableFormProps) => {
  // 기간 선택
  const [selectedDateRanges, setSelectedDateRanges] = useState<DiffDateType>(
    type === "diff"
      ? {
          range1: [null, null],
          range2: [null, null],
        }
      : { range1: [null, null] }
  );

  // 팝업
  const productSelect = useSelectItems("product_name_ko");

  const { data: productModalData } = useQuery(
    ["searchModal", "product", productSelect.filters],
    () => fetchProductSearchModal(productSelect.filters),
    { cacheTime: 0, enabled: productSelect.isOpen || !!params.product_info_idx }
  );

  // params에 따른 초기화
  useEffect(() => {
    if (params.product_info_idx && productSelect?.isFirstLoad) {
      const setProductItems = productModalData?.list
        ?.filter((item) =>
          String(params.product_info_idx)
            .split(",")
            .includes(item.product_info_idx.toString())
        )
        ?.map((item) => ({
          idx: String(item.product_info_idx),
          name: item.product_name_ko,
        }));
      if (setProductItems) {
        productSelect?.setSelectItems(setProductItems);
        productSelect?.setIsFirstLoad(false);
      }
    }
  }, [params.product_info_idx, productModalData?.list, params.store_idx]);

  const handleFilterResult = () => {
    const { range1, range2 } = selectedDateRanges;

    let dateParams = {};
    if (range1 && range1.every((date) => date !== null)) {
      dateParams =
        type === "diff"
          ? {
              base_dt_start: range1[0]
                ? dayjs(range1[0]).format("YYYY-MM-DD")
                : "0000-00-00",
              base_dt_finish: range1[1]
                ? dayjs(range1[1]).format("YYYY-MM-DD")
                : "0000-00-00",
            }
          : {
              [dateKeys.startKey]: dayjs(range1[0]).format("YYYY-MM-DD"),
              [dateKeys.endKey]: dayjs(range1[1]).format("YYYY-MM-DD"),
            };
    }

    if (range2 && range2.every((date) => date !== null)) {
      dateParams = {
        ...dateParams,
        comparison_dt_start: range2[0]
          ? dayjs(range2[0]).format("YYYY-MM-DD")
          : "0000-00-00",
        comparison_dt_finish: range2[1]
          ? dayjs(range2[1]).format("YYYY-MM-DD")
          : "0000-00-00",
      };
    }

    updateParams({
      ...params,
      ...dateParams,
      product_info_idx: productSelect.selectItems
        .map((item) => item.idx)
        .join(","),
    });
  };

  const handlerReset = () => {
    setSelectedDateRanges({
      range1: [null, null],
      range2: [null, null],
    });
    productSelect.setSelectItems([]);
    resetParams();
  };

  return (
    <>
      <FilterTableWrap>
        <FilterTable>
          <dl className="control_filter_line">
            <dt className="tit_filter">기간 선택</dt>
            <dd className="box_filter_inp">
              <DiffDateRanger
                type={type}
                selectedDateRanges={selectedDateRanges}
                setSelectedDateRanges={setSelectedDateRanges}
                params={params}
                dateKeys={dateKeys}
              />
            </dd>
          </dl>
          <dl className="control_filter_line">
            <dt className="tit_filter">
              <span className="txt">제품 구분</span>
            </dt>
            <dd className="box_filter_inp">
              <div className="inner">
                <span className="btn_box">
                  <Button
                    className="btn_search"
                    variant="gostSecondary"
                    onClick={() => productSelect.setIsOpen(true)}
                  >
                    <span className="txt_mobile">제품 구분 검색</span>
                    <span className="txt_pc">검색</span>
                  </Button>
                  <Button
                    className="btn_reset"
                    variant="transparent"
                    onClick={() => productSelect.setSelectItems([])}
                    LeadingIcon={<Sync />}
                  >
                    초기화
                  </Button>
                </span>
                <div className="list_select_item">
                  {productSelect.selectItems.length > 4 ? (
                    <Button
                      variant="selectItem"
                      onClick={() => productSelect.setIsOpen(true)}
                      TrailingIcon={
                        <BtnDelete
                          onClick={() => productSelect.setSelectItems([])}
                        />
                      }
                    >
                      {`${productSelect.selectItems[0].name}외 ${
                        productSelect.selectItems.length - 1
                      }개`}
                    </Button>
                  ) : (
                    productSelect.selectItems.map((el) => (
                      <Button
                        key={el.idx}
                        variant="selectItem"
                        TrailingIcon={
                          <BtnDelete
                            onClick={() =>
                              productSelect.handleDeleteItem(el.idx)
                            }
                          />
                        }
                      >
                        {el.name}
                      </Button>
                    ))
                  )}
                </div>
              </div>
            </dd>
          </dl>
        </FilterTable>
        <ProductSearchPopup setConfig={productSelect} data={productModalData} />
      </FilterTableWrap>
      <FilterTableBtnBox>
        <Button variant="gostSecondary" onClick={handlerReset}>
          초기화
        </Button>
        <Button variant="primary" onClick={handleFilterResult}>
          조회
        </Button>
      </FilterTableBtnBox>
    </>
  );
};

export default FilterTableForm;
