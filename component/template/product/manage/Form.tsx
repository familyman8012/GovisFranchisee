import React from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { IEnvironmentRes } from "InterfaceFarm/environment";
import { IProductFormField, IProductFormSaveReq } from "InterfaceFarm/product";
import CheckBoxGroup from "@ComponentFarm/modules/CheckBoxGroup/CheckBoxGroup";
import DatePicker, {
  NewDate,
} from "@ComponentFarm/modules/DatePicker/DatePicker";
import ImageUploader from "@ComponentFarm/modules/ImageUploader/ImageUploader";
import { Divider } from "@ComponentFarm/atom/Divider/Divider";
import ErrorTxt from "@ComponentFarm/atom/ErrorTxt/ErrorTxt";
import { FormWrap } from "@ComponentFarm/common";
import PageLayout from "@ComponentFarm/layout/PageLayout";
import {
  envKeys,
  productStyles,
  settingsByMode,
  tabDataFunc,
} from "@ComponentFarm/template/product/manage/const";
import useEnvironments from "HookFarm/useEnviroments";
import useStatusStop from "HookFarm/useStatusStop";

interface FormProps {
  initialData?: IProductFormField;
  isSubmitLoading?: boolean;
  pageMode: string;
  environment: IEnvironmentRes;
  setSelectedImgFile: React.Dispatch<React.SetStateAction<File | null>>;
  submitFunc: (data: IProductFormSaveReq) => void;
}

const ProductForm: React.FC<FormProps> = ({
  initialData,
  isSubmitLoading,
  environment,
  pageMode,
  setSelectedImgFile,
  submitFunc,
}) => {
  const router = useRouter();
  const tabData = tabDataFunc(pageMode, router?.query);
  const DatePickerRef = React.useRef<ReactDatePicker>(null);

  const { STATUS, GROUP, CATEGORY, SALETYPE } = useEnvironments(
    environment?.list,
    envKeys
  );

  const defaultValues = {
    evi_product_status: initialData?.evi_product_status ?? "",
    evi_product_group: initialData?.evi_product_group ?? "",
    evi_product_category: initialData?.evi_product_category ?? "",
    evi_sale_type: initialData?.evi_sale_type ?? [],
    product_name_ko: initialData?.product_name_ko ?? "",
    product_name_en: initialData?.product_name_en ?? "-",
    product_description: initialData?.product_description ?? "",
    sale_start_date:
      initialData?.sale_start_date === "0000-00-00"
        ? dayjs().format("YYYY-MM-DD")
        : initialData?.sale_start_date ?? "",
    sale_end_date:
      initialData?.sale_end_date === "0000-00-00"
        ? ""
        : initialData?.sale_end_date ?? "",
  };

  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductFormSaveReq>({ defaultValues });

  // 상태 - 중단, 폐기로 변경
  const { isReadOnly, statusWatch } = useStatusStop({
    environment,
    initialDataKey: initialData?.evi_product_status,
    watchKey: "evi_product_status",
    pageMode,
    statusCodes: ["ps_discontinuation", "ps_disposal"], // 배열로 전달
    statusType: "제품",
    DatePickerRef,
    setValue,
    STATUS,
    watch,
  });

  // 현재 mode에 따른 설정 가져오기
  const currentSettings = settingsByMode[pageMode];

  const onFormSubmit = handleSubmit((data: IProductFormSaveReq) => {
    if (isSubmitLoading) return;

    if (pageMode !== "view") {
      submitFunc(data);
    } else {
      router.push({
        pathname: `/product/modify/${
          router.query.id !== undefined && router.query.id[1]
        }`,
        query: router.query,
      });
    }
  });

  return (
    <PageLayout
      tabData={tabData}
      currentSettings={currentSettings}
      isSubmitLoading={isSubmitLoading}
      onSubmit={onFormSubmit}
    >
      <FormWrap css={productStyles}>
        <h2>제품 기본 정보</h2>
        <div className="line line1">
          <div className="field field1">
            <div className="box_upload_image">
              <label className="req" htmlFor="product_img">
                대표 이미지
              </label>
              <div className="box_inp">
                <ImageUploader
                  isReadOnly={isReadOnly}
                  pageMode={pageMode}
                  product_image={String(initialData?.product_image)}
                  onImageChange={setSelectedImgFile}
                />
              </div>
            </div>
          </div>
          <div className="field field2">
            <div className="box box1">
              <label className="" htmlFor="unUse">
                제품 코드
              </label>
              <div className="box_inp">
                <input
                  type="text"
                  className="inp"
                  placeholder="등록 시, 자동 생성 (입력불가)"
                  value={initialData?.product_code ?? ""}
                  disabled
                />
              </div>
            </div>
            <div className="box box2">
              <label htmlFor="evi_product_status" className="req">
                제품 상태
              </label>
              <div
                className={`box_inp ${
                  errors.evi_product_status ? "error" : ""
                }`}
              >
                <select
                  id="evi_product_status"
                  disabled={isReadOnly}
                  {...register("evi_product_status", {
                    required: "필수 입력항목입니다.",
                  })}
                >
                  <option value="">--- 선택 ---</option>
                  {STATUS.map((el) => (
                    <option key={el.value} value={el.value}>
                      {el.label}
                    </option>
                  ))}
                </select>
                {errors.evi_product_status && (
                  <ErrorTxt>{errors.evi_product_status.message}</ErrorTxt>
                )}
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="line line2">
          <div className="field field1">
            <label htmlFor="evi_product_group" className="req">
              제품 그룹
            </label>
            <div
              className={`box_inp ${errors.evi_product_group ? "error" : ""}`}
            >
              <select
                id="evi_product_group"
                disabled={isReadOnly || pageMode === "modify"}
                {...register("evi_product_group", {
                  required: true,
                })}
              >
                <option value="">--- 선택 ---</option>
                {GROUP.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
              {errors.evi_product_group && (
                <ErrorTxt>{errors.evi_product_group.message}</ErrorTxt>
              )}
            </div>
          </div>
          <div className="field field2">
            <label htmlFor="evi_product_category" className="req">
              제품 분류
            </label>
            <div
              className={`box_inp ${
                errors.evi_product_category ? "error" : ""
              }`}
            >
              <select
                id="evi_product_category"
                disabled={isReadOnly}
                {...register("evi_product_category", {
                  required: "필수 입력항목입니다.",
                })}
              >
                <option value="">--- 선택 ---</option>
                {CATEGORY.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
              {errors.evi_product_category && (
                <ErrorTxt>{errors.evi_product_category.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <div className="line line3">
          <div className="field field1">
            <label htmlFor="evi_sale_type" className="req">
              판매 분류 (중복 가능)
            </label>
            <div className={`box_inp ${errors.evi_sale_type ? "error" : ""}`}>
              <Controller
                name="evi_sale_type"
                control={control}
                defaultValue={[]}
                rules={{
                  required: "필수 입력항목입니다.",
                  validate: (value) =>
                    value.length > 0 || "하나 이상 선택하세요.",
                }}
                render={({ field: { value, ref, ...restField } }) => (
                  <CheckBoxGroup
                    {...restField}
                    options={SALETYPE}
                    initialCheckedValues={[
                      ...(initialData?.evi_sale_type || []),
                    ]}
                    disabled={isReadOnly}
                  />
                )}
              />
              {errors.evi_sale_type && (
                <ErrorTxt>{errors.evi_sale_type.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <div className="line line4">
          <div className="field field1">
            <label htmlFor="product_name_ko" className="req">
              제품명 (한글)
            </label>
            <div className={`box_inp ${errors.product_name_ko ? "error" : ""}`}>
              <input
                type="text"
                id="product_name_ko"
                className="inp"
                disabled={isReadOnly}
                {...register("product_name_ko", {
                  required: "필수 입력항목입니다.",
                })}
              />
              {errors.product_name_ko && (
                <ErrorTxt>{errors.product_name_ko.message}</ErrorTxt>
              )}
            </div>
          </div>
          <div className="field field2">
            <label htmlFor="product_name_en" className="req">
              제품명 (영어)
            </label>
            <div className={`box_inp ${errors.product_name_en ? "error" : ""}`}>
              <input
                type="text"
                id="product_name_en"
                className="inp"
                disabled={isReadOnly}
                {...register("product_name_en", {
                  required: "필수 입력항목입니다.",
                })}
              />
              {errors.product_name_en && (
                <ErrorTxt>{errors.product_name_en.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>

        <div className="line line5">
          <div className="field field1">
            <label htmlFor="product_description" className="">
              제품 설명
            </label>
            <div
              className={`box_inp ${errors.product_description ? "error" : ""}`}
            >
              <textarea
                id="product_description"
                placeholder="제품에 대한 설명 입력"
                disabled={isReadOnly}
                {...register("product_description")}
              />
              {errors.product_description && (
                <ErrorTxt>{errors.product_description.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <h2>제품 판매 정보</h2>
        <div className="line line6">
          <div className="field field1">
            <label htmlFor="sale_start_date" className="req">
              판매 시작일
            </label>
            <div className={`box_inp ${errors.sale_start_date ? "error" : ""}`}>
              <Controller
                control={control}
                name="sale_start_date"
                rules={{ required: "필수 입력 항목입니다." }}
                render={({ field }) => (
                  <DatePicker
                    selectedDate={field.value}
                    onChange={(newDate: NewDate) => {
                      field.onChange(String(newDate));
                    }}
                    disabled={isReadOnly}
                    placeholderText="날짜를 선택해주세요."
                  />
                )}
              />
              {errors.sale_start_date && (
                <ErrorTxt>{errors.sale_start_date.message}</ErrorTxt>
              )}
            </div>
          </div>

          {pageMode !== "add" && (
            <div className="field field2">
              <label htmlFor="sale_end_date" className="">
                판매 종료일
              </label>
              <div className={`box_inp ${errors.sale_end_date ? "error" : ""}`}>
                <Controller
                  control={control}
                  name="sale_end_date"
                  render={({ field }) => (
                    <DatePicker
                      DatePickerRef={DatePickerRef}
                      selectedDate={field.value}
                      onChange={(newDate: NewDate) => {
                        field.onChange(String(newDate));
                      }}
                      disabled={
                        pageMode === "view" ||
                        statusWatch?.code === "ps_operation"
                      }
                      placeholderText="‘중단’ 또는 ‘폐기’ 상태일 때, 입력 가능"
                    />
                  )}
                />
                {errors.sale_end_date && (
                  <ErrorTxt>{errors.sale_end_date.message}</ErrorTxt>
                )}
              </div>
            </div>
          )}
        </div>
      </FormWrap>
    </PageLayout>
  );
};
export default ProductForm;
