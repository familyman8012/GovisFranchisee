import { PlusLg } from "@emotion-icons/bootstrap/PlusLg";
import {
  RecipeFeedbackReplyDelete,
  RecipeFeedbackReplyPost,
  RecipeFeedbackTitleDelete,
  RecipeFeedbackViewInfo,
} from "ApiFarm/productFeedback";
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
import { RecipeFeedbackContentsInfo } from "ComponentsFarm/pageComp/feedback/RecipeFeedbackContentsInfo";
import { RecipeFeedbackContentsList } from "ComponentsFarm/pageComp/feedback/RecipeFeedbackContentsList";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import {
  IRecipeFeedbackItem,
  IRecipeFeedbackReplyPostRequest,
  IRecipeFeedbackTitleDeleteRequest,
  IRecipeFeedbackViewInfoRequest,
} from "InterfaceFarm/ProductFeedback";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { authStore } from "src/mobx/store";

export default function RecipeFeedbackView() {
  const ref = useRef<HTMLDivElement>(null);
  const instance = useRef({ timer: 0 });
  const router = useRouter();

  const { sbfIdx } = router.query;
  //const { sbfIdx } = useParams<{ sbfIdx: string }>();
  const [contentInfo, setContentInfo] = useState<IRecipeFeedbackItem>({
    sbf_idx: 0,
    status: 0,
    store_name: "",
    created_at: "",
    title: "",
    last_content_created_at: null,
    unread_content_count: 0,
    delete_possible: "Y",
  });

  const [contentList, setContentList] = useState([]);
  const [showReplyContentsBox, setShowReplyContentsBox] = useState(false);
  const [contentsReplyTextAra, setContentsReplyTextAra] = useState("");

  const [btnSendEnabledClass, setBtnSendEnabledClass] = useState("");
  const [errorMassage, setErrorMassage] = useState("");

  const [
    formContentsSpinnerBoxDisplayClass,
    setFormContentsSpinnerBoxDisplayClass,
  ] = useState("display-hidden");
  const [formContentsBoxDisplayClass, setFormContentsBoxDisplayClass] =
    useState("");

  useEffect(() => {
    sbfIdx && getView();
    return () => {
      clearTimeout(instance.current.timer);
    };
  }, [sbfIdx]);

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
    const data: IRecipeFeedbackViewInfoRequest = {
      sbf_idx: Number(sbfIdx),
    };
    const result = await RecipeFeedbackViewInfo(data);

    setContentInfo({
      sbf_idx: Number(sbfIdx),
      status: result.status,
      store_name: result.store_name,
      created_at: result.created_at,
      title: result.title,
      last_content_created_at: null,
      unread_content_count: 0,
      delete_possible: result.delete_possible,
    });

    if (result.content.length === 0) {
      setShowReplyContentsBox(true);
    }

    setContentList(result.content);
  };

  const handlerNavBarMenuClick = () => {
    router.push("/recipe/feedback");
  };

  const getFileCheck = (fileName: string) => {
    const splitFileNmae = fileName.split(".");
    const fileExt = splitFileNmae[splitFileNmae.length - 1];
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

        const data: IRecipeFeedbackReplyPostRequest = {
          sbf_idx: Number(sbfIdx),
          content_type: contentType,
          content_value: value,
          user_id: userId,
        };
        let result = await RecipeFeedbackReplyPost(data);
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

  const handerBtnSend = () => {
    if (contentsReplyTextAra !== "") {
      setFormContentsSpinnerBoxDisplayClass("");
      setFormContentsBoxDisplayClass("display-hidden");

      const userId = Number(authStore.user_info?.user_idx);
      const data: IRecipeFeedbackReplyPostRequest = {
        sbf_idx: Number(sbfIdx),
        content_type: 0,
        content_value: contentsReplyTextAra,
        user_id: userId,
      };
      let result = RecipeFeedbackReplyPost(data);

      getView();
      setShowReplyContentsBox(false);
      setContentsReplyTextAra("");
      setBtnSendEnabledClass("");
      setFormContentsSpinnerBoxDisplayClass("display-hidden");
      setFormContentsBoxDisplayClass("");
    }
  };

  const handlerOnClickDelete = async (sbfc_idx: number) => {
    const userId = Number(authStore.user_info?.user_idx);
    const data = {
      sbfc_idx: sbfc_idx,
      user_id: userId,
    };

    try {
      await RecipeFeedbackReplyDelete(data);
    } catch (e: any) {
      if (e.code !== 9001) {
        clearTimeout(instance.current.timer);
        setErrorMassage("운영자의 답변이 진행 중이라 삭제 할 수 없습니다.");
        instance.current.timer = window.setTimeout(() => {
          setErrorMassage("");
        }, 1500);
      }
    }

    getView();
  };

  const handleCloseOffcanvas = () => {
    setShowReplyContentsBox(false);
  };

  const handlerOpenOffcanvas = () => {
    setShowReplyContentsBox(true);
  };
  const handlerBtnDeleteInfo = async (item: IRecipeFeedbackItem) => {
    if (confirm("삭제하겠습니까?")) {
      const userId = Number(authStore.user_info?.user_idx);
      const data: IRecipeFeedbackTitleDeleteRequest = {
        sbf_idx: item.sbf_idx,
        user_id: userId,
      };

      try {
        await RecipeFeedbackTitleDelete(data);
        router.push(`/recipe/feedback`);
      } catch (e: any) {
        if (e.code !== 9001) {
          setErrorMassage("운영자가 처리 중이라 삭제 할 수 없습니다.");
          window.setTimeout(() => {
            setErrorMassage("");
          }, 1500);
        }
      }
    }
  };

  return (
    <Layout
      menuIconType="back"
      className="fullWidth"
      handlerMenuIcon={handlerNavBarMenuClick}
    >
      {contentInfo.sbf_idx !== 0 && (
        <FeedBackContents>
          <div className={"recipe-feedback"}>
            <div className={"contents-prefix-box"}>
              <Container className={" recipe-feedback-view "}>
                <RecipeFeedbackContentsInfo
                  dataItem={contentInfo}
                  onDelete={handlerBtnDeleteInfo}
                />
              </Container>
            </div>
            <Container className={"contents recipe-feedback-view "}>
              <Row>
                <RecipeFeedbackContentsList
                  dataList={contentList}
                  onClickDelete={handlerOnClickDelete}
                />
              </Row>

              {contentInfo.status < 2 && (
                <button className={"btn-reply"} onClick={handlerOpenOffcanvas}>
                  <PlusLg width={16} height={16} />
                </button>
              )}

              <div ref={ref} />
            </Container>

            {errorMassage !== "" && <ErrorMassageBox massage={errorMassage} />}

            <OffcanvasBackDrop
              show={showReplyContentsBox}
              onClick={handleCloseOffcanvas}
            />
            <Offcanvas className={`bottom ${showReplyContentsBox ? "on" : ""}`}>
              <div
                className={`form-contents-spinner-box ${formContentsSpinnerBoxDisplayClass}`}
              >
                <Spinner />
                {/* <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner> */}
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
        </FeedBackContents>
      )}
    </Layout>
  );
}
