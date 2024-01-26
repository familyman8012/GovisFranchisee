import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { fetchProductSearchModal } from "ApiFarm/search-modal";
import DateRangePicker from "@ComponentFarm/modules/DateRange/DateRange";
import { DateRangeType } from "@ComponentFarm/modules/DateRange/DiffDateRanger";
import { Button } from "@ComponentFarm/atom/Button/Button";
import ProductSearchPopup from "@ComponentFarm/modal/SearchPopup/ProductSearchPopup";
import SelectItemsList from "@ComponentFarm/template/common/FilterTable/SelectItemsList";
import {
  FilterTable,
  FilterTableBtnBox,
} from "@ComponentFarm/template/common/FilterTable/style";
import useSelectItems from "@ComponentFarm/template/common/FilterTable/useFilterHandler";
import { QueryParams } from "HookFarm/useQueryParams";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

interface FilterTableFormProps {
  storeName?: string;
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
}

const MonitoringDetailFilter = ({
  storeName,
  params,
  updateParams,
  resetParams,
}: FilterTableFormProps) => {
  // 기간 선택
  const [selectedDateRanges, setSelectedDateRanges] = useState<DateRangeType>([
    params.manufacture_dt_start
      ? dayjs(params.manufacture_dt_start as string).toDate()
      : null,
    params.manufacture_dt_finish
      ? dayjs(params.manufacture_dt_finish as string).toDate()
      : null,
  ]);

  // 팝업
  const productSelect = useSelectItems("product_name_ko");
  const storeSelect = useSelectItems("store_name");

  const { data: productModalData } = useQuery(
    ["searchModal", "product", productSelect.filters],
    () => fetchProductSearchModal(productSelect.filters),
    { cacheTime: 0, enabled: productSelect.isOpen || !!params.product_info_idx }
  );

  const filterItems = [
    {
      title: "제품 구분",
      select: productSelect,
    },
  ];

  // params에 따른 초기화
  useEffect(() => {
    if (params.product_info_idx) {
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
      }
    }
  }, [params.product_info_idx, productModalData?.list, params.store_idx]);

  const handleFilterResult = () => {
    const [date1, date2] = selectedDateRanges;

    let dateParams = {};
    if (selectedDateRanges.every((date) => date !== null)) {
      dateParams = {
        manufacture_dt_start: dayjs(date1).format("YYYY-MM-DD"),
        manufacture_dt_finish: dayjs(date2).format("YYYY-MM-DD"),
      };
    }

    updateParams({
      ...params,
      ...dateParams,
      product_info_idx: productSelect.selectItems
        .map((item) => item.idx)
        .join(","),
      store_idx: storeSelect.selectItems.map((item) => item.idx).join(","),
      current_num: 1,
    });
  };

  const handlerReset = () => {
    setSelectedDateRanges([null, null]);
    productSelect.setSelectItems([]);
    storeSelect.setSelectItems([]);
    resetParams();
  };

  return (
    <>
      <FilterTable>
        <colgroup>
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(1416)} />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">매장명</th>
            <td>
              <div className="inner">
                <input
                  type="text"
                  value={storeName}
                  readOnly
                  placeholder="매장명"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">기간 선택</th>
            <td>
              <div className="inner">
                <DateRangePicker
                  onDateRangeChange={(update) => setSelectedDateRanges(update)}
                  initialDateRange={selectedDateRanges}
                  placeholder="기준일"
                />
              </div>
            </td>
          </tr>
          {filterItems.map(({ title, select }) => (
            <SelectItemsList
              key={title}
              title={title}
              items={select.selectItems}
              itemsSetting={select.setSelectItems}
              openModal={() => select.setIsOpen(true)}
              deleteItem={select.handleDeleteItem}
            />
          ))}
        </tbody>
      </FilterTable>
      <ProductSearchPopup setConfig={productSelect} data={productModalData} />
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

export default MonitoringDetailFilter;
