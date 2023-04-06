import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Modal, ModalBody, ModalHead } from "ComponentsFarm/elements/Modal";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import * as NoticeService from "ApiFarm/notice";
import { INoticePopup, INoticePopupResponse } from "InterfaceFarm/Notice";
import { PALLETES } from "LibFarm/color";

import { Button } from "ComponentsFarm/elements/Button";

export const CheckPopupNotice = () => {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [noticeList, setNoticeList] = React.useState<INoticePopup[]>([]);
  const swiperModules = React.useMemo(() => [Navigation, Pagination], []);

  const { refetch } = useQuery<INoticePopupResponse>("check-notice", () => NoticeService.fetchPopupNoticeList(), {
    enabled: false,
  });

  const handleClick = React.useCallback((sbn_idx: number) => router.push(`/notice/board/${sbn_idx}`), []);
  const handleClose = React.useCallback(() => setShow(false), []);
  const handleCheckNotice = React.useCallback(async () => {
    const result = await refetch();

    if (!result.data) return;

    const { count, list } = result.data;

    if (!count) return;

    setShow(true);
    setNoticeList(list);
  }, []);

  React.useEffect(() => {
    handleCheckNotice();
  }, []);

  return (
    <Modal open={show} className={"gv-modal gv-modal--notice"} onClose={handleClose}>
      <ModalHead>
        <h4 className="weight-bold gv-text-center">[알려드립니다]</h4>
      </ModalHead>
      <ModalBody>
        <Swiper modules={swiperModules} pagination navigation slidesPerView={1} spaceBetween={20}>
          {noticeList.map((notice) => {
            return (
              <SwiperSlide key={notice.sbn_idx}>
                <h3>{notice.title}</h3>
                <Button
                  className="notice-round-button"
                  block
                  color={PALLETES["primary-3"]}
                  onClick={() => handleClick(notice.sbn_idx)}
                >
                  상세보기
                </Button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </ModalBody>
    </Modal>
  );
};
