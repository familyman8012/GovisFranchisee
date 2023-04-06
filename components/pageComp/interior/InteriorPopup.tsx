import { InteriorReviewSend } from "ApiFarm/InteriorModul";
import { Button } from "ComponentsFarm/elements/Button";
import { ImageRadio } from "ComponentsFarm/elements/ImageRadio";
import Modal, { ModalBody, ModalFooter, ModalHead, ModalHeader } from "ComponentsFarm/elements/Modal";
import { PALLETES } from "LibFarm/color";
import { useState } from "react";

const RadioOptions = [1, 2, 3, 4, 5];

interface iInteriorPopup {
  sbi_idx: number;
  popShow: boolean;
  getView: () => void;
  handlePopShow: () => void;
}

function InteriorPopup({ sbi_idx, popShow, getView, handlePopShow }: iInteriorPopup) {
  const [radios, setRadios] = useState({
    work_score: 0,
    service_score: 0,
  });

  const [review_text, setReview_text] = useState<null | string>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const selected = RadioOptions.find((optionValue) => optionValue === Number(value));
    if (selected) {
      setRadios({
        ...radios,
        [name]: value,
      });
    }
  };

  const reviewSend = async () => {
    const result = await InteriorReviewSend({
      sbi_idx,
      work_score: radios.work_score,
      service_score: radios.service_score,
      review_text,
    });
    setRadios({ work_score: 0, service_score: 0 });
    setReview_text(null);
    handlePopShow();
    getView();
  };

  return (
    <Modal open={popShow} onClose={handlePopShow} className="gv-modal gv-modal--interior interior">
      <ModalHead className="modal-header">
        <h1>인테리어 AS</h1>
      </ModalHead>
      <ModalBody className="modal-body">
        <p>A.S 처리는 만족스러우셨습니까?</p>
        <ImageRadio
          radioId={"work_score"}
          RadioOptions={RadioOptions}
          selectedRadios={radios.work_score}
          onChange={onChange}
          width={24}
          height={24}
          url="ico_as_"
        />
        <p>담당자의 응대는 어떠하였습니까?</p>
        <ImageRadio
          radioId={"service_score"}
          RadioOptions={RadioOptions}
          selectedRadios={radios.service_score}
          onChange={onChange}
          width={24}
          height={24}
          url="ico_as_"
        />
        <textarea
          placeholder="상세내용을 입력해주세요."
          value={review_text ? review_text : ""}
          onChange={(e) => setReview_text(e.target.value)}
        />
      </ModalBody>
      <ModalFooter className="modal-footer">
        <Button
          block
          color={PALLETES["primary-3"]}
          size="sm"
          disabled={radios.work_score !== 0 && radios.service_score !== 0 ? false : true}
          onClick={reviewSend}
        >
          확인
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default InteriorPopup;
