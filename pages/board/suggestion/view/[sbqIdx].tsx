import { PlusLg } from "@emotion-icons/bootstrap/PlusLg";
import {
  SuggestionBoardReplyDelete,
  SuggestionBoardReplyPost,
  SuggestionBoardViewinfo,
} from "ApiFarm/suggestion";
import ErrorMassageBox from "ComponentsFarm/elements/ErrorMassageBox";
import FileUploadInput from "ComponentsFarm/elements/FileUploadInput";
import Spinner from "ComponentsFarm/elements/Spinner";
import Layout from "ComponentsFarm/layouts";
import {
  Container,
  Offcanvas,
  OffcanvasBackDrop,
  Row,
} from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import { SuggestionBoardContentsInfo } from "ComponentsFarm/pageComp/suggestion/SuggestionBoardContentsInfo";
import { SuggestionBoardContentsList } from "ComponentsFarm/pageComp/suggestion/SuggestionBoardContentsList";
import {
  iSuggestion,
  iSuggestionBoardReplyPostRequest,
  iSuggestionListContent,
  iSuggestionViewInfoRequest,
} from "InterfaceFarm/SuggestionBoard";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { authStore } from "src/mobx/store";

export default function SuggestionBoardView() {
  const ref = useRef<HTMLDivElement>(null);
  const instance = useRef({ timer: 0 });
  const router = useRouter();

  const { sbqIdx } = router.query;
  const [contentList, setContentList] = useState<iSuggestionListContent[]>([]);
  const [contentInfo, setContentInfo] = useState<iSuggestion>({
    status: 0,
    created_at: "",
    category: 0,
    title: "",
    content: [],
  });
  const [showReplyContentsBox, setShowReplyContentsBox] = useState(false);
  const [formContentsBoxDisplayClass, setFormContentsBoxDisplayClass] =
    useState("");
  const [btnSendEnabledClass, setBtnSendEnabledClass] = useState("");
  const [errorMassage, setErrorMassage] = useState("");
  const [
    formContentsSpinnerBoxDisplayClass,
    setFormContentsSpinnerBoxDisplayClass,
  ] = useState("display-hidden");
  const [contentsReplyTextAra, setContentsReplyTextAra] = useState("");

  useEffect(() => {
    sbqIdx && getView();
    return () => {
      clearTimeout(instance.current.timer);
    };
  }, [sbqIdx]);

  useEffect(() => {
    if (contentList.length > 0) {
      window.setTimeout(() => {
        if (ref.current) {
          ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }, 200);
    }
  }, [contentList]);

  const getView = async () => {
    const data: iSuggestionViewInfoRequest = {
      sbq_idx: Number(sbqIdx),
    };
    const result = await SuggestionBoardViewinfo(data);

    setContentInfo({
      status: result.status,
      created_at: result.created_at,
      category: result.category,
      title: result.title,
      content: result.content,
    });

    if (result.content.length === 0) {
      setShowReplyContentsBox(true);
    }

    setContentList(result.content);
  };

  const handlerNavBarMenuClick = () => {
    router.push("/board/suggestion");
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
    const userId = Number(authStore.user_info?.user_idx);

    if (fileList.length > 0) {
      setFormContentsSpinnerBoxDisplayClass("");
      setFormContentsBoxDisplayClass("display-hidden");

      for (let key in fileList) {
        let value = fileList[key];
        const contentType = getFileCheck(value.name);

        const data: iSuggestionBoardReplyPostRequest = {
          sbq_idx: Number(sbqIdx),
          content_type: contentType,
          content_value: value,
          user_id: userId,
        };
        let result = await SuggestionBoardReplyPost(data);
      }

      getView();
      setShowReplyContentsBox(false);

      setFormContentsSpinnerBoxDisplayClass("display-hidden");
      setFormContentsBoxDisplayClass("");
    }
  };

  const handlerTextAreaOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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

      const userId = Number(authStore.user_info?.user_idx);
      const data: iSuggestionBoardReplyPostRequest = {
        sbq_idx: Number(sbqIdx),
        content_type: 0,
        content_value: contentsReplyTextAra,
        user_id: userId,
      };
      let result = await SuggestionBoardReplyPost(data);

      getView();
      setShowReplyContentsBox(false);
      setContentsReplyTextAra("");
      setBtnSendEnabledClass("");
      setFormContentsSpinnerBoxDisplayClass("display-hidden");
      setFormContentsBoxDisplayClass("");
    }
  };

  const handlerOnclickDelte = async (sbqc_idx: number) => {
    const userId = Number(authStore.user_info?.user_idx);
    const data = {
      sbqc_idx,
      user_id: userId,
    };

    try {
      await SuggestionBoardReplyDelete(data);
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
    <Layout
      menuIconType="back"
      className="fullWidth"
      handlerMenuIcon={handlerNavBarMenuClick}
    >
      <FeedBackContents>
        {contentInfo.title !== "" && (
          <div className={"recipe-feedback"}>
            <div className={"contents-prefix-box"}>
              <Container className={"recipe-feedback-view "}>
                <SuggestionBoardContentsInfo
                  dataItem={{
                    ...contentInfo,
                    sbq_idx: Number(sbqIdx),
                    unread_content_count: 0,
                    delete_possible: "",
                  }}
                />
              </Container>
            </div>

            <Container className={"contents recipe-feedback-view "}>
              <Row>
                <SuggestionBoardContentsList
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

            <OffcanvasBackDrop
              show={showReplyContentsBox}
              onClick={() => setShowReplyContentsBox(false)}
            />
            <Offcanvas className={`bottom ${showReplyContentsBox ? "on" : ""}`}>
              <div
                className={`form-contents-spinner-box ${formContentsSpinnerBoxDisplayClass}`}
              >
                <Spinner />
              </div>

              <div
                className={`form-contents-box ${formContentsBoxDisplayClass}`}
              >
                <textarea
                  placeholder={"상세내용을 입력해주세요."}
                  value={contentsReplyTextAra}
                  onChange={handlerTextAreaOnChange}
                />
                <div className={"image-box"}>
                  <FileUploadInput callbackUploadFiles={procFileUpload} />

                  <button
                    onClick={handerBtnSend}
                    className={btnSendEnabledClass}
                  >
                    전송
                  </button>
                </div>
              </div>
            </Offcanvas>
          </div>
        )}
      </FeedBackContents>
    </Layout>
  );
}
