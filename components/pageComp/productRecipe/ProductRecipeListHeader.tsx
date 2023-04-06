import React, { useCallback, useState } from "react";

import style from "StyleFarm/scss/modules/ProductRecipe.module.scss";

import { HeaderRadio } from "ComponentsFarm/pageComp/newsLetter/Checkbox";

const selectOptions = [
  { label: "피자", value: 0 },
  { label: "파스타", value: 1 },
  { label: "샐러드", value: 2 },
  { label: "떡볶이", value: 3 },
  { label: "메뉴얼", value: 10 },
];

interface ProductRecipeListHeaderProps {
  initialProduct: number;
  onChangeProduct: (search_product_category: number) => void;
}

const ProductRecipeListHeader: React.FC<ProductRecipeListHeaderProps> = ({ initialProduct, onChangeProduct }) => {
  const handleChange = useCallback((value: any) => onChangeProduct(value), []);
  return (
    <div className={`${style["product-recipe__header"]} container`}>
      {selectOptions.map((opt) => {
        return (
          <HeaderRadio
            key={opt.value}
            name="product-category"
            className="gv-checkbox--recipe"
            label={opt.label}
            checked={initialProduct === opt.value}
            value={opt.value}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
};

export default ProductRecipeListHeader;
