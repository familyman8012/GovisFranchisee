import React from "react";
import { css } from "@emotion/react";
import { ListHandlerWrap } from "@ComponentFarm/layout/styles";
import SearchKeyword from "@ComponentFarm/molecule/SearchKeyword/SearchKeyword";
import { QueryParams } from "HookFarm/useQueryParams";
import { searchOption } from "./const";

export type keywordType = {
  search_target?: string;
  search_keyword: string;
};
interface IListHandler {
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
}

const pageListSetting = css`
  .line1 {
    .field1,
    .field2,
    .field3 {
      width: 15.3rem;
    }
    .field4,
    .field5 {
      width: 13.5rem;
    }
  }
  .line2 {
    .left .field {
      width: 15.3rem;
    }
  }
`;

const ListFilter = ({ params, updateParams }: IListHandler) => {
  const handlerKeyword = (keyword: keywordType) => {
    if (keyword.search_target) {
      updateParams({ ...keyword, current_num: 1 });
    } else {
      // search_target이 없을 경우, search_keyword만 사용.
      updateParams({ search_keyword: keyword.search_keyword, current_num: 1 });
    }
  };

  return (
    <ListHandlerWrap css={pageListSetting}>
      <div className="line line1">
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

export default ListFilter;
