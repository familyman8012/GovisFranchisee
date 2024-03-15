import { MachineApplyModifyinfo, MachineApplyViewinfo } from "ApiFarm/machine";
import { LabelText, LabelTextArea } from "ComponentsFarm/elements/GoPizzaInput";
import Layout from "ComponentsFarm/layouts";
import { Container } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import ImgUpload from "ComponentsFarm/pageComp/machine/ImgUpload";
import { MachineBoardContentsInfo } from "ComponentsFarm/pageComp/machine/MachineBoardContentsInfo";
import {
  RegisterForm,
  MachineApplyView,
} from "ComponentsFarm/pageComp/machine/style";
import { IMachinePostValues } from "InterfaceFarm/MachineBoard";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";

export default function MachineBoardPost() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { sbmIdx } = router.query;
  const [attachImg, setAttachImg] = useState<null | string[]>(null);

  // 내비게이션
  const handlerNavBarMenuClick = () => {
    router.push(`/board/machine/confirm/${sbmIdx}`);
  };

  const { data } = useQuery(
    ["machine-apply-modify", sbmIdx],
    () => MachineApplyViewinfo(String(sbmIdx)),
    {
      enabled: !!sbmIdx,
    }
  );

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

  //  react hook form 의 submit 버튼 클릭 하면, axios 로 보낼 data 를 형변환등 작업을 해서 전송.
  const onSubmit: SubmitHandler<IMachinePostValues> = async (values) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const modifydata = {
        sbm_idx: Number(sbmIdx),
        machine_name: values.machine_name,
        detail_content: values.detail_content,
      };

      await MachineApplyModifyinfo(modifydata);
      router.push(`/board/machine/confirm/${sbmIdx}`);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      menuIconType="back"
      className="fullWidth"
      handlerMenuIcon={handlerNavBarMenuClick}
    >
      <FeedBackContents>
        <MachineApplyView>
          <div className={"contents-prefix-box"}>
            <Container className="contents recipe-feedback-post">
              {data && (
                <MachineBoardContentsInfo
                  dataItem={{
                    status: data.status,
                    created_at: data.created_at,
                    machine_name: data.machine_name,
                    sbm_idx: Number(sbmIdx),
                    unread_content_count: 0,
                    delete_possible: "",
                  }}
                />
              )}
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
                          mode="modify"
                          item={{
                            sbm_idx: String(sbmIdx),
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
