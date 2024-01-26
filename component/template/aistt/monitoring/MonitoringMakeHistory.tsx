import React, { useEffect } from "react";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { IFqsMonitoringMakeHistory } from "InterfaceFarm/ai-fqs";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";

const MakeHistoryStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.6rem 1.2rem;
  gap: 0.6rem;
  border-top: 1px solid var(--color-neutral90);
  cursor: pointer;

  &:first-of-type {
    border-top: 0;
  }

  &.active {
    background-color: var(--color-blue85);
  }

  .go-analysis {
    color: var(--color-blue50);
    border: 1px solid currentColor;
    background-color: var(--color-gray1);
    border-radius: 0.4rem;
    padding: 0.2rem 0.4rem;
    cursor: pointer;
  }

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .middle {
    display: flex;
    flex-direction: row;
    gap: 0.6rem;
    align-items: center;
    .badge {
      flex: none;
    }
  }

  .bottom {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.3rem;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0 -0.6rem;
  }

  .product-name {
    font-weight: 500;
  }
`;

const ScoreBadge = (score: number) => {
  if (score >= 80 && score <= 100) {
    return (
      <Badge size="sm" color="blue">
        {score}점
      </Badge>
    );
  }
  if (score >= 50 && score < 80) {
    return (
      <Badge size="sm" color="yellow">
        {score}점
      </Badge>
    );
  }
  return (
    <Badge size="sm" color="red">
      {score}점
    </Badge>
  );
};

interface IMonitoringMakeHistoryProps {
  data: IFqsMonitoringMakeHistory;
  active?: boolean;
  onClickAnalysis?: (data: IFqsMonitoringMakeHistory) => void;
  onClickItem?: (data: IFqsMonitoringMakeHistory) => void;
}

const MonitoringMakeHistory = ({
  active,
  data,
  onClickItem,
  onClickAnalysis,
}: IMonitoringMakeHistoryProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      active &&
      ref.current &&
      !ref.current?.previousElementSibling?.classList.contains("active")
    ) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [active]);

  return (
    <MakeHistoryStyle
      ref={ref}
      className={active ? "active" : ""}
      onClick={() => onClickItem?.(data)}
    >
      <div className="top">
        <span className="making-time">
          {dayjs(data.manufacture_dt).format("HH:mm:ss")}
        </span>
        <button
          type="button"
          className="go-analysis"
          onClick={(e) => {
            e.stopPropagation();
            onClickAnalysis?.(data);
          }}
        >
          분석결과 보기
        </button>
      </div>
      <div className="middle">
        {ScoreBadge(Math.round(data.converted_score))}
        <span className="product-name">{data.product_info_name}</span>
      </div>
      <div className="bottom">
        <Badge size="sm" color="gray">
          제조시간:{" "}
          {dayjs("1970-01-01 00:00:00")
            .add(data.manufacture_since_time ?? 0, "seconds")
            .format("mm:ss")}
          초
        </Badge>
        {!!data.average_count && (
          <Badge size="sm" color="yellow">
            미흡 {data.average_count}건
          </Badge>
        )}
        {!!data.poor_count && (
          <Badge size="sm" color="red">
            심각 {data.poor_count}건
          </Badge>
        )}
      </div>
    </MakeHistoryStyle>
  );
};

export default MonitoringMakeHistory;
