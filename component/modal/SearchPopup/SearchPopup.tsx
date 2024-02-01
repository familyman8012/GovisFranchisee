import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { css } from "@emotion/react";
import CheckBoxGroup from "@ComponentFarm/modules/CheckBoxGroup/CheckBoxGroup";
import Modal from "@ComponentFarm/modules/Modal/Modal";
import RadioGroup from "@ComponentFarm/modules/RadioGroup/RadioGroup";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import CheckBox from "@ComponentFarm/atom/Checkbox/CheckBox";
import Radio from "@ComponentFarm/atom/Radio/Radio";
import { IOption, Select } from "@ComponentFarm/atom/Select/Select";
import { Table, TableWrap, mq } from "@ComponentFarm/common";
import SearchKeyword from "@ComponentFarm/template/common/FilterTable/SearchKeyword";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { SelectConfig } from "@UtilFarm/convertEnvironment";
import { SearchBox, SearchResult } from "../searchPopup_style";

type ColumnNameType = {
  th: string[];
  col: number[];
};

type selectOptionsType = {
  [key: string]: string | null;
};

export type checkedItemType = {
  idx: string;
  name: string;
};

export interface ICommonResultData {
  idx: number;
  label: string;
}

interface SearchPopupProps<T extends ICommonResultData> {
  width?: string;
  title: string;
  keyWordSearchTitle: string;
  selectConfig?: SelectConfig[];
  tableCofig: ColumnNameType;
  resultData: T[];
  type?: string;
  disabled?: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  filters: selectOptionsType;
  setFilters: Dispatch<SetStateAction<selectOptionsType>>;
  initialValues: string[];
  selectItems: checkedItemType[];
  setSelectItems: Dispatch<SetStateAction<checkedItemType[]>>;
  badge: string[];
  defaultKeyword?: {
    search_target: string;
    search_keyword: string;
  };
}

const SearchPopup = <T extends ICommonResultData>({
  width = "68.3rem",
  title,
  keyWordSearchTitle,
  selectConfig,
  tableCofig,
  resultData,
  type,
  disabled = false,
  isOpen,
  setIsOpen,
  filters,
  setFilters,
  initialValues,
  selectItems,
  setSelectItems,
  badge,
  defaultKeyword = {
    search_target: "",
    search_keyword: "",
  },
}: SearchPopupProps<T>) => {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const onFormSubmit = () => {
    const selectedProducts = resultData
      .filter((item: T) => checkedItems.includes(String(item.idx)))
      .map((item: T) => ({ idx: String(item.idx), name: item.label || "" }));

    const filterSelectItems = selectItems?.filter((item) =>
      checkedItems.includes(item.idx)
    );

    const combineItems = [...filterSelectItems, ...selectedProducts].reduce(
      (accumulator: checkedItemType[], currentItem) => {
        if (!accumulator.some((item) => item.idx === currentItem.idx)) {
          accumulator.push(currentItem);
        }
        return accumulator;
      },
      []
    );

    setSelectItems(combineItems);
    setFilters({ search_target: filters.search_target });
    setKeyword({
      search_target: "",
      search_keyword: "",
    });
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handlerClose = () => {
    setFilters({ search_target: filters.search_target });
    setKeyword({
      search_target: "",
      search_keyword: "",
    });
    setIsOpen(false);
  };

  // filter
  const handleFilterChange = (
    field: string,
    value: IOption | string | null
  ) => {
    setFilters((prev) => ({
      ...prev,
      search_keyword: keyword.search_keyword,
      [field]:
        typeof value === "string" ? value : value ? String(value.value) : null,
    }));
  };

  const [reorderedArray, setReorderedArray] = useState<T[]>([]);

  useEffect(() => {
    const selectIdxs = new Set(selectItems.map((item) => item.idx));
    const selectedItems: T[] = [];
    const remainingItems: T[] = [];

    resultData.forEach((item: T) => {
      if (selectIdxs.has(String(item.idx))) {
        selectedItems.push(item);
      } else {
        remainingItems.push(item);
      }
    });

    setReorderedArray([...selectedItems.reverse(), ...remainingItems]);
  }, [selectItems, resultData]);

  const renderTable = () => {
    return (
      <Table className="basic">
        <thead>
          <tr>
            <th colSpan={tableCofig.col.length}>검색 결과</th>
          </tr>
          <tr>
            <th>
              {type !== "radio" && (
                <CheckBox value="allChkHandler" label="All" />
              )}
            </th>
            {tableCofig.th.map((el, i) => (
              <React.Fragment key={i}>
                <th>{el}</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {reorderedArray?.map((el: T) => (
            <tr key={el.idx}>
              <td>
                {type === "radio" ? (
                  <Radio value={el.idx} label={el.label} />
                ) : (
                  <CheckBox value={String(el.idx)} label={el.label} />
                )}
              </td>
              {Object.entries(el).map(
                ([key, value], index) =>
                  key !== "idx" && (
                    <td key={index}>
                      {key === "status" ? (
                        <Badge
                          color={
                            value === badge[0]
                              ? "green"
                              : value === badge[badge.length - 1]
                              ? "red"
                              : "yellow"
                          }
                          size="sm"
                          dot
                        >
                          {String(value)}
                        </Badge>
                      ) : key === "category" ? (
                        <label htmlFor={String(el.idx)}>{String(value)}</label>
                      ) : (
                        String(value)
                      )}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const modalType = () => {
    const commonProps = {
      name: "chkSelectItem",
      disabled,
    };

    const allOptions = resultData?.map((item: T) => ({
      value: String(item.idx),
      label: item.label,
    }));

    if (type === "radio") {
      return (
        <RadioGroup
          {...commonProps}
          defaultValue={String(...initialValues)}
          onChange={(data: string) => setCheckedItems([data])}
        >
          <>{renderTable()}</>
        </RadioGroup>
      );
    }

    return (
      <CheckBoxGroup
        {...commonProps}
        initialCheckedValues={initialValues}
        allChechkHandler={allOptions}
        onChange={setCheckedItems}
      >
        <>{renderTable()}</>
      </CheckBoxGroup>
    );
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={handlerClose}
      onCancel={handlerClose}
      showCloseButton
      addStyles={css`
        max-width: unset;
        overflow-y: unset;
        border-radius: 0;
        ${mq[0]} {
          h2 {
            display: none !important;
          }
        }
      `}
      onFormSubmit={onFormSubmit}
    >
      <SearchBox width={width}>
        <fieldset>
          <legend>{title} 검색</legend>
          <table>
            <tbody>
              <tr>
                <th scope="row">필터</th>
                <td>
                  <div className="wrap_input">
                    {selectConfig?.map((el) => (
                      <Select
                        key={el.field}
                        options={el.options}
                        selectedOption={filters[el.field]}
                        setSelectedOption={(option) =>
                          handleFilterChange(el.field, option)
                        }
                        prefixLabel={el.label}
                        placeholder="전체"
                      />
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">{keyWordSearchTitle}</th>
                <td>
                  <SearchKeyword
                    keyword={keyword}
                    setKeyword={setKeyword}
                    handler={(keywordConfig) => {
                      handleFilterChange(
                        "search_keyword",
                        keywordConfig.search_keyword
                      );
                    }}
                    placeholder="검색어를 입력해 주세요"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </SearchBox>
      <SearchResult width={width} col={tableCofig.col}>
        <TableWrap>{modalType()}</TableWrap>
      </SearchResult>
    </Modal>
  );
};

export default SearchPopup;
