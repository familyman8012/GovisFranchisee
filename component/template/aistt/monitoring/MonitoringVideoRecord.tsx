import TablerPoint from "@ComponentFarm/atom/icons/TablerPoint";
import { breakpoints, mediaMaxWidth } from "@ComponentFarm/common";
import styled from "@emotion/styled";
import { IFqsMonitoringVideoInfo } from "InterfaceFarm/ai-fqs";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";

const MonitoringVideoRecordStyle = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 3.8rem;
  padding: 0 1.6rem;
  font-weight: 600;
  font-size: 1.6rem;
  color: var(--color-neutral20);

  &.active {
    background: var(--color-orange95);
  }

  svg {
    margin-right: 1.6rem;
  }

  .sub {
    font-weight: 400;
    font-size: 1.4rem;
    color: var(--color-neutral40);
  }

  span {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
  }

  & + & {
    margin-top: 1.2rem;
  }

  ${mediaMaxWidth(breakpoints[2])} {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0.8rem;
    padding: 0.8rem 0;
    gap: 0.4rem;

    .sub {
      margin-left: 3.2rem;
    }
    & + & {
      margin-top: 0;
    }
  }
`;

interface Props {
  active?: boolean;
  videoInfo: IFqsMonitoringVideoInfo;
  onClickItem: (videoInfo: IFqsMonitoringVideoInfo) => void;
}

const MonitoringVideoRecord = ({ active, videoInfo, onClickItem }: Props) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current === null) return;

    const $this = ref.current;
    const $parent = $this.parentElement;
    if ($parent?.childNodes[1] === $this) {
      $this.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "start",
      });
    }
  }, []);

  return (
    <MonitoringVideoRecordStyle
      ref={ref}
      type="button"
      className={`${active ? "active" : ""}`}
      onClick={() => onClickItem(videoInfo)}
    >
      <span>
        <TablerPoint />
        {`${dayjs(videoInfo.record_dt).format("HH:mm")} ~ ${dayjs(
          videoInfo.record_finish_dt
        ).format("HH:mm")}`}
      </span>
      <span className="sub">
        {dayjs("1970-01-01 00:00:00")
          .add(videoInfo.video_length, "second")
          .format("HH:mm:ss")}
      </span>
    </MonitoringVideoRecordStyle>
  );
};

export default MonitoringVideoRecord;
