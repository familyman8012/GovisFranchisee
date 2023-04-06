import React, { useEffect, useState, useMemo } from "react";

import { Navigation, Pagination, Virtual, Swiper as TSwiper } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import dayjs from "dayjs";

import { Days } from "./Days";
import { ScheduleList } from "./ScheduleList";
import { ISchedule } from "InterfaceFarm/Calendar";
import { Modal, ModalBody } from "ComponentsFarm/elements/Modal";
import { CloseButton } from "ComponentsFarm/elements/Button";

export interface CalendarWeekProps {
  show: boolean;
  date: string; // date string YYYY-MM-DD
  onClose: () => void;
  onScheduleClick?: (sbc_idx: number) => void;
  onChangeSelectedDate?: (date: string) => void;
}

export const CalendarWeek: React.FC<CalendarWeekProps> = ({
  show,
  date,
  onClose,
  onScheduleClick,
  onChangeSelectedDate,
}) => {
  const modules = useMemo(() => [Navigation, Pagination, Virtual], []);
  const [swiper, setSwiper] = useState<TSwiper | null>(null);
  const [slides, setSlides] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(date || dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    const _date = dayjs(date);
    if (!_date.isValid()) return;

    setCurrentDate(date);
  }, [show]);

  useEffect(() => {
    if (!swiper) return;
    swiper?.slideTo(2, 0, false);
  }, [slides]);

  useEffect(() => {
    setSlides([
      dayjs(currentDate).add(-2, "day").format("YYYY-MM-DD"),
      dayjs(currentDate).add(-1, "day").format("YYYY-MM-DD"),
      currentDate,
      dayjs(currentDate).add(1, "day").format("YYYY-MM-DD"),
      dayjs(currentDate).add(2, "day").format("YYYY-MM-DD"),
    ]);

    onChangeSelectedDate && onChangeSelectedDate(currentDate);
  }, [currentDate]);

  const handleLoadedSwiper = (swiper: TSwiper) => {
    setSwiper(swiper);
  };

  const handleDateChange = (swiper: TSwiper) => {
    setCurrentDate(slides[swiper.activeIndex]);
  };

  const handleScheduleClick = (schedule: ISchedule) => onScheduleClick && onScheduleClick(schedule.sbc_idx);

  return (
    <Modal open={show} className={"gv-modal gv-calendar-week-view"} onClose={onClose}>
      <ModalBody>
        <CloseButton clear className="gv-modal__close" onClick={onClose} />
        <h3 className="gv-calendar-week-view__title-date">{currentDate.substring(0, 7).replace("-", ".")}</h3>
        <Days date={currentDate} onChangeDate={(date) => setCurrentDate(date)} />
        <Swiper
          onSwiper={handleLoadedSwiper}
          slidesPerView={1}
          initialSlide={2}
          onTransitionEnd={handleDateChange}
          virtual
          modules={modules}
        >
          {slides.map((date, i) => {
            return (
              <SwiperSlide key={date} virtualIndex={dayjs(date).unix()}>
                <ScheduleList date={date} load={currentDate === date} onScheduleClick={handleScheduleClick} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </ModalBody>
    </Modal>
  );
};
