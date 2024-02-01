import { useRef } from "react";
import dayjs from "dayjs";
import Up from "@ComponentFarm/atom/icons/Up";
import styled from "@emotion/styled";
import { breakpoints, mediaMaxWidth } from "@ComponentFarm/common";

const MonitoringRecordItemStyle = styled.div`
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 1.6rem;
    margin: 0 0 0.8rem;
    color: var(--color-gray10);
    background-color: var(--bage-grayBg);
    border-radius: 0.4rem;
    cursor: pointer;

    .title {
      flex: 1;
      display: inline-flex;
      font-size: 1.6rem;
      line-height: 1.1;
      width: 100%;
      font-weight: 600;
      padding: 1.2rem 0;

      &:empty {
        height: calc(1.6rem * 1.1);
        box-sizing: content-box;
      }
    }
  }

  .icon-btn {
    display: inline-flex;
    width: 1.6rem;
    height: 1.6rem;
    align-items: center;
    justify-content: center;
    background: transparent;
    margin-left: 0.8rem;
    cursor: pointer;
    color: currentColor;

    &.expanded {
      transform: rotate(180deg);
    }

    svg path {
      fill: currentColor !important;
    }
  }

  &.active .header {
    background-color: #fff1ea;
    color: var(--color-orange60);
  }

  ${mediaMaxWidth(breakpoints[2])} {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;
  }
`;

interface MonitoringRecordItemProps {
  recordDate: string;
  active?: boolean;
  onClickItem: (date: string) => void;
}

const MonitoringDayRecord = ({
  recordDate,
  active,
  onClickItem,
  children,
}: React.PropsWithChildren<MonitoringRecordItemProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <MonitoringRecordItemStyle
      ref={ref}
      className={`${active ? "active" : ""}`}
    >
      <div
        role="button"
        tabIndex={0}
        className="header"
        onClick={() => onClickItem(recordDate)}
        onKeyDown={(e) => e.key === "Enter" && onClickItem(recordDate)}
      >
        <span className="title">
          {dayjs(recordDate).format("YY년 MM월 DD일")}
        </span>
        <button
          type="button"
          className={`icon-btn ${active ? "expanded" : ""}`}
        >
          <Up />
        </button>
      </div>
      {active && children}
    </MonitoringRecordItemStyle>
  );
};

export default MonitoringDayRecord;
