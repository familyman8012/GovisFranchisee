import React, { useState, useEffect, useCallback } from "react";

import Calendar from "@toast-ui/react-calendar";

const useCalendarProps = (ref: React.RefObject<Calendar>) => {
  const [dateTime, setDate] = useState(Date.now());
  const [startDateTime, setStartDateTime] = useState(Date.now());
  const [endDateTime, setEndDateTime] = useState(Date.now());
  const [instance, setInstance] = useState<any>(null);

  const refershTimeState = useCallback(() => {
    const instance = ref.current?.getInstance();
    if (!instance) return;
    setInstance(instance);
    setDate(instance.getDate().getTime());
    setStartDateTime(instance.getDateRangeStart().getTime());
    setEndDateTime(instance.getDateRangeEnd().getTime());
  }, [ref.current]);

  useEffect(() => {
    refershTimeState();
  }, [ref.current]);

  return {
    dateTime,
    startDateTime,
    endDateTime,
    instance,
    refershTimeState,
  };
};

export default useCalendarProps;
