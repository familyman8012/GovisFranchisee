import React from "react";
import { css } from "@emotion/react";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { Sync } from "@ComponentFarm/atom/icons";
import { ListHandlerWrap } from "@ComponentFarm/layout/styles";
import SearchKeyword from "@ComponentFarm/molecule/SearchKeyword/SearchKeyword";
import { QueryParams } from "HookFarm/useQueryParams";
import { searchOption } from "./const";

export type keywordType = {
  search_type?: string;
  search_keyword: string;
};

interface IStoreListHandler {
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
}

const pageListSetting = css`
  padding-top: 1.6rem;
  .line1 {
    .left .field {
      width: 15.3rem;
    }
  }
`;

const StoreListHandler = ({
  params,
  updateParams,
  resetParams,
}: IStoreListHandler) => {
  const handlerKeyword = (keyword: keywordType) => {
    if (keyword.search_type) {
      updateParams({ ...keyword, page: 1 });
    } else {
      // search_type이 없을 경우, search_keyword만 사용
      updateParams({ search_keyword: keyword.search_keyword, page: 1 });
    }
  };

  return (
    <ListHandlerWrap css={pageListSetting}>
      <div className="line line1">
        <div className="left">
          {/* <ListFilterSelects
            selectConfig={storeInfoSelectCofing}
            params={params}
            updateParams={updateParams}
          /> */}
          <Button
            className="btn_reset"
            variant="transparent"
            onClick={resetParams}
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

export default StoreListHandler;
