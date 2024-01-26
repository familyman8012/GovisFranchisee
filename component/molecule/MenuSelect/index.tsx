import React, { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import styled from "@emotion/styled";
import { fetchCommonMenuList } from "ApiFarm/common";
import { IMenuListItem } from "InterfaceFarm/menu";
import Modal from "@ComponentFarm/modules/Modal/Modal";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import { CheckBoxWrap } from "@ComponentFarm/atom/PlainCheckbox/style";
import { RadioBoxWrap } from "@ComponentFarm/atom/PlainRadio/style";
import { InnerTable } from "@ComponentFarm/common";
import useSelectConfigWithEnv from "HookFarm/useSelectConfigWithEnv";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { selectConfig } from "./const";
import InfiniteTable from "./InfiniteTable";
import ListFilterSelects from "../ListFilterSelects/ListFilterSelects";
import SearchKeyword from "../SearchKeyword/SearchKeyword";

interface Props {
  open?: boolean;
  type?: "radio" | "checkbox";
  onSelect?: (selectedList: IMenuListItem[]) => void;
  submitButtonText?: string;
  onClose?: () => void;
}

const MenuSearchContent = styled.div`
  width: 80rem;
  display: flex;
  flex-direction: column;

  .filter {
    border-radius: 0.6rem;
    border: 1px solid var(--color-blue_gray20);
  }

  .filter-table {
    border-collapse: collapse;
    border-spacing: 0;
    th,
    td {
      padding: 1rem 1.2rem;
    }

    td:first-of-type {
      font-weight: 500;
      padding-left: 2rem;
      background-color: #f7f9fc;
      border-right: 1px solid var(--color-blue_gray20);
    }

    tr:first-of-type {
      th,
      td {
        border-bottom: 1px solid var(--color-blue_gray20);
      }

      td:first-of-type {
        border-top-left-radius: 0.6rem;
      }
    }

    tr:last-of-type {
      td:first-of-type {
        border-bottom-left-radius: 0.6rem;
      }
    }
  }

  .selects {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0 0.8rem;
    align-items: center;

    [class*="field"] {
      flex: 1;
      width: 100%;
    }
  }

  .search {
    display: flex;
    align-items: center;

    input {
      width: 100%;
    }

    &:not(:first-of-type) {
      flex: 1;
      margin-bottom: 2.4rem;
    }

    > div {
      flex: 1;
    }
  }

  .content {
    margin-top: 1.5rem;
    border: 1px solid var(--color-neutral90);
    border-radius: 0.4rem;
    width: 100%;
    overflow: auto;

    h3 {
      display: flex;
      align-items: center;
      height: 5.5rem;
      font-weight: 600;
      font-size: 1.4rem;
      padding: 0 2rem;
      border-bottom: inherit;
    }
  }
`;

const initialParams = {
  current_num: 1,
  per_num: 20,
  search_target: "menu_name",
};

const MenuSelectModal = ({
  open,
  type = "checkbox",
  submitButtonText,
  onSelect,
  onClose,
}: Props) => {
  const [params, setParams] = useState<any>(initialParams);
  const [selectedItems, setSelectedItems] = useState<IMenuListItem[]>([]);
  const menuSelectConfigWithEnv = useSelectConfigWithEnv(selectConfig);

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["common-menu-list", params],
    ({ pageParam = 1 }) =>
      fetchCommonMenuList({
        ...params,
        current_num: pageParam,
      }),
    {
      getNextPageParam: (response, allPages) => {
        const maxPageNumber = Math.ceil(response.total_count / params.per_num);
        if (maxPageNumber < allPages.length + 1) return undefined;
        return allPages.length + 1;
      },
      enabled: !!open,
    }
  );

  const list = useMemo(
    () =>
      ([] as IMenuListItem[]).concat(
        ...(data?.pages.map((res) => res.list) ?? [])
      ),
    [data]
  );

  const updateParmas = React.useCallback(
    (updatedParams: typeof params) =>
      setParams((prevParams: typeof params) => ({
        ...prevParams,
        ...updatedParams,
      })),
    [params]
  );

  const handleClose = React.useCallback(() => {
    onClose?.();
    setSelectedItems([]);
    setParams(initialParams);
  }, [onClose]);

  const handleClickItem = React.useCallback(
    (item: IMenuListItem) => {
      // checkbox일때 여러개 선택가능, radio일때는 하나만 선택가능
      if (type === "checkbox") {
        setSelectedItems((prevItems) =>
          selectedItems.find(
            (selectedItem) => selectedItem.menu_info_idx === item.menu_info_idx
          )
            ? prevItems.filter(
                (selected) => selected.menu_info_idx !== item.menu_info_idx
              )
            : [...prevItems, item]
        );
      } else {
        setSelectedItems([item]);
      }
    },
    [type, selectedItems]
  );

  const handleLoadData = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  return (
    <Modal
      title="메뉴 선택"
      showCloseButton
      isOpen={!!open}
      onClose={handleClose}
      submitButtonText={submitButtonText}
      disabledFormSubmit={selectedItems.length === 0}
      onFormSubmit={() => {
        onSelect?.(selectedItems);
        handleClose();
      }}
      onCancel={handleClose}
    >
      <MenuSearchContent>
        <div className="filter">
          <InnerTable className="filter-table">
            <colgroup>
              <col width={getTableWidthPercentage(143, 900)} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td>필터</td>
                <td>
                  <div className="selects">
                    <ListFilterSelects
                      selectConfig={menuSelectConfigWithEnv}
                      params={params}
                      updateParams={updateParmas}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>메뉴명</td>
                <td>
                  <div className="search">
                    <SearchKeyword
                      params={params}
                      handler={({ search_keyword }) =>
                        updateParmas({ ...params, search_keyword })
                      }
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </InnerTable>
        </div>
        <section className="content">
          <h3>검색 결과</h3>
          <InfiniteTable
            loading={isFetching}
            list={list}
            render={(item) => (
              <tr
                key={item.menu_info_idx}
                onClick={() => handleClickItem(item)}
              >
                <td className="center">
                  {type === "checkbox" ? (
                    <CheckBoxWrap
                      type="checkbox"
                      checked={
                        !!selectedItems.find(
                          (selected) =>
                            selected.menu_info_idx === item.menu_info_idx
                        )
                      }
                      readOnly
                      chksize="sm"
                    />
                  ) : (
                    <RadioBoxWrap
                      type="radio"
                      checked={
                        !!selectedItems.find(
                          (selected) =>
                            selected.menu_info_idx === item.menu_info_idx
                        )
                      }
                      readOnly
                      chksize="sm"
                    />
                  )}
                </td>
                <td>{item.evv_menu_group}</td>
                <td>{item.evv_menu_type}</td>
                <td>{item.evv_menu_classification}</td>
                <td>{item.menu_category_name}</td>
                <td>
                  <Badge
                    dot
                    fill="transparent"
                    color={item.evv_menu_status === "중단" ? "red" : undefined}
                  >
                    {item.evv_menu_status}
                  </Badge>
                </td>
                <td>{item.menu_name}</td>
              </tr>
            )}
            onBottomScroll={handleLoadData}
          />
        </section>
      </MenuSearchContent>
    </Modal>
  );
};

export default MenuSelectModal;
