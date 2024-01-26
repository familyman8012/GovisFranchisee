import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  DiffDateRanger,
  DiffDateType,
} from "@ComponentFarm/modules/DateRange/DiffDateRanger";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { Sync } from "@ComponentFarm/atom/icons";
import { IOption, Select } from "@ComponentFarm/atom/Select/Select";
import { QueryParams } from "HookFarm/useQueryParams";
import { convertEnv } from "@UtilFarm/convertEnvironment";

export const FilterStatiscDashBoardWrap = styled.div`
  display: flex;
  margin: 1.6rem 0;
  padding: 1.6rem;
  border-radius: 0.8rem;
  border: 2px solid var(--color-neutral-90, #e5e5e5);
  background: #fff;

  .btn_reset {
    margin-left: 1.6rem;
  }

  .btn_search {
    margin-left: auto;
  }
`;

interface FilterTableFormProps {
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
}

const FilterTableForm = ({
  params,
  updateParams,
  resetParams,
}: FilterTableFormProps) => {
  // 제품카테고리
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

  // 기간 선택
  const [selectedDateRanges, setSelectedDateRanges] = useState<DiffDateType>({
    range1: [null, null],
    range2: [null, null],
  });

  const [winReady, setWinReady] = useState(false);
  useEffect(() => {
    setWinReady(true);
  }, []);

  const handleFilterResult = () => {
    const { range1, range2 } = selectedDateRanges;

    let dateParams = {};
    if (range1.every((date) => date !== null)) {
      dateParams = {
        base_dt_start: dayjs(range1[0]).format("YYYY-MM-DD"),
        base_dt_finish: dayjs(range1[1]).format("YYYY-MM-DD"),
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
      evi_product_category:
        selectedOption?.value || params.evi_product_category,
    });
  };

  const handlerReset = () => {
    setSelectedOption(null);
    setSelectedDateRanges({
      range1: [null, null],
      range2: [null, null],
    });
    resetParams();
  };

  return (
    <FilterStatiscDashBoardWrap>
      <div
        css={css`
          min-width: 10.84rem;
        `}
      >
        {winReady ? (
          <Select
            options={convertEnv("product_category")}
            selectedOption={
              selectedOption === null && params.evi_product_category
                ? convertEnv("product_category").find(
                    (el) =>
                      String(el.value) === String(params.evi_product_category)
                  )
                : selectedOption
            }
            setSelectedOption={setSelectedOption}
            prefixLabel="제품"
            placeholder="전체"
          />
        ) : (
          <div
            css={css`
              height: 4.4rem;
              border: 1px solid var(--input-selectBorder) !important;
              border-radius: 4px;
            `}
          />
        )}
      </div>
      <DiffDateRanger
        type="diff"
        selectedDateRanges={selectedDateRanges}
        setSelectedDateRanges={setSelectedDateRanges}
        params={params}
      />
      <Button
        className="btn_reset"
        variant="transparent"
        onClick={handlerReset}
        LeadingIcon={<Sync />}
      >
        초기화
      </Button>
      <Button className="btn_search" onClick={handleFilterResult}>
        조회
      </Button>
    </FilterStatiscDashBoardWrap>
  );
};

export default FilterTableForm;
