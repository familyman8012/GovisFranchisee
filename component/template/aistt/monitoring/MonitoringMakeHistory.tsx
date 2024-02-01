import React, { useEffect } from "react";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { IFqsMonitoringMakeHistory } from "InterfaceFarm/ai-fqs";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import { Button } from "@ComponentFarm/atom/Button/Button";

const MakeHistoryStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 1.2rem;
  gap: 0.6rem;
  background-color: var(--color-gray1);
  border-radius: 0.8rem;
  border: 1px solid var(--color-neutral90);
  cursor: pointer;
  box-sizing: border-box;

  & + & {
    margin-top: 1.6rem;
  }

  &.active {
    background-color: var(--color-orange95);
    border-color: var(--color-orange60);

    .history-info li:nth-of-type(2) {
      background: transparent;
    }
  }

  .go-analysis {
    display: inline-flex;
    color: var(--color-orange60);
    border: 1px solid currentColor;
    background-color: var(--color-gray1);
    border-radius: 0.4rem;
    padding: 0.2rem 0.4rem;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: var(--color-gray1) !important;
    }
  }

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .left {
      display: inline-flex;
      flex-direction: column;
      gap: 0.6rem;
    }
  }

  .bottom {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.3rem;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0 -1.2rem -1.2rem;
  }

  .product-name {
    font-weight: 600;
  }

  .score b {
    font-weight: 600;
    font-size: 1.6rem;
  }

  .score {
    font-size: 1.4rem;
  }

  .history-info {
    width: 100%;
    display: flex;
    flex-direction: row;
    border-top-width: 1px;
    border-top-style: solid;
    border-color: var(--color-neutral90);
  }

  .history-info li {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.8rem 0;
    color: var(--color-gray9);
  }

  .history-info li:nth-of-type(2) {
    background: var(--color-blue_gray10);
  }

  .history-info li .value {
    color: var(--color-neutral70);
  }

  .history-info li + li {
    border-left-width: 1px;
    border-left-style: solid;
    border-color: inherit;
  }
`;

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
        <div className="left">
          <span className="making-time">
            <Badge size="sm" color="gray">
              {dayjs(data.manufacture_dt).format("HH:mm:ss")}
            </Badge>
          </span>
          <span className="product-name">{data.product_info_name}</span>
          <span className="score">
            <b>{Math.round(data.converted_score)}</b> / 100 점
          </span>
        </div>

        <Button
          className="go-analysis"
          variant="gostPrimary"
          onClick={(e) => {
            e?.stopPropagation();
            onClickAnalysis?.(data);
          }}
        >
          분석결과 보기
        </Button>
      </div>
      <div className="middle"></div>
      <div className="bottom">
        <ul className="history-info">
          <li>
            <span className="name">제조시간</span>
            <span className="value">
              {dayjs("1970-01-01 00:00:00")
                .add(data.manufacture_since_time ?? 0, "seconds")
                .format("mm:ss")}
            </span>
          </li>
          <li>
            <span className="name">심각</span>
            <span className="value">{data.poor_count ?? 0}건</span>
          </li>
          <li>
            <span className="name">미흡</span>
            <span className="value">{data.average_count ?? 0}건</span>
          </li>
        </ul>
      </div>
    </MakeHistoryStyle>
  );
};

export default MonitoringMakeHistory;
