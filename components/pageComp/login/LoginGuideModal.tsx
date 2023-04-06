import React from "react";
import { Modal, ModalBody } from "ComponentsFarm/elements/Modal";
import { CloseButton } from "ComponentsFarm/elements/Button";

interface LoginGuideModalProps {
  show: boolean;
  onClose: () => void;
}

export const LoginGuideModal = ({ show, onClose }: LoginGuideModalProps) => {
  return (
    <Modal className="gv-modal" open={show} onClose={onClose}>
      <ModalBody className="gv-modal__body gv-text-left p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="gv-typo-heading-4 mb-0">이용안내</h3>
          <CloseButton clear size="sm" onClick={onClose} />
        </div>
        <hr />
        <p className="white-space-pre-wrap weight-normal gv-typo-body-1 line-height-large">{`본 서비스는 외부에 공개되지 않은 \"(주)고피자\" 가맹점주님들을 위한 내부 서비스입니다.\n계정관련 문의는 본사에 문의해 주세요.`}</p>
      </ModalBody>
    </Modal>
  );
};
