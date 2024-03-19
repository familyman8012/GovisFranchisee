import { ReturApplyPost, ReturnApplyImgPost } from "ApiFarm/return";
import { Datepicker } from "ComponentsFarm/elements/Datepicker";
import { ListCustomCheckBox } from "ComponentsFarm/elements/GoCheckbox";
import { LabelText, LabelTextArea } from "ComponentsFarm/elements/GoPizzaInput";
import { GoRadio } from "ComponentsFarm/elements/GoRadio";
import Layout from "ComponentsFarm/layouts";
import { Container } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import ImgUpload from "ComponentsFarm/pageComp/return/ImgUpload";
import {
  ErrorTxt,
  RegisterForm,
  ReturnApplyView,
} from "ComponentsFarm/pageComp/return/style";
import { IReturnPostValues } from "InterfaceFarm/ReturnBoard";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export interface ISendImg {
  id: string;
  img: Blob;
}

export default function ReturnBoardPost() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sbreIdx, setSbreIdx] = useState<null | number>(null);
  const [sendImg, setSendImg] = useState<undefined | ISendImg[]>([]);

  const {
    control,
    watch,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IReturnPostValues>({
    defaultValues: {
      product_type: "0",
    },
  });

  const handlerNavBarMenuClick = () => {
    router.push("/board/return");
  };

  // 초기 셋팅
  useEffect(() => {
    // react-hook-form 라디오 버튼 기본셋팅
    setValue("process_request", "process_request0");

    const timer = setTimeout(() => {
      //달력 placeholder
      const inputEl = document.querySelectorAll(".box .gv-datepicker__origin");
      for (var i = 0; i < inputEl.length; i++) {
        inputEl[i].setAttribute("placeholder", "필수 입력 사항입니다.");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const sendImageFunc = async (sbreIdx: number) => {
    const sendImageArr =
      typeof sendImg !== "undefined" &&
      sendImg.map((el) => {
        const formData = new FormData();
        formData.append("sbre_idx", String(sbreIdx));
        formData.append("attached_number", String(el.id));
        formData.append("process_type", "C");
        formData.append("attached_file", el.img);
        return formData;
      });
    //      const result = ReturnApplyImgPost(formData);
    return await Promise.all(
      (sendImageArr as FormData[]).map((el) => ReturnApplyImgPost(el))
    );
  };
  //  이미지 전송 : sbr_idx 가 생성되면, 이미지가 있는 이미지업로드 컴포넌트 버튼만 전송 클릭
  useEffect(() => {
    if (sbreIdx) {
      const sendImgFunc = async () => {
        const sendImageArr =
          typeof sendImg !== "undefined" &&
          sendImg.map((el) => {
            const formData = new FormData();
            formData.append("sbre_idx", String(sbreIdx));
            formData.append("attached_number", String(el.id));
            formData.append("process_type", "C");
            formData.append("attached_file", el.img);
            return formData;
          });
        //      const result = ReturnApplyImgPost(formData);
        await Promise.all(
          (sendImageArr as FormData[]).map((el) => ReturnApplyImgPost(el))
        );
        setIsLoading(false);
        router.push(`/board/return/confirm/${sbreIdx}`);
      };
      sendImgFunc();
    }
  }, [router, sbreIdx, sendImg]);

  // 체크박스 확인
  const IsChk = watch("occur_type");
  console.log("Is Chk", IsChk);
  //  react hook form 의 submit 버튼 클릭 하면, axios 로 보낼 data 를 형변환등 작업을 해서 전송.
  const onSubmit: SubmitHandler<IReturnPostValues> = async (values) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = {
        product_name: values.product_name,
        receiving_date: values.receiving_date.toString(),
        expiration_date: values.expiration_date.toString(),
        product_type: values.product_type?.toString() ?? "",
        product_quantity: Number(values.product_quantity),
        occur_type: values.occur_type
          .filter((el: boolean | number) => el !== false)
          .map((el: string) => (el === "4" ? "9" : el))
          .toString(),
        occur_etc: values.occur_type?.includes("4")
          ? values.occur_etc ?? ""
          : null,
        process_request: Number(
          values.process_request.charAt(values.process_request.length - 1)
        ),
        detail_content: values.detail_content,
      };

      const result = await ReturApplyPost(data);
      await sendImageFunc(result.sbre_idx);
      router.push(`/board/return/confirm/${result.sbre_idx}`);
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
        <ReturnApplyView className="post">
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
                  label="제품명"
                  register={{
                    ...register(`product_name`, {
                      required: true,
                    }),
                  }}
                  errors={errors}
                />
                <div className="box">
                  <div className="tit">제품 유형</div>
                  <div className="wrap_radio">
                    {["-", "전용", "범용", "도우"].map((el, i) => (
                      <GoRadio
                        className="round"
                        key={`product_type${i}`}
                        id={`${i}`}
                        label={el}
                        register={{
                          ...register(`product_type`, {
                            required: true,
                          }),
                        }}
                        value={i}
                      />
                    ))}
                  </div>
                  {errors.product_type &&
                    errors.product_type.type === "required" && (
                      <ErrorTxt>필수 입력 사항입니다.</ErrorTxt>
                    )}
                </div>
                <div className={`box ${errors.receiving_date && "error"}`}>
                  <div className="tit">입고일자</div>
                  <Controller
                    name="receiving_date"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Datepicker
                        onChange={(date) => field.onChange(date)}
                        editable={false}
                        value={field.value}
                      />
                    )}
                  />
                  {errors.receiving_date && (
                    <ErrorTxt>필수 입력 사항입니다.</ErrorTxt>
                  )}
                </div>
                <div className={`box ${errors.expiration_date && "error"}`}>
                  <div className="tit">유통기한/제조일자</div>
                  <Controller
                    name="expiration_date"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Datepicker
                        onChange={(date) => field.onChange(date)}
                        editable={false}
                        value={field.value}
                      />
                    )}
                  />
                  {errors.expiration_date && (
                    <ErrorTxt>필수 입력 사항입니다.</ErrorTxt>
                  )}
                </div>

                <LabelText
                  label="클레임 제품수량"
                  type={"number"}
                  register={{
                    ...register(`product_quantity`, {
                      required: true,
                    }),
                  }}
                  errors={errors}
                />
                <div className="box">
                  <div className="tit">클레임 분류</div>
                  {[
                    "이물혼입",
                    "배송불량",
                    "품질 불량",
                    "입수부족",
                    "기타(상세기재)",
                  ].map((el, i) => (
                    <ListCustomCheckBox
                      label={el}
                      key={i}
                      value={i}
                      id={`occur_type${i}`}
                      className={IsChk && IsChk.includes(String(i)) ? "on" : ""}
                      register={{
                        ...register(`occur_type.${i}`, {
                          validate: () =>
                            getValues("occur_type").filter(
                              (el: boolean) => el !== false
                            ).length !== 0,
                        }),
                      }}
                      register2={{
                        ...register("occur_etc"),
                      }}
                    />
                  ))}
                </div>
                {errors.occur_type &&
                  IsChk?.every((el: boolean | number) => el === false) && (
                    <ErrorTxt>필수 입력 사항입니다.</ErrorTxt>
                  )}
                <div className="box">
                  <div className="tit">요청 사항</div>
                  <div className="wrap_radio">
                    {["반품", "교환", "개선 (자체소진)"].map((el, i) => (
                      <GoRadio
                        className="round"
                        key={`process_request${i}`}
                        id={`process_request${i}`}
                        label={el}
                        register={{
                          ...register(`process_request`, {
                            required: true,
                          }),
                        }}
                      />
                    ))}
                  </div>
                  {errors.process_request &&
                    errors.process_request.type === "required" && (
                      <ErrorTxt>필수 입력 사항입니다.</ErrorTxt>
                    )}
                </div>
                <div className="box">
                  <div className="tit">이미치 첨부 / 최대 4개</div>
                  <div className="wrap_imgupload">
                    {Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <ImgUpload
                          key={`imgupload${i}`}
                          item={{
                            sbre_idx: sbreIdx,
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
        </ReturnApplyView>
      </FeedBackContents>
    </Layout>
  );
}
