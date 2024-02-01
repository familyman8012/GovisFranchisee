import React from "react";
import Skeleton from "react-loading-skeleton";
import { MonitoringListStyle } from "./style";

export const MonitoringViewLoading = () => {
  return (
    <MonitoringListStyle>
      <div className="wrap">
        <div className="side">
          <h2 className="title">
            <Skeleton width="15rem" height="2rem" />
          </h2>
          <Skeleton height="40rem" style={{ marginBottom: "3rem" }} />
        </div>
        <div className="view">
          <Skeleton
            width="15rem"
            height="2rem"
            style={{ marginBottom: "3rem" }}
          />
          <Skeleton height="40rem" />
        </div>
      </div>
    </MonitoringListStyle>
  );
};
