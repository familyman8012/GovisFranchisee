import { PlusLg } from "@emotion-icons/bootstrap";
import { ReturnApplyViewinfo, ReturnBoardReplyDelete, ReturnBoardReplyPost, ReturnBoardViewinfo } from "ApiFarm/return";
import { Button } from "ComponentsFarm/elements/Button";
import ErrorMassageBox from "ComponentsFarm/elements/ErrorMassageBox";
import FileUploadInput from "ComponentsFarm/elements/FileUploadInput";
import Spinner from "ComponentsFarm/elements/Spinner";
import Layout from "ComponentsFarm/layouts";
import { Container, Offcanvas, OffcanvasBackDrop, Row } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import { ReturnBoardContentsInfo } from "ComponentsFarm/pageComp/return/ReturnBoardContentsInfo";
import { ReturnBoardContentsList } from "ComponentsFarm/pageComp/return/ReturnBoardContentsList";
import { ReturnApplyView } from "ComponentsFarm/pageComp/return/style";
import {
  iReturn,
  iReturnBoardReplyPostRequest,
  iReturnListContent,
  iReturnViewInfoRequest,
} from "InterfaceFarm/ReturnBoard";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { authStore } from "src/mobx/store";

export default function ReturnBoardView() {
  const ref = useRef<HTMLDivElement>(null);
  const { loading, session } = authStore;
  const instance = useRef({ timer: 0 });
  const router = useRouter();

  const { sbreIdx } = router.query;
  const [contentList, setContentList] = useState<iReturnListContent[]>([]);
  const [contentInfo, setContentInfo] = useState<iReturn>({
    status: 0,
    created_at: "",
    product_name: "",
    content: [],
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

  useEffect(() => {
    sbreIdx && getView();
    return () => {
      clearTimeout(instance.current.timer);
    };
  }, [sbreIdx]);

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
    const data: iReturnViewInfoRequest = {
      sbre_idx: Number(sbreIdx),
    };
    const infoResult = await ReturnApplyViewinfo(String(sbreIdx));
    const result = await ReturnBoardViewinfo(data);

    setContentInfo({
      status: infoResult?.status,
      created_at: infoResult?.created_at,
      product_name: infoResult?.product_name,
      content: result?.content,
    });

    if (result.content.length === 0) {
      setShowReplyContentsBox(true);
    }

    setContentList(result.content);
  };

  const handlerNavBarMenuClick = () => {
    router.push(`/board/return/confirm/${sbreIdx}`);
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

        const data: iReturnBoardReplyPostRequest = {
          sbre_idx: Number(sbreIdx),
          content_type: contentType,
          content_value: value,
          user_id: userId,
        };
        let result = await ReturnBoardReplyPost(data);
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
      const data: iReturnBoardReplyPostRequest = {
        sbre_idx: Number(sbreIdx),
        content_type: 0,
        content_value: contentsReplyTextAra,
        user_id: userId,
      };
      let result = await ReturnBoardReplyPost(data);

      getView();
      setShowReplyContentsBox(false);
      setContentsReplyTextAra("");
      setBtnSendEnabledClass("");
      setFormContentsSpinnerBoxDisplayClass("display-hidden");
      setFormContentsBoxDisplayClass("");
    }
  };

  const handlerOnclickDelte = async (sbrec_idx: number) => {
    const userId = Number(session?.info?.user_id);
    const data = {
      sbrec_idx,
      user_id: userId,
    };

    try {
      await ReturnBoardReplyDelete(data);
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

  return (
    <Layout menuIconType="back" className="fullWidth" handlerMenuIcon={handlerNavBarMenuClick}>
      <FeedBackContents>
        <div className={"recipe-feedback"}>
          <ReturnApplyView>
            <div className={"contents-prefix-box"}>
              <Container className={"recipe-feedback-view "}>
                <ReturnBoardContentsInfo
                  dataItem={{
                    ...contentInfo,
                    sbre_idx: Number(sbreIdx),
                    unread_content_count: 0,
                    delete_possible: "",
                  }}
                />
              </Container>
            </div>
            <Container className={"contents recipe-feedback-view "}>
              <Row>
                <ReturnBoardContentsList
                  status={contentInfo.status}
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
          </ReturnApplyView>
        </div>
      </FeedBackContents>
    </Layout>
  );
}
