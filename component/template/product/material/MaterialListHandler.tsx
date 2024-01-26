import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import { fetchMaterialCategory } from "ApiFarm/ material";
import { IEnvironmentRes } from "InterfaceFarm/environment";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { Search, Sync } from "@ComponentFarm/atom/icons";
import { ListHandlerWrap } from "@ComponentFarm/layout/styles";
import ListDatePickers from "@ComponentFarm/molecule/ListDatePickers/ListDatePickers";
import ListFilterSelects from "@ComponentFarm/molecule/ListFilterSelects/ListFilterSelects";
import SearchKeyword from "@ComponentFarm/molecule/SearchKeyword/SearchKeyword";
import { QueryParams } from "HookFarm/useQueryParams";
import { envConfigGeneration } from "@UtilFarm/convertEnvironment";
import { transformCategoryByDepth } from "@UtilFarm/transformCategoryDepth";
import { dateConfig, searchOption } from "./const";
import { environmentConfigEntry } from "../manage/const";

export type keywordType = {
  search_target?: string;
  search_keyword: string;
};

interface IListHandler {
  environment: IEnvironmentRes;
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
}

const pageListSetting = css`
  .line1 {
    .field1,
    .field2,
    .field3 {
      width: 15.3rem;
    }
    .field4 {
      width: 13.5rem;
    }
  }
  .line2 {
    .left .field,
    .box_inp {
      display: flex;
      align-items: center;
    }
    label {
      margin: 0 1.6rem 0 0;
    }

    .separate {
      margin: 0 0.4rem;
    }

    .inp {
      width: 13.3rem;
    }
  }
`;

const ManageListHandler = ({
  environment,
  params,
  updateParams,
  resetParams,
}: IListHandler) => {
  const handlerKeyword = (keyword: keywordType) => {
    if (keyword.search_target) {
      updateParams({ ...keyword, current_num: 1 });
    } else {
      // search_target이 없을 경우, search_keyword만 사용
      updateParams({ search_keyword: keyword.search_keyword, current_num: 1 });
    }
  };

  // 분류선택 데이터
  const { data: materialCategory } = useQuery(["materialCategory"], () =>
    fetchMaterialCategory()
  );

  // 필터 구성
  const CATEGORY1 = useMemo(
    () => transformCategoryByDepth(materialCategory?.list, 1),
    [materialCategory?.list]
  );
  const CATEGORY2 = useMemo(
    () => transformCategoryByDepth(materialCategory?.list, 2),
    [materialCategory?.list]
  );
  const CATEGORY3 = useMemo(
    () => transformCategoryByDepth(materialCategory?.list, 3),
    [materialCategory?.list]
  );

  const selectConfigData = [
    { label: "대분류", field: "mci_large", options: CATEGORY1 },
    {
      label: "중분류",
      field: "mci_middle",
      options: CATEGORY2,
    },
    {
      label: "소분류",
      field: "mci_small",
      options: CATEGORY3,
    },
  ];

  const selectConfigAll =
    materialCategory &&
    selectConfigData.map((el) => ({
      ...el,
      options: [{ label: "전체", value: "" }, ...el.options],
    }));

  const envData: environmentConfigEntry[] = [
    ["구분", "material_storage_type"],
    ["원재료 상태", "material_status"],
  ];

  const envDataConvert = envConfigGeneration(envData);

  const selectConfig = materialCategory && [
    ...selectConfigAll,
    ...envDataConvert,
  ];

  const [purchasePrice, setPurchasePrice] = useState<{
    min: number | undefined;
    max: number | undefined;
  }>({ min: undefined, max: undefined });
  const [salePrice, setSalePrice] = useState<{
    min: number | undefined;
    max: number | undefined;
  }>({ min: undefined, max: undefined });

  const handlePriceSearch = (type: "purchase" | "sale") => {
    const currentPrice = type === "purchase" ? purchasePrice : salePrice;

    if (
      currentPrice.min !== undefined &&
      currentPrice.max !== undefined &&
      currentPrice.min > currentPrice.max
    ) {
      alert("최대 금액은 최소 금액보다 커야합니다.");
      return;
    }

    updateParams({
      [`${type}_price_min`]: String(currentPrice.min),
      [`${type}_price_max`]: currentPrice.max ? currentPrice.max : undefined,
    });
  };

  const handlerReset = () => {
    setPurchasePrice({ min: undefined, max: undefined });
    setSalePrice({ min: undefined, max: undefined });
    resetParams();
  };

  return (
    <ListHandlerWrap css={pageListSetting}>
      {materialCategory && (
        <>
          <div className="line line1">
            <ListFilterSelects
              selectConfig={selectConfig}
              params={params}
              updateParams={updateParams}
            />
            <ListDatePickers
              dateConfig={dateConfig}
              params={params}
              updateParams={updateParams}
            />
          </div>
          <div className="line line2">
            <div className="left">
              <span className="field field1">
                <label htmlFor="d">매입가</label>
                <span className="box_inp">
                  <input
                    type="text"
                    className="inp"
                    placeholder="최소 금액"
                    value={purchasePrice.min || ""}
                    onChange={(e) =>
                      setPurchasePrice((prev) => ({
                        ...prev,
                        min: Number(e.target.value) || undefined,
                      }))
                    }
                  />
                  <span className="separate">~</span>
                  <input
                    type="text"
                    className="inp"
                    placeholder="최대 금액"
                    value={purchasePrice.max || ""}
                    onChange={(e) =>
                      setPurchasePrice((prev) => ({
                        ...prev,
                        max: Number(e.target.value) || undefined,
                      }))
                    }
                  />
                </span>
                <Button
                  type="button"
                  variant="transparent"
                  IconOnly={<Search />}
                  onClick={() => handlePriceSearch("purchase")}
                >
                  <span className="hiddenZoneV">검색</span>
                </Button>
              </span>
              <span className="field field1">
                <label htmlFor="d">판매가</label>
                <span className="box_inp">
                  <input
                    type="text"
                    className="inp"
                    placeholder="최소 금액"
                    value={salePrice.min || ""}
                    onChange={(e) =>
                      setSalePrice((prev) => ({
                        ...prev,
                        min: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      }))
                    }
                  />
                  <span className="separate">~</span>
                  <input
                    type="text"
                    className="inp"
                    placeholder="최대 금액"
                    value={salePrice.max || ""}
                    onChange={(e) =>
                      setSalePrice((prev) => ({
                        ...prev,
                        max: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      }))
                    }
                  />
                </span>
                <Button
                  type="button"
                  variant="transparent"
                  IconOnly={<Search />}
                  onClick={() => handlePriceSearch("sale")}
                >
                  <span className="hiddenZoneV">검색</span>
                </Button>
              </span>
              <Button
                className="btn_reset"
                variant="transparent"
                onClick={handlerReset}
                LeadingIcon={<Sync />}
              >
                초기화
              </Button>
            </div>
            <div className="right">
              <SearchKeyword
                params={params}
                selOption={searchOption}
                handler={handlerKeyword}
              />
            </div>
          </div>
        </>
      )}
    </ListHandlerWrap>
  );
};

export default ManageListHandler;
