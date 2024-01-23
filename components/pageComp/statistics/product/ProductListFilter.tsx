import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Filter } from "@emotion-icons/bootstrap/Filter";
import { XCircleFill } from "@emotion-icons/bootstrap/XCircleFill";

import { IProductFilter } from "InterfaceFarm/Product";
import { PALLETES } from "LibFarm/color";

import { PRODUCT_CATEGORIES } from "./constants";

import { Modal, ModalFooter } from "ComponentsFarm/elements/Modal";
import { Button } from "ComponentsFarm/elements/Button";

import { ProductFilterForm, ProductListFilterContainer } from "./styles";
import { Checkbox } from "./Checkbox";
import { convertEnv } from "LibFarm/convertEnvironment";

interface ProductListFilter {
  onSubmit: (params: IProductFilter) => void;
}

const ProductListFilter = ({ onSubmit }: ProductListFilter) => {
  const env = convertEnv("product_category");
  const { reset, register, watch, setValue, handleSubmit } =
    useForm<IProductFilter>({
      defaultValues: {},
    });
  const [showFilter, setShowFilter] = useState(false);
  const [filterCount, setFilterCount] = useState<number>(0);

  // const categories = useMemo(
  //   () =>
  //     Object.entries(PRODUCT_CATEGORIES).map(([key, val]) => ({
  //       value: key,
  //       ...val,
  //     })),
  //   []
  // );

  const categories = useMemo(
    () =>
      env.map((el: any) => {
        return { label: el.label, value: String(el.value) };
      }),
    []
  );

  const selectedCategories = useMemo(
    () =>
      watch("search_product_category")
        ?.split(",")
        .filter((v) => !!v) ?? [],
    [watch("search_product_category")]
  );

  const handleToggleCheck = useCallback(
    (val: any) => {
      if (selectedCategories.includes(val)) {
        setValue(
          "search_product_category",
          selectedCategories.filter((v) => val !== v).join(",")
        );
      } else {
        setValue(
          "search_product_category",
          [...selectedCategories, val].join(",")
        );
      }
    },
    [selectedCategories]
  );

  const handleRequestSubmit = useCallback(
    (data: IProductFilter) => {
      setShowFilter(false);
      setFilterCount(Object.entries(data).filter(([_, val]) => !!val).length);
      onSubmit(data);
    },
    [onSubmit]
  );

  const handleRequestReset = useCallback(() => {
    reset();
    setShowFilter(false);
    setFilterCount(0);
    onSubmit({
      search_product_category: "",
      search_product_name: "",
    });
  }, [onSubmit]);

  return (
    <ProductListFilterContainer onSubmit={handleSubmit(handleRequestSubmit)}>
      <h3 className="title">제품별 주문 현황</h3>
      <div className="right-area">
        {filterCount > 0 && (
          <Button
            color={PALLETES["error-1"]}
            rightIcon={<XCircleFill />}
            size="sm"
            clear
            onClick={handleRequestReset}
          >
            필터 조건 초기화
          </Button>
        )}
        <Button
          color={PALLETES["black"]}
          leftIcon={<Filter />}
          size="sm"
          clear
          onClick={() => setShowFilter(true)}
        >
          필터
        </Button>
      </div>

      <Modal
        open={showFilter}
        className="gv-modal"
        onClose={() => setShowFilter(false)}
      >
        <ModalFooter>
          <ProductFilterForm>
            <div className="product-filter-item">
              <label htmlFor="product-search" className="product-filter-label">
                제품명
              </label>
              <input
                {...register("search_product_name")}
                type="text"
                className="product-filter-input"
              />
            </div>
            <div className="product-filter-item">
              <label htmlFor="product-search" className="product-filter-label">
                분류
              </label>
              <ul className="product-filter-select">
                {categories.map((cat, i) => (
                  <li key={i}>
                    <Checkbox
                      value={cat.value}
                      label={cat.label}
                      checked={selectedCategories.includes(cat.value)}
                      onChange={handleToggleCheck}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="product-filter-bottom">
              <Button
                type="button"
                color={PALLETES["disable"]}
                textColor={PALLETES["black"]}
                block
                onClick={handleRequestReset}
              >
                초기화
              </Button>
              <Button color={PALLETES["primary-3"]} block>
                적용
              </Button>
            </div>
          </ProductFilterForm>
        </ModalFooter>
      </Modal>
    </ProductListFilterContainer>
  );
};

export default ProductListFilter;
