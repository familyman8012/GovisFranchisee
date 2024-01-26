import { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchMenuCategoryList } from "ApiFarm/menu";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Sync from "@ComponentFarm/atom/icons/Sync";
import ListDatePickers from "@ComponentFarm/molecule/ListDatePickers/ListDatePickers";
import ListFilterSelects from "@ComponentFarm/molecule/ListFilterSelects/ListFilterSelects";
import SearchKeyword from "@ComponentFarm/molecule/SearchKeyword/SearchKeyword";
import { QueryParams } from "HookFarm/useQueryParams";
import useSelectConfigWithEnv from "HookFarm/useSelectConfigWithEnv";
import { categoryDateConfig, menuSelectConfig } from "./const";
import { ListHandlerStyle } from "../recipe/style";

export type keywordType = {
  search_type?: string;
  search_keyword: string;
};

interface IMenuFilterProps {
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
}

const MenuFilter = ({
  params,
  updateParams,
  resetParams,
}: IMenuFilterProps) => {
  const categoryQuery = useQuery(["menu-categories"], () =>
    fetchMenuCategoryList({
      per_num: 9999,
      current_num: 1,
    })
  );
  const handlerKeyword = (keyword: keywordType) => {
    updateParams({
      search_target: "menu_name",
      search_keyword: keyword.search_keyword,
      current_num: 1,
    });
  };

  const categoryOptionList = useMemo(
    () =>
      (categoryQuery?.data?.list ?? []).map((item) => ({
        value: `${item.menu_category_idx}`,
        label: item.menu_category_name,
      })),
    [categoryQuery.data]
  );

  const menuSelectConfigWithEnv = useSelectConfigWithEnv(menuSelectConfig);

  return (
    <ListHandlerStyle>
      <div className="line group">
        <ListFilterSelects
          selectConfig={menuSelectConfigWithEnv}
          params={params}
          updateParams={updateParams}
        />
        <ListFilterSelects
          selectConfig={[
            {
              label: "카테고리",
              field: "menu_category_idx",
              options: [{ value: "", label: "전체" }, ...categoryOptionList],
            },
          ]}
          params={params}
          updateParams={updateParams}
        />
      </div>
      <div className="line justify-between">
        <div className="group ">
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
            placeholder="메뉴명 검색"
            handler={handlerKeyword}
          />
        </div>
      </div>
    </ListHandlerStyle>
  );
};

export default MenuFilter;
