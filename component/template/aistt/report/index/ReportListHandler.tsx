import React, { useEffect } from "react";
import { css } from "@emotion/react";
import DateRangePicker from "@ComponentFarm/modules/DateRange/DateRange";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { Sync } from "@ComponentFarm/atom/icons";
import { ListHandlerWrap } from "@ComponentFarm/layout/styles";
import ListFilterSelects from "@ComponentFarm/molecule/ListFilterSelects/ListFilterSelects";
import SearchKeyword from "@ComponentFarm/molecule/SearchKeyword/SearchKeyword";
import useDateRange from "HookFarm/useDateRange";
import { QueryParams } from "HookFarm/useQueryParams";
import { envConfigGeneration } from "@UtilFarm/convertEnvironment";
import { searchOption, selectConfigSet } from "./const";

export type keywordType = {
  search_target?: string;
  search_keyword: string;
};

interface IListHandler {
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
}

const pageListSetting = css`
  button {
    margin-left: 1.6rem;
  }

  .line2 {
    .left .field {
      width: 15.3rem;
    }
  }
`;

const ReportListHandler = ({
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

  const selectConfig = envConfigGeneration(selectConfigSet);

  console.log("params", params);

  const { selectedDateRanges, setSelectedDateRanges, handleFilterResult } =
    useDateRange({
      dateKeys: {
        startKey: "registration_start_dt",
        endKey: "registration_end_dt",
      },
      params,
      updateParams,
    });

  useEffect(() => {
    handleFilterResult();
  }, [selectedDateRanges]);

  const resetHandler = () => {
    resetParams();
    setTimeout(() => {
      setSelectedDateRanges([null, null]);
    }, 100);
  };

  return (
    <ListHandlerWrap css={pageListSetting}>
      <div className="line line1">
        <div className="left">
          <ListFilterSelects
            selectConfig={selectConfig}
            params={params}
            updateParams={updateParams}
          />
          <DateRangePicker
            onDateRangeChange={(update) => {
              setSelectedDateRanges(update);
            }}
            initialDateRange={selectedDateRanges}
            placeholder="등록일"
          />
          <Button
            className="btn_reset"
            variant="transparent"
            onClick={resetHandler}
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
    </ListHandlerWrap>
  );
};

export default ReportListHandler;
