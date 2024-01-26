import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import useSyncedRef from "HookFarm/useSyncedRef";
import { TimeInputStyle } from "./style";

interface Props {
  value: string | number;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const TimeHourInput = React.forwardRef<HTMLInputElement, Props>(
  ({ value, disabled, onChange }, ref) => {
    const refs = useSyncedRef<HTMLInputElement>(ref);
    const [minute, setMinute] = useState("0");
    const [hour, setHour] = useState("0");

    const getRangedValue = (str: string, min: number, max: number) => {
      const numberValue = parseInt(str, 10);
      if (Number.isNaN(numberValue)) {
        return min?.toString();
      }
      return Math.max(Math.min(numberValue, max), min).toString();
    };

    // value changed set min, sec input state value
    useEffect(() => {
      if (typeof value === "number") {
        setHour(`${value / 3600}`);
        setMinute(`${value / 60}`);
      } else if (typeof value === "string") {
        const [h, m] = value?.replace(/\s+/g, "").split(":") ?? [];
        setHour(`${Number(h)}`);
        setMinute(`${Number(m)}`);
      }
    }, [value]);

    useEffect(() => {
      onChange(
        dayjs().hour(Number(hour)).minute(Number(minute)).format("HH:mm")
      );
    }, [hour, minute]);

    return (
      <TimeInputStyle>
        <input
          ref={refs}
          disabled={disabled}
          className="inp"
          value={hour}
          placeholder="예: 03"
          inputMode="numeric"
          min={0}
          max={23}
          type="text"
          maxLength={2}
          onChange={(e) =>
            setHour(
              getRangedValue(e.target.value?.replace(/[^0-9]/g, ""), 0, 23)
            )
          }
        />
        <span>시</span>
        <input
          className="inp"
          type="text"
          disabled={disabled}
          placeholder="예: 45"
          inputMode="numeric"
          min={0}
          max={59}
          value={minute}
          maxLength={2}
          onChange={(e) =>
            setMinute(
              getRangedValue(e.target.value?.replace(/[^0-9]/g, ""), 0, 59)
            )
          }
        />
        <span>분</span>
      </TimeInputStyle>
    );
  }
);

TimeHourInput.displayName = "TimeHourInput";

export default TimeHourInput;
