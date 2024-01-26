import React from "react";
import { ISearcPopupProps, IStoreModalRes } from "InterfaceFarm/search-modal";
import { StatusStr, StoreStr, selectConfig } from "./const";
import SearchPopup, { ICommonResultData } from "./SearchPopup";

interface IStoreResultData extends ICommonResultData {
  region: string;
  commercial_area: string;
  store_type: string;
  status: string;
}

const StoreSearchPopup = ({
  setConfig,
  data,
}: {
  setConfig: ISearcPopupProps;
  data?: IStoreModalRes;
}) => {
  const {
    isOpen,
    setIsOpen,
    selectItems,
    setSelectItems,
    initialValues,
    filters,
    setFilters,
  } = setConfig;

  // 테이블 셋팅
  const tableCofig = {
    th: ["지역별", "상권별", "매장별", "매장 상태", "매장명"],
    col: [46, 120, 120, 120, 120, 157],
  };

  // 검색 테이블에 맞추어 정리.
  const resultData =
    data?.list?.map((el) => {
      return {
        idx: el.store_idx,
        region: el.region,
        commercial_area: el.commercial_area,
        store_type: StoreStr[el.store_type],
        status: StatusStr[el.store_status],
        label: el.store_name,
      };
    }) || [];

  return (
    <SearchPopup<IStoreResultData>
      title="매장 상세 설정"
      keyWordSearchTitle="매장명"
      selectConfig={selectConfig}
      tableCofig={tableCofig}
      resultData={resultData}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      filters={filters}
      setFilters={setFilters}
      initialValues={initialValues}
      selectItems={selectItems}
      setSelectItems={setSelectItems}
      badge={["운영중", "운영예정", "폐업"]}
    />
  );
};

export default StoreSearchPopup;
