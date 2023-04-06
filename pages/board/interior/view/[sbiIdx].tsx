import { PlusLg } from "@emotion-icons/bootstrap/PlusLg";
import { InteriorBoardReplyDelete, InteriorBoardReplyPost, InteriorBoardViewinfo } from "ApiFarm/InteriorModul";
import { Button } from "ComponentsFarm/elements/Button";
import ErrorMassageBox from "ComponentsFarm/elements/ErrorMassageBox";
import FileUploadInput from "ComponentsFarm/elements/FileUploadInput";
import Spinner from "ComponentsFarm/elements/Spinner";
import Layout from "ComponentsFarm/layouts";
import { Container, Offcanvas, OffcanvasBackDrop, Row } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import { InteriorBoardContentsInfo } from "ComponentsFarm/pageComp/interior/InteriorBoardContentsInfo";
import { InteriorBoardContentsList } from "ComponentsFarm/pageComp/interior/InteriorBoardContentsList";
import InteriorPopup from "ComponentsFarm/pageComp/interior/InteriorPopup";
import {
  iInterior,
  iInteriorBoardReplyPostRequest,
  iInteriorListContent,
  iInteriorViewInfoRequest,
} from "InterfaceFarm/InteriorBoard";
import { PALLETES } from "LibFarm/color";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { authStore } from "src/mobx/store";

export default function InteriorBoardView() {
  const ref = useRef<HTMLDivElement>(null);
  const instance = useRef({ timer: 0 });
  const router = useRouter();
  const { loading, session } = authStore;
  const { sbiIdx } = router.query;

  const [contentList, setContentList] = useState<iInteriorListContent[]>([]);
  const [contentInfo, setContentInfo] = useState<iInterior>({
    status: 0,
    created_at: "",
    title: "",
    content: [],
    review: null,
  });
  const [showReplyContentsBox, setShowReplyContentsBox] = useState(false);
  const [formContentsBoxDisplayClass, setFormContentsBoxDisplayClass] = useState("");
  const [btnSendEnabledClass, setBtnSendEnabledClass] = useState("");
  const [errorMassage, setErrorMassage] = useState("");

  const [popShow, setPopShow] = useState(false);

  const handlePopShow = () => {
    setPopShow((prev) => !prev);
  };

  const [formContentsSpinnerBoxDisplayClass, setFormContentsSpinnerBoxDisplayClass] = useState("display-hidden");
  const [contentsReplyTextAra, setContentsReplyTextAra] = useState("");

  // useEffect(() => {
  //   return () => {
  //     router.push("/board/interior");
  //   };
  // }, [router]);

  useEffect(() => {
    sbiIdx && getView();
  }, [sbiIdx]);

  useEffect(() => {
    if (contentList.length > 0) {
      const timer = window.setTimeout(() => {
        if (ref.current) {
          ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [contentList]);

  const getView = async () => {
    const data: iInteriorViewInfoRequest = {
      sbi_idx: Number(sbiIdx),
    };

    const result = await InteriorBoardViewinfo(data);

    setContentInfo({
      status: result.status,
      created_at: result.created_at,
      title: result.title,
      content: result.content,
      review: result.review,
    });

    if (result.content.length === 0) {
      setShowReplyContentsBox(true);
    }

    setContentList(result.content);
  };

  const handlerNavBarMenuClick = () => {
    router.push("/board/interior");
  };

  const getFileCheck = (fileName: string) => {
    const splitFileName = fileName.split(".");
    const fileExt = splitFileName[splitFileName.length - 1];
    const fileExtLow = fileExt.toLowerCase();
    const arrVideoExtList = [
      "webm",
      "avi",
      "mov",
      "qt",
      "wmv",
      "mp4",
      "m4v",
      "m4p",
      "m4v",
      "3gp",
      "3g2",
      "amv",
      "mts",
      "m2ts",
      "ts",
    ];

    const arrImageExtList = ["bmp", "gif", "png", "jpg", "jpeg", "jpe"];

    let reVal = -1;
    if (arrImageExtList.indexOf(fileExtLow) > -1) {
      reVal = 1;
    } else if (arrVideoExtList.indexOf(fileExtLow) > -1) {
      reVal = 2;
    }

    return reVal;
  };

  const procFileUpload = async (fileList: File[]) => {
    const userId = Number(session?.info?.user_id);

    if (fileList.length > 0) {
      setFormContentsSpinnerBoxDisplayClass("");
      setFormContentsBoxDisplayClass("display-hidden");

      for (let key in fileList) {
        let value = fileList[key];
        const contentType = getFileCheck(value.name);

        const data: iInteriorBoardReplyPostRequest = {
          sbi_idx: Number(sbiIdx),
          content_type: contentType,
          content_value: value,
          user_id: userId,
        };
        let result = await InteriorBoardReplyPost(data);
      }

      getView();
      setShowReplyContentsBox(false);

      setFormContentsSpinnerBoxDisplayClass("display-hidden");
      setFormContentsBoxDisplayClass("");
    }
  };

  const handlerTextAreaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentsReplyTextAra(e.target.value);
    if (e.target.value !== "") {
      setBtnSendEnabledClass("btn-enabled");
    } else {
      setBtnSendEnabledClass("");
    }
  };

  const handerBtnSend = async () => {
    if (contentsReplyTextAra !== "") {
      setFormContentsSpinnerBoxDisplayClass("");
      setFormContentsBoxDisplayClass("display-hidden");

      const userId = Number(session?.info?.user_id);
      const data: iInteriorBoardReplyPostRequest = {
        sbi_idx: Number(sbiIdx),
        content_type: 0,
        content_value: contentsReplyTextAra,
        user_id: userId,
      };
      let result = await InteriorBoardReplyPost(data);

      getView();
      setShowReplyContentsBox(false);
      setContentsReplyTextAra("");
      setBtnSendEnabledClass("");
      setFormContentsSpinnerBoxDisplayClass("display-hidden");
      setFormContentsBoxDisplayClass("");
    }
  };

  const handlerOnclickDelte = async (sbic_idx: number) => {
    const userId = Number(session?.info?.user_id);
    const data = {
      sbic_idx,
      user_id: userId,
    };

    try {
      await InteriorBoardReplyDelete(data);
    } catch (e: any) {
      if (e.code !== 9001) {
        clearTimeout(instance.current.timer);
        setErrorMassage("운영자의 답변이 진행 중이라 삭제 할 수 없습니다");
        instance.current.timer = window.setTimeout(() => {
          setErrorMassage("");
        }, 1500);
      }
    }
    getView();
  };

  // useEffect(() => {
  //   return () => {
  //     router.push("/board/interior");
  //   };
  // }, []);

  return (
    <Layout menuIconType="back" className="fullWidth" handlerMenuIcon={handlerNavBarMenuClick}>
      <FeedBackContents>
        {contentInfo.title !== "" && (
          <div className={"recipe-feedback"}>
            <InteriorPopup sbi_idx={Number(sbiIdx)} popShow={popShow} getView={getView} handlePopShow={handlePopShow} />
            <div className={"contents-prefix-box"}>
              <Container className={"recipe-feedback-view "}>
                <InteriorBoardContentsInfo
                  dataItem={{
                    ...contentInfo,
                    sbi_idx: Number(sbiIdx),
                    unread_content_count: 0,
                    delete_possible: "",
                  }}
                />
              </Container>
            </div>
            <Container className={"contents recipe-feedback-view "}>
              <Row>
                <InteriorBoardContentsList
                  review={contentInfo?.review}
                  dataList={contentList}
                  onClickDelete={handlerOnclickDelte}
                />
              </Row>

              {contentInfo.status < 2 && (
                <button
                  className={"btn-reply"}
                  onClick={() => {
                    setShowReplyContentsBox(true);
                  }}
                >
                  <PlusLg width={16} height={16} />
                </button>
              )}
              {contentInfo.status !== 0 && contentInfo.review === null && (
                // <button className="gv-button">AS 완료하기</button>
                <Button block color={PALLETES["primary-3"]} className="btn_interior_fin" onClick={handlePopShow}>
                  AS 완료하기
                </Button>
              )}

              <div ref={ref} />
            </Container>

            {errorMassage !== "" && <ErrorMassageBox massage={errorMassage} />}

            <OffcanvasBackDrop show={showReplyContentsBox} onClick={() => setShowReplyContentsBox(false)} />
            <Offcanvas className={`bottom ${showReplyContentsBox ? "on" : ""}`}>
              <div className={`form-contents-spinner-box ${formContentsSpinnerBoxDisplayClass}`}>
                <Spinner />
              </div>

              <div className={`form-contents-box ${formContentsBoxDisplayClass}`}>
                <textarea placeholder="상세 내용을 입력해주세요." onChange={handlerTextAreaOnChange} />
                <div className="image-box">
                  <FileUploadInput callbackUploadFiles={procFileUpload} />
                  <Button className={`weight-500 ${btnSendEnabledClass}`} onClick={handerBtnSend}>
                    전송
                  </Button>
                </div>
              </div>
            </Offcanvas>
          </div>
        )}
      </FeedBackContents>
    </Layout>
  );
}
