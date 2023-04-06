import React from "react";
import dayjs from "dayjs";
import { PersonCircle } from "@emotion-icons/bootstrap/PersonCircle";
import { Calendar } from "@emotion-icons/bootstrap/Calendar";

import style from "StyleFarm/scss/modules/ProductRecipe.module.scss";

import { IProduceRecipeListItem } from "InterfaceFarm/ProductRecipe";

import Image from "ComponentsFarm/elements/Image";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import { ListLoading } from "ComponentsFarm/elements/Loading";

import { BoardViewLabel } from "ComponentsFarm/module/Board";

interface ProductRecipeListProps {
  items: IProduceRecipeListItem[];
  loading?: boolean;
  onClick: (item: IProduceRecipeListItem) => void;
}

const ProductRecipeList: React.FC<ProductRecipeListProps> = ({ items, loading, onClick }) => {
  const empty = items.length === 0 && !loading;

  return (
    <ul className={style["product-recipe__list"]}>
      {empty && <EmptyView>{"데이터 조회결과가 존재하지 않습니다."}</EmptyView>}
      {!empty &&
        items.map((item) => {
          return (
            <li key={item.sbr_idx} tabIndex={0} onClick={() => onClick(item)} className={style["product-recipe-item"]}>
              <div className={style["product-recipe-item__thumbnail"]}>
                <Image quality={100} loading="lazy" src={item.thumbnail} alt={item.title} layout="fill" />
              </div>
              {/* ============================================== */}
              <div className={style["product-recipe-item__info"]}>
                {item.type_category !== 0 && (
                  <span
                    className={`${style["product-recipe-item__tag"]} ${
                      style[`product-recipe-item__tag--category-${item.type_category}`]
                    }`}
                  >
                    {item.type_category === 1
                      ? "신제품"
                      : item.type_category === 2
                      ? "개선"
                      : item.type_category === 3
                      ? "콜라보"
                      : ""}
                  </span>
                )}

                <div>
                  <h3 className={style["product-recipe-item__title"]}>{item.title}</h3>
                  <div className={style["product-recipe-item__meta"]}>
                    <BoardViewLabel icon={<PersonCircle />}>관리자</BoardViewLabel>
                    <BoardViewLabel icon={<Calendar />}>{dayjs(item.created_at).format("YYYY-MM-DD")}</BoardViewLabel>
                  </div>
                </div>
              </div>
            </li>
          );
        })}

      {loading && (
        <li className="mt-3">
          <ListLoading />
        </li>
      )}
    </ul>
  );
};

export default ProductRecipeList;
