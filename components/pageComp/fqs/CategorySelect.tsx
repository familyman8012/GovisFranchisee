import React, { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHead,
  ModalHeader,
} from "ComponentsFarm/elements/Modal";
import { BackButton, Button } from "ComponentsFarm/elements/Button";
import { fetchFQSCategories } from "ApiFarm/fqs";
import { FormCheckbox } from "ComponentsFarm/elements/Checkbox";

import { FqsCategorySelectStyle } from "./styles";
import styled from "@emotion/styled";
import { Common } from "StyleFarm/common";

interface Props {
  onSelect: (categoryIds: number[]) => void;
}

const CategoryFullModal = styled(Modal)`
  button {
    box-shadow: 0;
  }

  button svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .category-footer {
    flex: none;

    display: flex;
    button {
      flex: 1;
      width: 100%;
      border-radius: 0 !important;
      box-shadow: 0;
      &:first-of-type {
        flex: none;
        width: 100px;
      }
    }
  }

  .category-body {
    padding: 0;
    max-height: 300px;
    overflow: auto;

    .gv-checkbox {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0;
      border-left: 0;
      border-top: 0;
      border-color: ${Common.color.$typo5};
      margin-left: 0;
      box-shadow: none;
      flex-direction: row-reverse;
      justify-content: space-between;
    }

    .gv-checkbox__label {
      margin-left: 0;
    }

    .gv-checkbox--checked {
      color: ${Common.color.$primary3};
    }
  }
`;

const CategorySelect = ({ onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [checkedCategoryIds, setCheckedCategoryIds] = useState<number[]>([]);
  const [selectedPizzaList, setSelectedPizzaList] = useState<any[]>([]);

  const { data } = useQuery(
    ["category-list"],
    () => fetchFQSCategories({ category_group_idx: 2 }),
    {
      enabled: open,
    }
  );

  // const selectedPizzaList = useMemo(
  //   () =>
  //     data?.list.filter((pizza) =>
  //       checkedCategoryIds.includes(pizza.category_idx)
  //     ),
  //   [checkedCategoryIds]
  // );

  const checkItem = useCallback(
    (id: number) => {
      const newCheckedCategoryIds = checkedCategoryIds.includes(id)
        ? checkedCategoryIds.filter((categoryId) => categoryId !== id)
        : [...checkedCategoryIds, id];
      setCheckedCategoryIds(newCheckedCategoryIds);
    },
    [checkedCategoryIds]
  );

  const handleChangeFilter = useCallback(() => {
    const selectedPizzaList = data?.list.filter((pizza) =>
      checkedCategoryIds.includes(pizza.category_idx)
    );

    setSelectedPizzaList(selectedPizzaList ?? []);
    onSelect(checkedCategoryIds);
    setOpen(false);
  }, [checkedCategoryIds, data, onSelect]);

  const handleReset = useCallback(() => {
    setSelectedPizzaList([]);
    setCheckedCategoryIds([]);
    onSelect([]);
    setOpen(false);
  }, [onSelect]);

  return (
    <FqsCategorySelectStyle>
      <Button
        clear
        size="sm"
        className={"filter-button"}
        onClick={() => setOpen(true)}
      >
        {selectedPizzaList && selectedPizzaList.length > 0
          ? selectedPizzaList.length === 1
            ? selectedPizzaList[0].category_name
            : `${selectedPizzaList[0].category_name} 외 ${
                selectedPizzaList.length - 1
              }건`
          : "피자 전체"}
      </Button>
      <CategoryFullModal
        className="gv-modal"
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalHeader closeButton={() => setOpen(false)}>
          <h3 className="m-0">피자 선택</h3>
        </ModalHeader>
        <ModalBody className="category-body">
          {data?.list.map((category) => (
            <FormCheckbox
              key={category.category_idx}
              label={category.category_name}
              checked={checkedCategoryIds.includes(category.category_idx)}
              onChange={() => checkItem(category.category_idx)}
            />
          ))}
        </ModalBody>
        <ModalFooter className="category-footer">
          <Button onClick={handleReset} color="typo-5" textColor="black">
            초기화
          </Button>
          <Button
            color="primary-3"
            disabled={checkedCategoryIds.length === 0}
            onClick={handleChangeFilter}
          >
            선택 적용
          </Button>
        </ModalFooter>
      </CategoryFullModal>
    </FqsCategorySelectStyle>
  );
};

export default CategorySelect;
