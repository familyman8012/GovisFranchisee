import React from "react";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Sync from "@ComponentFarm/atom/icons/Sync";
import ListDatePickers from "@ComponentFarm/molecule/ListDatePickers/ListDatePickers";
import ListFilterSelects from "@ComponentFarm/molecule/ListFilterSelects/ListFilterSelects";
import SearchKeyword, {
  SearchkeywordType,
} from "@ComponentFarm/molecule/SearchKeyword/SearchKeyword";
import { QueryParams } from "HookFarm/useQueryParams";
import useSelectConfigWithEnv from "HookFarm/useSelectConfigWithEnv";
import { dateConfig, searchOption, selectConfig } from "./const";
import { ListHandlerStyle } from "./style";

interface IListHandler {
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
}

const RecipeFilter = ({ params, updateParams, resetParams }: IListHandler) => {
  const handlerKeyword = (keyword: SearchkeywordType) => {
    if (keyword.search_target) {
      updateParams({
        ...params,
        search_target: keyword.search_target,
        search_keyword: keyword.search_keyword,
        current_num: 1,
      });
    } else {
      updateParams({
        ...params,
        search_keyword: keyword.search_keyword,
        current_num: 1,
      });
    }
  };

  const recipeSelectConfigWithEnvs = useSelectConfigWithEnv(selectConfig);

  return (
    <ListHandlerStyle>
      <div className="line group">
        <ListFilterSelects
          selectConfig={recipeSelectConfigWithEnvs}
          params={params}
          updateParams={updateParams}
        />
      </div>

      <div className="line justify-between">
        <div className="group">
          <ListDatePickers
            dateConfig={dateConfig}
            params={params}
            updateParams={updateParams}
          />
          <Button
            className="btn_reset"
            variant="transparent"
            onClick={resetParams}
            LeadingIcon={<Sync />}
          >
            초기화
          </Button>
        </div>
        <div className="group">
          <SearchKeyword
            params={params}
            selOption={searchOption}
            handler={handlerKeyword}
          />
        </div>
      </div>
    </ListHandlerStyle>
  );
};

export default RecipeFilter;
