import { ReturnApplyModifyinfo, ReturnApplyViewinfo } from "ApiFarm/return";
import { Datepicker } from "ComponentsFarm/elements/Datepicker";
import { ListCustomCheckBox } from "ComponentsFarm/elements/GoCheckbox";
import { LabelText, LabelTextArea } from "ComponentsFarm/elements/GoPizzaInput";
import { GoRadio } from "ComponentsFarm/elements/GoRadio";
import Layout from "ComponentsFarm/layouts";
import { Container } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import ImgUpload from "ComponentsFarm/pageComp/return/ImgUpload";
import { ReturnBoardContentsInfo } from "ComponentsFarm/pageComp/return/ReturnBoardContentsInfo";
import { ErrorTxt, RegisterForm, ReturnApplyView } from "ComponentsFarm/pageComp/return/style";
import { IReturnPostValues } from "InterfaceFarm/ReturnBoard";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";

export default function ReturnBoardPost() {
  const router = useRouter();
  const { sbreIdx } = router.query;
  const [attachImg, setAttachImg] = useState<null | string[]>(null);

  // 내비게이션
  const handlerNavBarMenuClick = () => {
    router.push(`/board/return/confirm/${sbreIdx}`);
  };
  // 초기 셋팅
  useEffect(() => {
    //달력 placeholder
    const timer = setTimeout(() => {
      //달력 placeholder
      const inputEl = document.querySelectorAll(".box .gv-datepicker__origin");
      for (var i = 0; i < inputEl.length; i++) {
        inputEl[i].setAttribute("placeholder", "필수 입력 사항입니다.");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const { data } = useQuery(["return-apply-modify"], () => ReturnApplyViewinfo(String(sbreIdx)), {
    enabled: !!sbreIdx,
  });

  const {
    control,
    watch,
    handleSubmit,
    register,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues: useMemo(() => {
      return {
        ...data,
      };
    }, [data]),
  });

  //defaultValue 설정
  useEffect(() => {
    reset(data);
    const imgArr: SetStateAction<null | string[]> = [];
    Array(4)
      .fill(0)
      .map((el, i) => imgArr.push(data && data[`attached_image_${i + 1}`]));
    setAttachImg(imgArr);
  }, [data, reset]);

  //수정을 위해 기본셋팅
  useEffect(() => {
    if (data) {
      const occur_arr: any[] = [false, false, false, false];
      data?.occur_type.forEach((el: number) => (el === 9 ? (occur_arr[4] = String(4)) : (occur_arr[el] = String(el))));

      setValue("occur_type", occur_arr);
      setValue("process_request", `process_request${data?.process_request}`);
    }
  }, [data, setValue]);

  // 체크박스 확인
  const IsChk = watch("occur_type");

  //  react hook form 의 submit 버튼 클릭 하면, axios 로 보낼 data 를 형변환등 작업을 해서 전송.
  const onSubmit: SubmitHandler<IReturnPostValues> = async (values) => {
    const modifydata = {
      sbre_idx: Number(sbreIdx),
      receiving_date: values.receiving_date.toString(),
      product_name: values.product_name,
      product_quantity: Number(values.product_quantity),
      expiration_date: values.expiration_date,
      occur_type: values.occur_type
        .filter((el: boolean | number) => el !== false)
        .map((el: string) => (el === "4" ? "9" : el))
        .toString(),
      occur_etc: values.occur_type?.includes("4") ? values.occur_etc ?? "" : null,
      process_request: Number(values.process_request.charAt(values.process_request.length - 1)),
      detail_content: values.detail_content,
    };

    await ReturnApplyModifyinfo(modifydata);
    router.push(`/board/return/confirm/${sbreIdx}`);
  };

  return (
    <Layout menuIconType="back" className="fullWidth" handlerMenuIcon={handlerNavBarMenuClick}>
      <FeedBackContents>
        <ReturnApplyView>
          <div className={"contents-prefix-box"}>
            <Container className="contents recipe-feedback-post">
              {data && (
                <ReturnBoardContentsInfo
                  dataItem={{
                    status: data.status,
                    created_at: data.created_at,
                    product_name: data.product_name,
                    sbre_idx: Number(sbreIdx),
                    unread_content_count: 0,
                    delete_possible: "",
                  }}
                />
              )}
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
                <div className={`box ${errors.receiving_date && "error"}`}>
                  <div className="tit">입고일자</div>
                  <Controller
                    name="receiving_date"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Datepicker onChange={(date) => field.onChange(date)} editable={false} value={field.value} />
                    )}
                  />
                  {errors.receiving_date && <ErrorTxt>필수 입력 사항입니다.</ErrorTxt>}
                </div>
                <div className={`box ${errors.expiration_date && "error"}`}>
                  <div className="tit">유통기한/제조일자</div>
                  <Controller
                    name="expiration_date"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Datepicker onChange={(date) => field.onChange(date)} editable={false} value={field.value} />
                    )}
                  />
                  {errors.expiration_date && <ErrorTxt>필수 입력 사항입니다.</ErrorTxt>}
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
                  {["이물혼입", "배송불량", "품질 불량", "입수부족", "기타(상세기재)"].map((el, i) => (
                    <ListCustomCheckBox
                      label={el}
                      key={i}
                      value={i}
                      id={`occur_type${i}`}
                      className={IsChk && IsChk.includes(String(i)) ? "on" : ""}
                      register={{
                        ...register(`occur_type.${i}`, {
                          validate: () =>
                            getValues("occur_type")?.filter((el: boolean | number) => el !== false).length !== 0,
                        }),
                      }}
                      register2={{
                        ...register("occur_etc"),
                      }}
                    />
                  ))}
                </div>
                {errors.occur_type && IsChk?.every((el: boolean | number) => el === false) && (
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
                  {errors.process_request && <ErrorTxt>필수 입력 사항입니다.</ErrorTxt>}
                </div>
                <div className="box">
                  <div className="tit">이미치 첨부 / 최대 4개</div>
                  <div className="wrap_imgupload">
                    {Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <ImgUpload
                          key={`imgupload${i}`}
                          mode="modify"
                          item={{
                            sbre_idx: String(sbreIdx),
                            attached_number: i + 1,
                            attached_imgurl: attachImg && attachImg[i],
                          }}
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
                <button className={"btn-contents"} type="submit">
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
