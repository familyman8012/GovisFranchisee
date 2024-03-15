import { MachineApplyPost, MachineApplyImgPost } from "ApiFarm/machine";
import { Datepicker } from "ComponentsFarm/elements/Datepicker";
import { ListCustomCheckBox } from "ComponentsFarm/elements/GoCheckbox";
import { LabelText, LabelTextArea } from "ComponentsFarm/elements/GoPizzaInput";
import { GoRadio } from "ComponentsFarm/elements/GoRadio";
import Layout from "ComponentsFarm/layouts";
import { Container } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import ImgUpload from "ComponentsFarm/pageComp/machine/ImgUpload";
import {
  ErrorTxt,
  RegisterForm,
  MachineApplyView,
} from "ComponentsFarm/pageComp/machine/style";
import { IMachinePostValues } from "InterfaceFarm/MachineBoard";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export interface ISendImg {
  id: string;
  img: Blob;
}

export default function MachineBoardPost() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sbmIdx, setSbmIdx] = useState<null | number>(null);
  const [sendImg, setSendImg] = useState<undefined | ISendImg[]>([]);

  const {
    control,
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IMachinePostValues>();

  const handlerNavBarMenuClick = () => {
    router.push("/board/machine");
  };

  const sendImageFunc = async (sbmIdx: number) => {
    const sendImageArr =
      typeof sendImg !== "undefined" &&
      sendImg.map((el) => {
        const formData = new FormData();
        formData.append("sbm_idx", String(sbmIdx));
        formData.append("attached_number", String(el.id));
        formData.append("process_type", "C");
        formData.append("attached_file", el.img);
        return formData;
      });
    //      const result = MachineApplyImgPost(formData);
    return await Promise.all(
      (sendImageArr as FormData[]).map((el) => MachineApplyImgPost(el))
    );
  };
  //  이미지 전송 : sbr_idx 가 생성되면, 이미지가 있는 이미지업로드 컴포넌트 버튼만 전송 클릭
  useEffect(() => {
    if (sbmIdx) {
      const sendImgFunc = async () => {
        const sendImageArr =
          typeof sendImg !== "undefined" &&
          sendImg.map((el) => {
            const formData = new FormData();
            formData.append("sbm_idx", String(sbmIdx));
            formData.append("attached_number", String(el.id));
            formData.append("process_type", "C");
            formData.append("attached_file", el.img);
            return formData;
          });
        //      const result = MachineApplyImgPost(formData);
        await Promise.all(
          (sendImageArr as FormData[]).map((el) => MachineApplyImgPost(el))
        );
        setIsLoading(false);
        router.push(`/board/machine/confirm/${sbmIdx}`);
      };
      sendImgFunc();
    }
  }, [router, sbmIdx, sendImg]);

  // 체크박스 확인
  const IsChk = watch("occur_type");
  console.log("Is Chk", IsChk);
  //  react hook form 의 submit 버튼 클릭 하면, axios 로 보낼 data 를 형변환등 작업을 해서 전송.
  const onSubmit: SubmitHandler<IMachinePostValues> = async (values) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = {
        machine_name: values.machine_name,
        detail_content: values.detail_content,
      };

      const result = await MachineApplyPost(data);
      await sendImageFunc(result.sbm_idx);
      router.push(`/board/machine/confirm/${result.sbm_idx}`);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      menuIconType="back"
      handlerMenuIcon={handlerNavBarMenuClick}
      className="fullWidth"
    >
      <FeedBackContents>
        <MachineApplyView className="post">
          <div className={"contents-prefix-box"}>
            <Container className="contents recipe-feedback-post">
              <pre>
                <h6>[알려드립니다.]</h6>
                <p>
                  글 등록 후 확인이 되는대로 답변 받으실 수 있습니다.
                  <br />
                  아래 양식에 맞춰 내용을 기입해주시면
                  <br />
                  더욱 정확한 피드백을 받으실 수 있습니다.
                </p>
              </pre>
              <RegisterForm onSubmit={handleSubmit(onSubmit)}>
                <LabelText
                  label="기기명"
                  register={{
                    ...register(`machine_name`, {
                      required: true,
                    }),
                  }}
                  errors={errors}
                />

                <div className="box">
                  <div className="tit">이미치 첨부 / 최대 4개</div>
                  <div className="wrap_imgupload">
                    {Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <ImgUpload
                          key={`imgupload${i}`}
                          item={{
                            sbm_idx: sbmIdx,
                            attached_number: i + 1,
                          }}
                          sendImg={sendImg}
                          setSendImg={setSendImg}
                        />
                      ))}
                  </div>
                </div>
                <LabelTextArea
                  label="상세 내용 쓰기"
                  register={{
                    ...register(`detail_content`, {}),
                  }}
                  errors={errors}
                />
                <button
                  className={"btn-contents"}
                  type="submit"
                  disabled={isLoading}
                >
                  내용 등록하기 &gt;{" "}
                </button>
              </RegisterForm>
            </Container>
          </div>
        </MachineApplyView>
      </FeedBackContents>
    </Layout>
  );
}
