import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchStoreSearchModal } from "ApiFarm/search-modal";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Sync from "@ComponentFarm/atom/icons/Sync";
import { Select } from "@ComponentFarm/atom/Select/Select";
import StoreSearchPopup from "@ComponentFarm/modal/SearchPopup/StoreSearchPopup";
import SelectItemsList from "@ComponentFarm/template/common/FilterTable/SelectItemsList";
import {
  FilterTable,
  FilterTableBtnBox,
} from "@ComponentFarm/template/common/FilterTable/style";
import useSelectItems from "@ComponentFarm/template/common/FilterTable/useFilterHandler";
import { QueryParams } from "HookFarm/useQueryParams";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

interface FilterTableFormProps {
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
  hideStatusFilter?: boolean;
}

const statusOptions = [
  {
    value: "",
    label: "전체",
  },
  {
    value: "1",
    label: "ON",
  },
  {
    value: "2",
    label: "OFF",
  },
];

const useOptions = [
  {
    value: "",
    label: "전체",
  },
  {
    value: "1",
    label: "사용",
  },
  {
    value: "2",
    label: "미사용",
  },
];

const AisttDeviceFilter = ({
  params,
  updateParams,
  resetParams,
  hideStatusFilter,
}: FilterTableFormProps) => {
  const [useStt, setUseStt] = useState(params.is_use_stt ?? "");
  const [programStatus, setProgramStatus] = useState(
    params.program_status ?? ""
  );

  const storeSelect = useSelectItems("store_name");

  const { data: storeModalData } = useQuery(
    ["searchModal", "store", storeSelect.filters],
    () => fetchStoreSearchModal(storeSelect.filters),
    { cacheTime: 0, enabled: storeSelect.isOpen || !!params.store_idx }
  );

  const filterItems = [
    {
      title: "매장 구분",
      select: storeSelect,
    },
  ];

  // params에 따른 초기화
  useEffect(() => {
    if (params.store_idx) {
      const setStoreItems = storeModalData?.list
        .filter((item) =>
          String(params.store_idx)
            .split(",")
            .includes(item.store_idx.toString())
        )
        ?.map((item) => ({
          idx: String(item.store_idx),
          name: item.store_name,
        }));
      if (setStoreItems) {
        storeSelect?.setSelectItems(setStoreItems);
      }
    }
  }, [params.store_idx, storeModalData?.list]);

  const handleFilterResult = () => {
    updateParams({
      ...params,
      is_use_stt: useStt,
      program_status: programStatus,
      store_idx: storeSelect.selectItems.map((item) => item.idx).join(","),
      current_num: 1,
    });
  };

  const handlerReset = () => {
    setUseStt("");
    setProgramStatus("");
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
          {!hideStatusFilter && (
            <tr>
              <th scope="row">상태별 구분</th>
              <td>
                <div className="inner">
                  <div className="select_box">
                    <Select
                      options={useOptions}
                      selectedOption={useStt ?? ""}
                      setSelectedOption={({ value }: { value: string }) =>
                        setUseStt(value)
                      }
                      placeholder="전체"
                      prefixLabel="도입 상태"
                    />
                    <Select
                      options={statusOptions}
                      selectedOption={programStatus ?? ""}
                      setSelectedOption={({ value }: { value: string }) =>
                        setProgramStatus(value)
                      }
                      prefixLabel="프로그램 상태"
                    />
                  </div>

                  <Button
                    className="btn_reset"
                    variant="transparent"
                    onClick={() => {
                      setUseStt("");
                      setProgramStatus("");
                    }}
                    LeadingIcon={<Sync />}
                  >
                    초기화
                  </Button>
                </div>
              </td>
            </tr>
          )}
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
      <StoreSearchPopup setConfig={storeSelect} data={storeModalData} />
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

export default AisttDeviceFilter;
