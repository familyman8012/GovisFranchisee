import React, { useEffect } from "react";
import { NextRouter } from "next/router";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import { fetchStoreSearchModal } from "ApiFarm/search-modal";
import { Button } from "@ComponentFarm/atom/Button/Button";
import StoreSearchPopup from "@ComponentFarm/modal/SearchPopup/StoreSearchPopup";
import useSelectItems from "@ComponentFarm/template/common/FilterTable/useFilterHandler";
import { QueryParams } from "HookFarm/useQueryParams";
import { ButtonWidthTextDiv } from "../AreaBox";
import SubTitleBox from "../SubTitleBox";

interface IStoreSearchProps {
  router: NextRouter;
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
  storeCount?: number;
}

const StoreSearch = ({
  router,
  params,
  updateParams,
  resetParams,
  storeCount,
}: IStoreSearchProps) => {
  const storeSelect = useSelectItems("store_name");

  const { data: storeModalData } = useQuery(
    ["searchModal", "store", storeSelect.filters],
    () => fetchStoreSearchModal(storeSelect.filters),
    { cacheTime: 0, enabled: storeSelect.isOpen || !!params.store_idx }
  );

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
      store_idx: storeSelect.selectItems.map((item) => item.idx).join(","),
    });
  };

  useEffect(() => {
    if (router.isReady) {
      if (storeSelect.selectItems.length > 0) {
        handleFilterResult();
      }
      if (storeSelect.selectItems.length === 0) {
        resetParams();
      }
    }
  }, [storeSelect.selectItems.length, router.isReady]);

  return (
    <ButtonWidthTextDiv
      css={css`
        margin-top: 3rem;
      `}
    >
      <SubTitleBox title="결과" hideUnderline />
      <Button variant="gostPrimary" onClick={() => storeSelect.setIsOpen(true)}>
        매장 검색
      </Button>
      <StoreSearchPopup setConfig={storeSelect} data={storeModalData} />
    </ButtonWidthTextDiv>
  );
};

export default StoreSearch;
