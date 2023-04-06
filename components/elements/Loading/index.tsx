import { toClasses } from "LibFarm/toClasses";
import React from "react";
import style from "StyleFarm/scss/modules/Spinner.module.scss";

interface LoadingProps {
  full?: boolean;
}

export const ListLoading: React.FC<LoadingProps> = ({ full }) => (
  <div className={toClasses(["gv-loading", full ? "gv-loading--full" : ""])}>
    <div className={style["dot-spinner"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export const ThumbnailLoading: React.FC<LoadingProps> = ({ full }) => (
  <div className={toClasses(["gv-loading", "gv-loading--thumb", full ? "gv-loading--full" : ""])}>
    <div className={style["dot-spinner"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export const CalendarLoading: React.FC<LoadingProps> = ({ full }) => (
  <div className={toClasses(["gv-loading", "gv-loading--calendar", full ? "gv-loading--full" : ""])}>
    <div className={style["dot-spinner"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
