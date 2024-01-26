import { Button } from "@ComponentFarm/atom/Button/Button";
import Sync from "@ComponentFarm/atom/icons/Sync";
import { ListFilterStyle } from "@ComponentFarm/common";
import ListDatePickers from "@ComponentFarm/molecule/ListDatePickers/ListDatePickers";
import SearchKeyword from "@ComponentFarm/molecule/SearchKeyword/SearchKeyword";
import { QueryParams } from "HookFarm/useQueryParams";
import { categoryDateConfig } from "./const";

export type keywordType = {
  search_type?: string;
  search_keyword: string;
};

interface ICategoryFilterProps {
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
}

const CategoryFilter = ({
  params,
  updateParams,
  resetParams,
}: ICategoryFilterProps) => {
  const handlerKeyword = (keyword: keywordType) =>
    updateParams({
      search_target: "menu_category_name",
      search_keyword: keyword.search_keyword,
      page: 1,
    });
  return (
    <ListFilterStyle className="justify-between">
      <div className="group">
        <ListDatePickers
          dateConfig={categoryDateConfig}
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
          placeholder="카테고리명 검색"
          handler={handlerKeyword}
        />
      </div>
    </ListFilterStyle>
  );
};

export default CategoryFilter;
