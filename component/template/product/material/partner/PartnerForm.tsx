/** 협력업체 Form */
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { css } from "@emotion/react";
import { IEnvironmentRes } from "InterfaceFarm/environment";
import { IPartnerSaveReq } from "InterfaceFarm/material";
import { AddressSearch } from "@ComponentFarm/modules/AddressSearch/AddressSearch";
import ErrorTxt from "@ComponentFarm/atom/ErrorTxt/ErrorTxt";
import { FormWrap } from "@ComponentFarm/common";
import PageLayout from "@ComponentFarm/layout/PageLayout";
import { convertEnv } from "@UtilFarm/convertEnvironment";
import { settingsByMode, tabDataFunc } from "./const";

interface FormProps {
  initialData?: IPartnerSaveReq;
  isSubmitLoading: boolean;
  environment: IEnvironmentRes;
  pageMode: string;
  partnerLabel: string;
  submitFunc: (data: IPartnerSaveReq) => void;
}

const FormStyles = css`
  h3 {
    font-weight: 700;
    padding: 3.2rem 0;
    margin: 0;
    font-size: var(--font-size6);
    border-bottom: 1px solid var(--color-neutral90);
  }

  .line1,
  .line2,
  .line3 {
    .field1 {
      width: calc(50% - 25px);
    }
    .field2 {
      width: calc(50% - 25px);
    }
  }
  .line4 {
    .field1 {
      width: 100%;
    }
  }

  .btn-wrap {
    margin-top: 10rem;
    display: flex;
    justify-content: flex-end;
    gap: 0 1.6rem;
    padding-right: 5.6rem;
  }
`;

const PartnerForm: React.FC<FormProps> = ({
  initialData,
  isSubmitLoading,
  environment,
  pageMode,
  submitFunc,
  partnerLabel = "",
}) => {
  const router = useRouter();

  const tabData = tabDataFunc(partnerLabel, pageMode, router?.query);

  const defaultValues = {
    evi_partner_company_type: initialData?.evi_partner_company_type ?? "",
    partner_company_name: initialData?.partner_company_name ?? "",
    business_number: initialData?.business_number ?? "",
    business_address: initialData?.business_address ?? "",
    evi_partner_company_status: initialData?.evi_partner_company_status ?? "",
    partner_company_description: initialData?.partner_company_description ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPartnerSaveReq>({ defaultValues });

  const isReadOnly = pageMode === "view";

  const onFormSubmit = handleSubmit((data: any) => {
    if (isSubmitLoading) return;

    submitFunc(data);
  });

  const onSubmit = () => {
    if (pageMode !== "view") {
      onFormSubmit();
    } else {
      router.push({
        pathname: `/material/partner/modify/${
          router.query.id !== undefined && router.query.id[1]
        }`,
        query: router.query,
      });
    }
  };

  const settingsByModeObj = settingsByMode(partnerLabel);
  // 현재 mode에 따른 설정 가져오기
  const currentSettings = settingsByModeObj[pageMode];

  return (
    <PageLayout
      subRoot
      tabData={tabData}
      currentSettings={currentSettings}
      isSubmitLoading={isSubmitLoading}
      onSubmit={onSubmit}
    >
      <FormWrap css={FormStyles}>
        <h3>{partnerLabel} 기본 정보</h3>
        <div className="line line1">
          <div className="field field1">
            <label htmlFor="evi_partner_company_type" className="">
              {partnerLabel} 코드
            </label>
            <div className="box_inp">
              <input
                type="text"
                id="evi_partner_company_type"
                className="inp"
                placeholder={`${partnerLabel} 등록 시, 자동 생성`}
                value={initialData?.partner_company_code ?? ""}
                disabled
              />
            </div>
          </div>
          <div className="field field2">
            <label htmlFor="partner_company_name" className="req">
              {partnerLabel} 명(한글)
            </label>
            <div
              className={`box_inp ${
                errors.partner_company_name ? "error" : ""
              }`}
            >
              <input
                type="text"
                id="partner_company_name"
                className="inp"
                placeholder={`${partnerLabel} 명 (한글)`}
                disabled={isReadOnly}
                {...register("partner_company_name", {
                  required: "필수 입력항목입니다.",
                })}
              />
              {errors.partner_company_name && (
                <ErrorTxt>{errors.partner_company_name.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <div className="line line2">
          <div className="field field1">
            <label htmlFor="business_number" className="req">
              사업자 번호
            </label>
            <div className={`box_inp ${errors.business_number ? "error" : ""}`}>
              <input
                type="text"
                id="business_number"
                className="inp"
                placeholder=""
                disabled={isReadOnly}
                {...register("business_number", {
                  required: "필수 입력항목입니다.",
                })}
              />
              {errors.business_number && (
                <ErrorTxt>{errors.business_number.message}</ErrorTxt>
              )}
            </div>
          </div>
          <div className="field field2">
            <label htmlFor="business_address" className="req">
              사업자 주소
            </label>
            <div
              className={`box_inp ${errors.business_address ? "error" : ""}`}
            >
              <AddressSearch
                {...register("business_address", {
                  required: "필수 입력 항목입니다.",
                })}
                onSelect={(address) => {
                  console.log("onSelect", address);
                }}
                disabled={isReadOnly}
              />

              {errors.business_address && (
                <ErrorTxt>{errors.business_address.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <div className="line line3">
          <div className="field field1">
            <label htmlFor="evi_partner_company_status" className="req">
              상태
            </label>
            <div
              className={`box_inp ${
                errors.evi_partner_company_status ? "error" : ""
              }`}
            >
              <select
                id="evi_partner_company_status"
                disabled={isReadOnly}
                {...register("evi_partner_company_status", {
                  required: "필수 입력항목입니다.",
                })}
              >
                <option value="">상태 선택</option>
                {convertEnv("partner_company_status").map((el) => (
                  <option key={el.value} value={String(el.value)}>
                    {el.label}
                  </option>
                ))}
              </select>
              {errors.evi_partner_company_status && (
                <ErrorTxt>{errors.evi_partner_company_status.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <div className="line line4">
          <div className="field field1">
            <label htmlFor="partner_company_description" className="">
              {partnerLabel} 설명
            </label>
            <div
              className={`box_inp ${
                errors.partner_company_description ? "error" : ""
              }`}
            >
              <textarea
                id="partner_company_description"
                placeholder={`${partnerLabel}에 대한 설명 입력`}
                disabled={isReadOnly}
                {...register("partner_company_description")}
              />
              {errors.partner_company_description && (
                <ErrorTxt>
                  {errors.partner_company_description.message}
                </ErrorTxt>
              )}
            </div>
          </div>
        </div>
        {/* <div className="btn-wrap">
        <Button variant="gostSecondary" onClick={() => onBack()}>
          취소
        </Button>
        <Button type="submit" onClick={onFormSubmit}>
          {isEdit ? '수정' : '등록'}
        </Button>
      </div> */}
      </FormWrap>
    </PageLayout>
  );
};

export default PartnerForm;
