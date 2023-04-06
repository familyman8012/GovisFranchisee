import React, { useMemo, useCallback, useRef, useEffect } from "react";
import dayjs from "dayjs";
import DatePicker, { registerLocale, CalendarContainer } from "react-datepicker";

import { Calendar } from "@emotion-icons/bootstrap/Calendar";
import { Clock } from "@emotion-icons/bootstrap/Clock";
import { CloseButton } from "ComponentsFarm/elements/Button";
import { toClasses } from "LibFarm/toClasses";
import { GvDatePickerWrap } from "./style";

interface DatepickerProps {
  editable?: boolean;
  placeholder?: string;
  className?: string;
  range?: boolean;
  disabled?: boolean;
  value?: string | string[];
  minDate?: string;
  maxDate?: string;
  customInput?: React.ReactNode;
  onChange?: (date: string[]) => void;
}

interface TimepickerProps extends Omit<DatepickerProps, "onChange" | "range" | "value"> {
  timeIntervals?: number;
  value?: string;
  onChange?: (date: string) => void;
}
// eslint-disable-next-line react/display-name
export const ReadonlyLayer = React.forwardRef<
  HTMLInputElement,
  {
    value?: string;
    disabled?: boolean;
    placeholder?: string;
    onClick?: () => void;
  }
>(({ value, placeholder, disabled, onClick, ...otherProps }, ref) => (
  <input {...otherProps} ref={ref} type="text" value={value} readOnly disabled={disabled} placeholder={placeholder} />
));

export const DatepickerContainer: React.FC<{
  className: string;
  children: any;
  onClose: () => void;
}> = ({ className, children, onClose }) => {
  return (
    <GvDatePickerWrap>
      <CalendarContainer className={className}>
        <>
          {children}

          <CloseButton className="gv-datepicker__close" onClick={onClose} />
        </>
      </CalendarContainer>
    </GvDatePickerWrap>
  );
};
// eslint-disable-next-line react/display-name
export const Datepicker = React.forwardRef<any, DatepickerProps>(
  (
    { className, range, value, disabled, placeholder, minDate, maxDate, editable = true, customInput, onChange },
    ref
  ) => {
    const dref = useRef<any>(ref && typeof ref !== "function" ? ref.current : null);

    const dates = range ? [...(value as string[])] : [value];
    const [startDate, endDate] = dates;

    const _startDate = useMemo(
      () => (startDate && dayjs(startDate as string).isValid() ? dayjs(startDate as string).toDate() : null),
      [startDate]
    );
    const _endDate = useMemo(
      () => (endDate && dayjs(endDate as string).isValid() ? dayjs(endDate as string).toDate() : null),
      [endDate]
    );

    const _minDate = useMemo(() => (minDate && dayjs(minDate).isValid() ? dayjs(minDate).toDate() : null), [minDate]);
    const _maxDate = useMemo(() => (maxDate && dayjs(maxDate).isValid() ? dayjs(maxDate).toDate() : null), [maxDate]);

    const handleChange = useCallback(
      (dates: any) => {
        onChange &&
          onChange(
            range
              ? [
                  dates[0] ? dayjs(dates[0]).format("YYYY-MM-DD") : "",
                  dates[1] ? dayjs(dates[1]).format("YYYY-MM-DD") : "",
                ]
              : [dates ? dayjs(dates).format("YYYY-MM-DD") : ""]
          );
      },
      [onChange]
    );

    useEffect(() => {
      if (!ref || typeof ref === "function") return;
      ref.current = dref.current;
    }, [dref.current]);

    const handleClose = useCallback(() => {
      if (!dref.current) return;

      if (dref.current.isCalendarOpen()) {
        dref.current.setOpen(false);
      }
    }, [dref.current]);

    return (
      <div className={toClasses(["gv-datepicker", className])}>
        <DatePicker
          ref={dref}
          locale="ko"
          dateFormat={["yyyy-MM-dd", "yyyy-MM-dd"]}
          className={toClasses(["gv-datepicker__origin"])}
          disabled={disabled}
          selectsRange={range}
          selected={_startDate}
          startDate={_startDate}
          endDate={_endDate}
          minDate={_minDate}
          maxDate={_maxDate}
          placeholderText={placeholder}
          customInput={customInput ? customInput : !editable ? <ReadonlyLayer /> : undefined}
          onChange={handleChange}
          withPortal
          calendarContainer={(props: { className?: string; children: React.ReactNode }) => (
            <DatepickerContainer className={props.className as string} onClose={handleClose}>
              {props.children}
            </DatepickerContainer>
          )}
        />
        <Calendar />
      </div>
    );
  }
);
// eslint-disable-next-line react/display-name
export const Timepicker = React.forwardRef<any, TimepickerProps>(
  ({ className, value, disabled, placeholder, editable = true, onChange, timeIntervals = 60, customInput }, ref) => {
    const _value = useMemo(
      () => (value && dayjs(value).isValid() ? dayjs(value).set("millisecond", 0).toDate() : null),
      [value]
    );

    const handleChange = useCallback(
      (date: any) => {
        onChange && onChange(date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "");
      },
      [onChange]
    );

    return (
      <div className={toClasses(["gv-datepicker", className])}>
        <DatePicker
          ref={ref}
          locale="ko"
          dateFormat={"HH:mm"}
          className={toClasses(["gv-datepicker__origin"])}
          disabled={disabled}
          timeCaption={"시간 선택"}
          selected={_value}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={timeIntervals}
          onChange={handleChange}
          placeholderText={placeholder}
          customInput={customInput ? customInput : !editable ? <ReadonlyLayer /> : undefined}
        />
        <Clock />
      </div>
    );
  }
);
