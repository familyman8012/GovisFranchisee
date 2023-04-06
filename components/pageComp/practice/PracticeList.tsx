import React from "react";
import dayjs from "dayjs";
import { PersonCircle } from "@emotion-icons/bootstrap/PersonCircle";
import { Calendar } from "@emotion-icons/bootstrap/Calendar";

import style from "StyleFarm/scss/modules/Practice.module.scss";

import { IPracticeListItem } from "InterfaceFarm/Practice";

import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import { BoardViewLabel } from "ComponentsFarm/module/Board";
import Image from "ComponentsFarm/elements/Image";
import { ListLoading } from "ComponentsFarm/elements/Loading";

interface ProductRecipeListProps {
  items: IPracticeListItem[];
  loading?: boolean;
  onClick: (item: IPracticeListItem) => void;
}

const ProductRecipeList: React.FC<ProductRecipeListProps> = ({ items, loading, onClick }) => {
  const empty = items.length === 0 && !loading;

  return (
    <ul className={style["practice-board__list"]}>
      {empty && <EmptyView>{"데이터 조회결과가 존재하지 않습니다."}</EmptyView>}
      {!empty &&
        items.map((item) => {
          return (
            <li key={item.sbs_idx} tabIndex={0} onClick={() => onClick(item)} className={style["practice-board-item"]}>
              <div className={style["practice-board-item__thumbnail"]}>
                <Image src={item.thumbnail} alt={item.title} layout="fill" loading="lazy" />
              </div>
              <div className={style["practice-board-item__info"]}>
                <div>
                  <h3 className={style["practice-board-item__title"]}>{item.title}</h3>
                  <div className={style["practice-board-item__meta"]}>
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
