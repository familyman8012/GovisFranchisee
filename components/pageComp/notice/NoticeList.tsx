import React from "react";
import style from "StyleFarm/scss/modules/Notice.module.scss";
import { toClasses } from "LibFarm/toClasses";
import { INoticeBoardListRow } from "InterfaceFarm/Notice";

import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import { ListLoading } from "ComponentsFarm/elements/Loading";

interface NoticeBoardListItemProps extends INoticeBoardListRow {
  onClick?: () => void;
}

const NoticeBoardListItem = (props: NoticeBoardListItemProps) => (
  <li tabIndex={0} className={style["notice-list__item"]} onClick={() => props.onClick && props.onClick()}>
    <span
      className={toClasses([style["notice-list__title"], props.is_read > 0 ? "" : style["notice-list__title--unread"]])}
    >
      {props.title}
    </span>
    <span>{props.created_at.substr(0, 10)}</span>
  </li>
);

interface NoticeBoardListProps {
  className?: string;
  searched?: boolean;
  loading?: boolean;
  notices: INoticeBoardListRow[];
  onClick: (row: INoticeBoardListRow) => void;
}

const NoticeBoardList: React.FC<NoticeBoardListProps> = ({ className, loading, notices, onClick, searched }) => {
  const empty = notices.length === 0 && !loading;

  return (
    <ul className={toClasses([style["notice-list"], className])}>
      {empty ? (
        <EmptyView>
          {searched ? "검색 조회결과가 존재하지 않습니다." : "데이터 조회결과가 존재하지 않습니다."}
        </EmptyView>
      ) : (
        notices.map((row) => <NoticeBoardListItem {...row} key={row.sbn_idx} onClick={() => onClick && onClick(row)} />)
      )}

      {loading && (
        <li className="mt-3">
          <ListLoading />
        </li>
      )}
    </ul>
  );
};

export default NoticeBoardList;
