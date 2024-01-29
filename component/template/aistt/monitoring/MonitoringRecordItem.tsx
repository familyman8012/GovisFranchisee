import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import Up from "@ComponentFarm/atom/icons/Up";
import styled from "@emotion/styled";

const MonitoringRecordItemStyle = styled.div`
  .header {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 1rem 0 1.6rem;
    border-radius: 0.4rem;
    border: 1px solid var(--color-grayborder);
    background-color: var(--color-gray2);
    margin-bottom: 1.2rem;
    height: 4.5rem;

    .title {
      flex: 1;
      display: inline-flex;
      font-size: 1.6rem;
      line-height: 1.1;
      width: 100%;
      font-weight: 600;
      color: var(--color-neutral50);
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
    color: var(--color-neutral10);

    &.expanded {
      transform: rotate(180deg);
    }
  }

  &.option + .option {
    margin-top: 0.4rem;
  }

  &.option .header {
    margin: 0;
    padding: 0 0.8rem;
    border-radius: 0.4rem;
    cursor: pointer;
    width: 100%;
    background: transparent;
  }

  &.active .header {
    background-color: var(--color-gray4);
  }

  &.invalid .header {
    border-color: var(--color-red50);
  }

  > .content button {
    margin-left: 3.2rem;
    width: calc(100% - 3.2rem);
    justify-content: flex-start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > .content button + button {
    margin-top: 1.2rem;
  }

  .content {
    overflow: hidden;
    box-sizing: border-box;
  }
`;

interface MonitoringRecordItemProps {
  recordDate: string;
  active?: boolean;
  itemLoading?: boolean;
  onClickItem: (date: string) => void;
}

const MonitoringRecordItem = ({
  recordDate,
  active,
  itemLoading,
  onClickItem,
  children,
}: React.PropsWithChildren<MonitoringRecordItemProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && !itemLoading) {
      const { current } = ref;
      current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }, [active, itemLoading]);
  return (
    <MonitoringRecordItemStyle
      ref={ref}
      className={`option ${active ? "active" : ""}`}
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

export default MonitoringRecordItem;
