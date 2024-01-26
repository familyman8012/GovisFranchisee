import { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchStoreSearchModal } from "ApiFarm/search-modal";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Sync from "@ComponentFarm/atom/icons/Sync";
import { ListHandlerWrap } from "@ComponentFarm/layout/styles";
import StoreSearchPopup from "@ComponentFarm/modal/SearchPopup/StoreSearchPopup";
import ListFilterSelects from "@ComponentFarm/molecule/ListFilterSelects/ListFilterSelects";
import SearchKeyword from "@ComponentFarm/molecule/SearchKeyword/SearchKeyword";
import { QueryParams } from "HookFarm/useQueryParams";
import { linkMenuSelectConfig } from "./const";
import useSelectItems from "../common/FilterTable/useFilterHandler";

interface Props {
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
  resetParams: () => void;
}
const MenuLinkFilter = ({ params, updateParams, resetParams }: Props) => {
  const storeSelect = useSelectItems(
    "store_name",
    params.store_idx
      ?.toString()
      .split(",")
      .map((item) => ({ idx: item, name: "" }))
  );

  const { data: storeModalData } = useQuery(
    ["searchModal", "store", storeSelect.filters],
    () => fetchStoreSearchModal(storeSelect.filters),
    { enabled: storeSelect.isOpen || !!params.store_idx }
  );

  const storeSelectForParmas = useMemo(
    () => ({
      ...storeSelect,
      setSelectItems: (items: any) => {
        updateParams({
          ...params,
          store_idx: items.map((item: any) => item.idx).join(","),
          current_num: 1,
        });
        storeSelect.setSelectItems(items);
      },
    }),
    [storeSelect, params]
  );
  return (
    <ListHandlerWrap>
      <StoreSearchPopup
        setConfig={storeSelectForParmas}
        data={storeModalData}
      />
      <div className="line line1">
        <ListFilterSelects
          selectConfig={linkMenuSelectConfig}
          params={params}
          updateParams={updateParams}
        />
        <div className="field">
          <Button
            variant="gostSecondary"
            onClick={() => storeSelect.setIsOpen(true)}
          >
            매장 선택
          </Button>
        </div>
        <div className="field">
          <Button
            className="btn_reset"
            variant="transparent"
            onClick={() => {
              resetParams();
              storeSelect.setSelectItems([]);
            }}
            LeadingIcon={<Sync />}
          >
            초기화
          </Button>
        </div>
        <div className="right">
          <SearchKeyword
            placeholder="미확인 메뉴명 검색"
            params={useMemo(
              () => ({ search_keyword: params.unidentified_menu_name ?? "" }),
              [params]
            )}
            handler={({ search_keyword }) =>
              updateParams({
                ...params,
                unidentified_menu_name: search_keyword,
                current_num: 1,
              })
            }
          />
        </div>
      </div>
    </ListHandlerWrap>
  );
};

export default MenuLinkFilter;
