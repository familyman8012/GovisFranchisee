import React from "react";

import dayjs from "dayjs";
import { PersonCircle } from "@emotion-icons/bootstrap/PersonCircle";
import { Calendar } from "@emotion-icons/bootstrap/Calendar";

import style from "StyleFarm/scss/modules/NewsLetter.module.scss";

import { INewsListItem } from "InterfaceFarm/NewsLetter";
import Image from "ComponentsFarm/elements/Image";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import { ListLoading } from "ComponentsFarm/elements/Loading";
import { BoardViewLabel } from "ComponentsFarm/module/Board";

interface NewsLetterListProps {
  items: INewsListItem[];
  loading?: boolean;
  onClick: (item: INewsListItem) => void;
}

const NewsLetterList: React.FC<NewsLetterListProps> = ({ items, loading, onClick }) => {
  const empty = items.length === 0 && !loading;

  return (
    <ul className={style["news__list"]}>
      {empty && <EmptyView>{"데이터 조회결과가 존재하지 않습니다."}</EmptyView>}
      {!empty &&
        items.map((item) => {
          return (
            <li key={item.sbnl_idx} tabIndex={0} onClick={() => onClick(item)} className={style["news-item"]}>
              <div className={style["news-item__thumbnail"]}>
                <Image quality={100} loading="lazy" src={item.thumbnail} alt={item.title} layout="fill" />
              </div>
              <div className={style["news-item__info"]}>
                <div>
                  <h3 className={style["news-item__title"]}>{item.title}</h3>
                  <div className={style["news-item__meta"]}>
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

export default NewsLetterList;
