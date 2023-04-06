import React from "react";

import style from "StyleFarm/scss/modules/Board.module.scss";

import { toClasses } from "LibFarm/toClasses";

interface BoardExploreItemProps {
  label: string;
  id: number;
  title: string;
  empty?: boolean;
  onClick: (id: number) => void;
}

interface BoardViewLabelProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const BoardExplore: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className={style["board-explore"]}>{children}</ul>
);

export const BoardExploreItem = ({ title, id, label, onClick }: BoardExploreItemProps) => {
  const empty = !title;
  return (
    <li
      tabIndex={empty ? -1 : 0}
      className={toClasses([style["board-explore__item"], empty ? style["board-explore__item--empty"] : ""])}
      onClick={() => {
        !empty && onClick(id || 0);
      }}
    >
      <span>{label}</span>
      <span>{empty ? `${label} 게시글이 없습니다.` : title}</span>
    </li>
  );
};

export const BoardViewLabel = ({ icon, children }: BoardViewLabelProps) => {
  return (
    <span className={style["board-view-label"]}>
      {icon}
      {children}
    </span>
  );
};
