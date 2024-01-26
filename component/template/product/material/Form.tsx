import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { css } from "@emotion/react";
import { IEnvironmentRes } from "InterfaceFarm/environment";
import {
  IMaterial,
  IMaterialCategoryRes,
  IPartnerRes,
} from "InterfaceFarm/material";
import ImageUploader from "@ComponentFarm/modules/ImageUploader/ImageUploader";
import MultiSelectWithBadges from "@ComponentFarm/modules/MultiSelectWithBadges/MultiSelectWithBadges";
import RadioGroup from "@ComponentFarm/modules/RadioGroup/RadioGroup";
import ErrorTxt from "@ComponentFarm/atom/ErrorTxt/ErrorTxt";
import { Select } from "@ComponentFarm/atom/Select/Select";
import { FormWrap } from "@ComponentFarm/common";
import PageLayout from "@ComponentFarm/layout/PageLayout";
import useEnvironments, {
  EnvironmentKeyMapping,
} from "HookFarm/useEnviroments";
import { transformCategoryByDepth } from "@UtilFarm/transformCategoryDepth";
import { settingsByMode, tabDataFunc } from "./const";

interface FormProps {
  initialData?: IMaterial;
  isSubmitLoading: boolean;
  pageMode: string;
  environment: IEnvironmentRes;
  materialCategory: IMaterialCategoryRes;
  materialPatner: IPartnerRes;
  setSelectedImgFile: React.Dispatch<React.SetStateAction<File | null>>;
  submitFunc: (data: any) => void;
}

const productStyles = css`
  .box_inp + .box_inp {
    margin-left: 1.6rem;
  }
  .line1 {
    .field2 {
      display: block;
      .box {
        display: flex;
        margin-bottom: 2.4rem;
      }
    }
  }
  .line {
    .field {
      width: 100%;
    }
  }
  .line1,
  .line5,
  .line8,
  .line9,
  .line12,
  .line13 {
    .field {
      padding-right: 0;
    }
    .field1 {
      width: calc(50% - 25px);
    }
    .field2 {
      width: calc(50% - 25px);
      margin-left: auto;
    }
  }

  .line3 {
    .box_inp {
      width: 15rem;
    }
  }
  .line6,
  .line7 {
    .box_inp {
      width: 11.2rem;
    }
  }
  .line8,
  .line9,
  .line10,
  .line11 {
    .inp {
      width: 24rem;
    }
  }

  .line12 .txt_box .title {
    width: max-content;
  }

  .line14 {
    .inp {
      width: 40rem;
    }
  }

  #material_trade_qty,
  #material_spec_qty,
  #purchase_price,
  #purchase_cost,
  #sale_price,
  #sale_cost,
  #material_config_qty,
  #minimal_purchase_qty,
  #estimate_price {
    &:focus::placeholder {
      opacity: 0;
    }
  }
`;

const MaterialForm: React.FC<FormProps> = ({
  initialData,
  isSubmitLoading,
  environment,
  materialCategory,
  materialPatner,
  pageMode,
  setSelectedImgFile,
  submitFunc,
}) => {
  const router = useRouter();
  // const { id } = router.query;
  const tabData = tabDataFunc("material", pageMode, router?.query);

  const envKeys: EnvironmentKeyMapping[] = [
    ["material_status", "MATERIAL_STATUS"],
    ["material_product_type", "PRODUCT_TYPE"],
    ["material_storage_type", "STORAGE_TYPE"],
    ["material_trade_unit", "TRADE_UNIT"],
    ["material_spec_unit", "SPEC_UNIT"],
    ["taxable", "TAXABLE"],
    ["vat", "VAT"],
    ["country", "COUNTRY"],
    ["material_sale_brand", "SALE_BRAND"],
  ];

  const {
    MATERIAL_STATUS,
    PRODUCT_TYPE,
    STORAGE_TYPE,
    TRADE_UNIT,
    SPEC_UNIT,
    TAXABLE,
    VAT,
    COUNTRY,
    SALE_BRAND,
  } = useEnvironments(environment?.list, envKeys);

  // // 거래처 변환
  const PARTNER = useMemo(
    () =>
      materialPatner.list.map((item) => ({
        label: item.partner_company_name,
        value: item.partner_company_idx,
      })),
    [materialPatner]
  );

  const PartnerInitialValue = useMemo(
    () =>
      PARTNER.find(
        (el) => String(el.value) === String(initialData?.pci_manufacturer)
      ),
    [PARTNER, initialData?.pci_manufacturer]
  );

  // const CountryInitialValue = useMemo(
  //   () =>
  //     COUNTRY.find(el => String(el.value) === String(initialData?.evi_country)),
  //   [COUNTRY, initialData?.evi_country]
  // );

  const CATEGORY1 = useMemo(
    () => transformCategoryByDepth(materialCategory?.list, 1),
    [materialCategory?.list]
  );
  const CATEGORY2 = useMemo(
    () => transformCategoryByDepth(materialCategory?.list, 2),
    [materialCategory?.list]
  );
  const CATEGORY3 = useMemo(
    () => transformCategoryByDepth(materialCategory?.list, 3),
    [materialCategory?.list]
  );

  const defaultValues = {
    external_code: initialData?.external_code ?? "", // replaced innercode
    evi_material_status: initialData?.evi_material_status ?? "", // replaced status
    evi_material_product_type: initialData?.evi_material_product_type ?? "", // replaced product_category
    mci_large: initialData?.mci_large ?? "", // replaced sel_category1
    mci_middle: initialData?.mci_middle ?? "", // replaced sel_category2
    mci_small: initialData?.mci_small ?? "", // replaced sel_category3
    evi_material_storage_type: initialData?.evi_material_storage_type ?? "", // replaced save_dd
    material_name_ko: initialData?.material_name_ko ?? "", // replaced name_ko
    material_name_en: initialData?.material_name_en ?? "", // replaced name_en
    material_trade_qty: initialData?.material_trade_qty ?? 0, // replaced quanity
    evi_material_trade_unit: initialData?.evi_material_trade_unit ?? "", // replaced quanity2
    material_spec_qty: initialData?.material_spec_qty ?? 0, // replaced spec
    evi_material_spec_unit: initialData?.evi_material_spec_unit ?? "", // replaced spec2
    material_config_qty: initialData?.material_config_qty ?? 0, // replaced amount
    minimal_purchase_qty: initialData?.minimal_purchase_qty ?? 0, // replaced lessAmount
    estimate_price: initialData?.estimate_price ?? 0, // replaced price1
    purchase_price: initialData?.purchase_price ?? 0, // replaced price2
    sale_price: initialData?.sale_price ?? 0, // replaced price3
    evi_taxable: initialData?.evi_taxable ?? "", // replaced taxable
    evi_vat: initialData?.evi_vat ?? "", // replaced vat
    pci_manufacturer: initialData?.pci_manufacturer
      ? PartnerInitialValue
      : undefined, // replaced company
    evi_country: initialData?.evi_country ? initialData?.evi_country : [], // replaced country
    purchase_place: initialData?.purchase_place ?? "", // replaced client
    material_description: initialData?.material_description ?? "", // replaced desc
    evi_material_sale_brand: initialData?.evi_material_sale_brand ?? [],
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IMaterial>({ defaultValues });

  const isReadOnly = pageMode === "view";

  // 원재료 규격 (단위)
  const materialSpecUnitWatch = watch("evi_material_spec_unit");
  const materialSpecUnit = environment?.list?.find(
    (el) =>
      String(el?.environment_variable_idx) === String(materialSpecUnitWatch)
  )?.value;

  // 원재료 규격 (양)
  const materialSpecQty = Number(watch("material_spec_qty"));

  // 입수량
  const materialConfigQty = Number(watch("material_config_qty"));

  // 판매가
  const purchasePrice = Number(watch("purchase_price"));
  const salePrice = Number(watch("sale_price"));

  const basicCostDisable = !materialSpecUnit || !materialSpecQty;
  const isPurchaseCostDisable = basicCostDisable || !purchasePrice;
  const isSaleCostDisable = basicCostDisable || !salePrice;

  // Helper function to compute cost
  const computeCost = (price: number, specUnit: string, specQty: number) => {
    let cost = 0;

    if (specUnit === "kg" || specUnit === "L") {
      cost = price / (specQty * 1000);
    } else {
      cost = price / specQty;
    }

    return cost;
  };

  useEffect(() => {
    if (basicCostDisable) return;

    if (purchasePrice) {
      const purchaseCost = computeCost(
        purchasePrice,
        materialSpecUnit,
        materialSpecQty
      );
      setValue("purchase_cost", parseFloat(purchaseCost.toFixed(2)));
      clearErrors("purchase_cost");
    }

    if (salePrice) {
      const saleCost = computeCost(
        salePrice,
        materialSpecUnit,
        materialSpecQty
      );
      setValue("sale_cost", parseFloat(saleCost.toFixed(2)));
      clearErrors("sale_cost");
    }
  }, [
    materialSpecUnit,
    materialSpecQty,
    materialConfigQty,
    purchasePrice,
    salePrice,
    setValue,
    basicCostDisable,
    clearErrors,
  ]);

  const handleFocus = (event: any) => {
    if (event.target.value === "0") {
      setValue(event.target.name, "");
    }
  };

  const onFormSubmit = handleSubmit((data) => {
    if (isSubmitLoading) return;

    // 주어진 필드들을 숫자로 변환
    const fieldsToConvert = [
      "material_trade_qty",
      "material_spec_qty",
      "purchase_price",
      "purchase_cost",
      "sale_price",
      "sale_cost",
      "material_config_qty",
      "minimal_purchase_qty",
      "estimate_price",
    ];

    const convertedData = { ...data };

    fieldsToConvert.forEach((fieldName) => {
      if (!(data as any)[fieldName]) {
        setValue(fieldName as any, 0);
      }
      const numberValue = Number((data as any)[fieldName]);
      if (!Number.isNaN(numberValue)) {
        (convertedData as any)[fieldName] = numberValue;
      }
    });

    if (pageMode !== "view") {
      submitFunc(convertedData);
    } else {
      router.push({
        pathname: `/material/modify/${
          router.query.id !== undefined && router.query.id[1]
        }`,
        query: router.query,
      });
    }
  });

  // 현재 mode에 따른 설정 가져오기
  const currentSettings = settingsByMode[pageMode];

  return (
    <PageLayout
      tabData={tabData}
      currentSettings={currentSettings}
      isSubmitLoading={isSubmitLoading}
      onSubmit={onFormSubmit}
    >
      <FormWrap css={productStyles}>
        <h2>원재료 기본 정보</h2>
        <div className="line line1">
          <div className="field field1">
            <div className="box_upload_image">
              <label htmlFor="product_img">대표 이미지</label>
              <div className="box_inp">
                <ImageUploader
                  isReadOnly={isReadOnly}
                  pageMode={pageMode}
                  product_image={String(initialData?.material_image)}
                  onImageChange={setSelectedImgFile}
                />
              </div>
            </div>
          </div>
          <div className="field field2">
            <div className="box box1">
              <label htmlFor="code" className="">
                원재료 코드
              </label>
              <div className="box_inp">
                <input
                  type="text"
                  id="code"
                  className="inp"
                  placeholder="등록 시, 자동 생성 (입력불가)"
                  value={initialData?.material_code ?? ""}
                  disabled
                />
              </div>
            </div>
            <div className="box box2">
              <label htmlFor="external_code" className="">
                내부 코드
              </label>
              <div className={`box_inp ${errors.external_code ? "error" : ""}`}>
                <input
                  type="text"
                  id="code"
                  className="inp"
                  placeholder="기존 발주GO에 등록된 상품이면 코드 입력 필수"
                  disabled={isReadOnly}
                  {...register("external_code")}
                />
                {errors.external_code && (
                  <ErrorTxt>{errors.external_code.message}</ErrorTxt>
                )}
              </div>
            </div>
            <div className="box box3">
              <label htmlFor="evi_material_status" className="req">
                원재료 상태
              </label>
              <div
                className={`box_inp ${
                  errors.evi_material_status ? "error" : ""
                }`}
              >
                <select
                  id="evi_material_status"
                  disabled={isReadOnly}
                  {...register("evi_material_status", {
                    required: "필수 입력항목입니다.",
                  })}
                >
                  <option value="">--- 선택 ---</option>
                  {MATERIAL_STATUS?.map((el) => (
                    <option key={el.value} value={el.value}>
                      {el.label}
                    </option>
                  ))}
                </select>
                {errors.evi_material_status && (
                  <ErrorTxt>{errors.evi_material_status.message}</ErrorTxt>
                )}
              </div>
            </div>
          </div>
        </div>
        <h2>원재료 유형</h2>
        <div className="line line3">
          <div className="field field1">
            <label htmlFor="mci_large" className="req">
              분류 선택
            </label>
            <div className={`box_inp ${errors.mci_large ? "error" : ""}`}>
              <select
                id="mci_large"
                disabled={isReadOnly}
                {...register("mci_large", { required: "필수 입력항목입니다." })}
              >
                <option value="">대분류 선택</option>
                {CATEGORY1?.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
              {errors.mci_large && (
                <ErrorTxt>{errors.mci_large.message}</ErrorTxt>
              )}
            </div>
            <div className={`box_inp ${errors.mci_middle ? "error" : ""}`}>
              <select
                id="mci_middle"
                disabled={isReadOnly}
                {...register("mci_middle", {
                  required: "필수 입력항목입니다.",
                })}
              >
                <option value="">중분류 선택</option>
                {CATEGORY2?.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
              {errors.mci_middle && (
                <ErrorTxt>{errors.mci_middle.message}</ErrorTxt>
              )}
            </div>
            <div className={`box_inp ${errors.mci_small ? "error" : ""}`}>
              <select
                id="mci_small"
                disabled={isReadOnly}
                {...register("mci_small", { required: "필수 입력항목입니다." })}
              >
                <option value="">소분류 선택</option>
                {CATEGORY3?.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
              {errors.mci_small && (
                <ErrorTxt>{errors.mci_small.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <div className="line line2">
          <div className="field field1">
            <label htmlFor="evi_material_product_type" className="req">
              상품 구분
            </label>
            <div
              className={`box_inp ${
                errors.evi_material_product_type ? "error" : ""
              }`}
            >
              <select
                id="evi_material_product_type"
                disabled={isReadOnly}
                {...register("evi_material_product_type", {
                  required: "필수 입력항목입니다.",
                })}
              >
                <option value="">--- 선택 ---</option>
                {PRODUCT_TYPE.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>

              {errors.evi_material_product_type && (
                <ErrorTxt>{errors.evi_material_product_type.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>

        <div className="line line4">
          <div className="field field1">
            <label htmlFor="evi_material_storage_type" className="req">
              보관 구분
            </label>
            <div
              className={`box_inp ${
                errors.evi_material_storage_type ? "error" : ""
              }`}
            >
              <select
                id="evi_material_storage_type"
                disabled={isReadOnly}
                {...register("evi_material_storage_type", {
                  required: "필수 입력항목입니다.",
                })}
              >
                <option value="">--- 선택 ---</option>
                {STORAGE_TYPE.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
              {errors.evi_material_storage_type && (
                <ErrorTxt>{errors.evi_material_storage_type.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <div className="line line4">
          <div className="field field1">
            <label htmlFor="evi_material_sale_brand" className="req">
              판매브랜드(매장별)
            </label>
            <div
              className={`box_inp ${
                errors.evi_material_sale_brand ? "error" : ""
              }`}
            >
              <Controller
                name="evi_material_sale_brand"
                control={control}
                defaultValue={[]}
                rules={{ required: "필수 입력항목입니다." }}
                render={({ field }) => (
                  <MultiSelectWithBadges
                    options={SALE_BRAND}
                    selectedOptions={SALE_BRAND.filter((opt) =>
                      field.value.includes(opt.value)
                    )}
                    onChange={(selected) =>
                      field.onChange(selected.map((opt) => opt.value))
                    }
                    isDisabled={isReadOnly}
                  />
                )}
              />
              {errors.evi_material_sale_brand && (
                <ErrorTxt>{errors.evi_material_sale_brand.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <div className="line line5">
          <div className="field field1">
            <label htmlFor="material_name_ko" className="req">
              원재료명 (국내)
            </label>
            <div
              className={`box_inp ${errors.material_name_ko ? "error" : ""}`}
            >
              <input
                type="text"
                id="material_name_ko"
                className="inp"
                placeholder=""
                disabled={isReadOnly}
                {...register("material_name_ko", {
                  required: "필수 입력항목입니다.",
                })}
              />
              {errors.material_name_ko && (
                <ErrorTxt>{errors.material_name_ko.message}</ErrorTxt>
              )}
            </div>
          </div>
          <div className="field field2">
            <label htmlFor="material_name_en" className="">
              원재료명 (국외)
            </label>
            <div
              className={`box_inp ${errors.material_name_en ? "error" : ""}`}
            >
              <input
                type="text"
                id="material_name_en"
                className="inp"
                placeholder=""
                disabled={isReadOnly}
                {...register("material_name_en")}
              />
              {errors.material_name_en && (
                <ErrorTxt>{errors.material_name_en.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>

        <h2>상세 정보</h2>
        <div className="line line6">
          <div className="field field1">
            <label htmlFor="evi_material_trade_unit" className="req">
              거래 수량
            </label>
            <div
              className={`box_inp ${
                errors.evi_material_trade_unit ? "error" : ""
              }`}
            >
              <select
                id="evi_material_trade_unit"
                disabled={isReadOnly}
                {...register("evi_material_trade_unit", {
                  required: "필수 입력항목입니다.",
                })}
              >
                <option value="">--- 선택 ---</option>
                {TRADE_UNIT.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
              {errors.evi_material_trade_unit && (
                <ErrorTxt>{errors.evi_material_trade_unit.message}</ErrorTxt>
              )}
            </div>
            <div
              className={`box_inp ${errors.material_trade_qty ? "error" : ""}`}
            >
              <input
                type="text"
                id="material_trade_qty"
                className="inp"
                placeholder="0"
                disabled={isReadOnly}
                onFocus={handleFocus}
                {...register("material_trade_qty", {
                  required: "필수 입력항목입니다.",
                })}
              />
              {errors.material_trade_qty && (
                <ErrorTxt>{errors.material_trade_qty.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>

        <div className="line line7">
          <div className="field field1">
            <label htmlFor="evi_material_spec_unit" className="req">
              원재료 규격
            </label>
            <div
              className={`box_inp ${
                errors.evi_material_spec_unit ? "error" : ""
              }`}
            >
              <select
                id="evi_material_spec_unit"
                disabled={isReadOnly}
                {...register("evi_material_spec_unit", {
                  required: "필수 입력항목입니다.",
                })}
              >
                <option value="">--- 선택 ---</option>
                {SPEC_UNIT.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
              {errors.evi_material_spec_unit && (
                <ErrorTxt>{errors.evi_material_spec_unit.message}</ErrorTxt>
              )}
            </div>
            <div
              className={`box_inp ${errors.material_spec_qty ? "error" : ""}`}
            >
              <input
                type="text"
                id="material_spec_qty"
                className="inp"
                placeholder="0"
                disabled={isReadOnly}
                onFocus={handleFocus}
                {...register("material_spec_qty", {
                  required: "필수 입력항목입니다.",
                })}
              />
              {errors.material_spec_qty && (
                <ErrorTxt>{errors.material_spec_qty.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>

        <div className="line line10">
          <div className="field field1">
            <label htmlFor="purchase_price" className="req">
              매입가
            </label>
            <div className={`box_inp ${errors.purchase_price ? "error" : ""}`}>
              <span className="wrap_txt_inp">
                <input
                  type="text"
                  id="purchase_price"
                  className="inp"
                  placeholder="0"
                  disabled={isReadOnly}
                  onFocus={handleFocus}
                  {...register("purchase_price", {
                    required: "필수 입력항목입니다.",
                    validate: (value) =>
                      Number(value) !== 0 || "필수 입력항목입니다.",
                  })}
                />
                <span className="txt_addition">원(KRW)</span>
              </span>
              {errors.purchase_price && (
                <ErrorTxt>{errors.purchase_price.message}</ErrorTxt>
              )}
            </div>
          </div>
          <div className="field field2">
            <label htmlFor="purchase_cost" className="req">
              매입 원가
            </label>
            <div className={`box_inp ${errors.purchase_cost ? "error" : ""}`}>
              <span className="wrap_txt_inp">
                <input
                  type="text"
                  id="purchase_cost"
                  className="inp"
                  placeholder=""
                  disabled={pageMode === "view" || isPurchaseCostDisable}
                  {...register("purchase_cost", {
                    required: "필수 입력항목입니다.",
                  })}
                />
                <span className="txt_addition">원(KRW)</span>
              </span>
              {errors.purchase_cost && (
                <ErrorTxt>{errors.purchase_cost.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <div className="line line11">
          <div className="field field1">
            <label htmlFor="sale_price" className="req">
              판매가
            </label>
            <div className={`box_inp ${errors.sale_price ? "error" : ""}`}>
              <span className="wrap_txt_inp">
                <input
                  type="text"
                  id="sale_price"
                  className="inp"
                  placeholder="0"
                  disabled={isReadOnly}
                  onFocus={handleFocus}
                  {...register("sale_price", {
                    required: "필수 입력항목입니다.",
                    validate: (value) =>
                      Number(value) !== 0 || "필수 입력항목입니다.",
                  })}
                />
                <span className="txt_addition">원(KRW)</span>
              </span>
              {errors.sale_price && (
                <ErrorTxt>{errors.sale_price.message}</ErrorTxt>
              )}
            </div>
          </div>
          <div className="field field2">
            <label htmlFor="sale_cost" className="req">
              판매 원가
            </label>
            <div className={`box_inp ${errors.sale_cost ? "error" : ""}`}>
              <span className="wrap_txt_inp">
                <input
                  type="text"
                  id="sale_cost"
                  className="inp"
                  placeholder=""
                  disabled={pageMode === "view" || isSaleCostDisable}
                  {...register("sale_cost", {
                    required: "필수 입력항목입니다.",
                  })}
                />
                <span className="txt_addition">원(KRW)</span>
              </span>
              {errors.sale_cost && (
                <ErrorTxt>{errors.sale_cost.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>

        <div className="line line12">
          <div className="field field1">
            <label htmlFor="evi_taxable" className="req">
              과세 대상
            </label>
            <div className={`box_inp ${errors.evi_taxable ? "error" : ""}`}>
              <Controller
                name="evi_taxable"
                control={control}
                rules={{ required: "필수 입력항목입니다." }}
                render={({ field: { onChange, value, ref, ...restField } }) => (
                  <RadioGroup
                    {...restField}
                    defaultValue={initialData?.evi_taxable || "1"}
                    onChange={onChange}
                    options={TAXABLE}
                    disabled={isReadOnly}
                  />
                )}
              />
              {errors.evi_taxable && (
                <ErrorTxt>{errors.evi_taxable.message}</ErrorTxt>
              )}
            </div>
          </div>

          <div className="field field2">
            <label htmlFor="evi_vat" className="req">
              VAT
            </label>
            <div className={`box_inp ${errors.evi_vat ? "error" : ""}`}>
              <Controller
                name="evi_vat"
                control={control}
                rules={{ required: "필수 입력항목입니다." }}
                render={({ field: { onChange, value, ref, ...restField } }) => (
                  <RadioGroup
                    {...restField}
                    defaultValue={initialData?.evi_vat || "1"}
                    onChange={onChange}
                    options={VAT}
                    disabled={isReadOnly}
                  />
                )}
              />
              {errors.evi_vat && <ErrorTxt>{errors.evi_vat.message}</ErrorTxt>}
            </div>
          </div>
        </div>
        <h2>추가 정보</h2>
        <div className="line line8">
          <div className="field field1">
            <label htmlFor="material_config_qty">입수량</label>
            <div
              className={`box_inp ${errors.material_config_qty ? "error" : ""}`}
            >
              <span className="wrap_txt_inp">
                <input
                  type="text"
                  id="material_config_qty"
                  className="inp"
                  placeholder="0"
                  disabled={isReadOnly}
                  onFocus={handleFocus}
                  {...register("material_config_qty")}
                />
                <span className="txt_addition">개</span>
              </span>
              {errors.material_config_qty && (
                <ErrorTxt>{errors.material_config_qty.message}</ErrorTxt>
              )}
            </div>
          </div>
          <div className="field field2">
            <label htmlFor="minimal_purchase_qty">최소 구매수량</label>
            <div
              className={`box_inp ${
                errors.minimal_purchase_qty ? "error" : ""
              }`}
            >
              <span className="wrap_txt_inp">
                <input
                  type="text"
                  id="minimal_purchase_qty"
                  className="inp"
                  placeholder="0"
                  disabled={isReadOnly}
                  onFocus={handleFocus}
                  {...register("minimal_purchase_qty")}
                />
                <span className="txt_addition">BOX</span>
              </span>
              {errors.minimal_purchase_qty && (
                <ErrorTxt>{errors.minimal_purchase_qty.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <div className="line line9">
          <div className="field field1">
            <label htmlFor="estimate_price">견적가</label>
            <div className={`box_inp ${errors.estimate_price ? "error" : ""}`}>
              <span className="wrap_txt_inp">
                <input
                  type="text"
                  id="estimate_price"
                  className="inp"
                  placeholder="0"
                  disabled={isReadOnly}
                  onFocus={handleFocus}
                  {...register("estimate_price")}
                />
                <span className="txt_addition">원(KRW)</span>
              </span>
              {errors.estimate_price && (
                <ErrorTxt>{errors.estimate_price.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
        <div className="line line13">
          <div className="field field1">
            <label htmlFor="pci_manufacturer">거래처</label>
            <div
              className={`box_inp ${errors.pci_manufacturer ? "error" : ""}`}
            >
              <Controller
                name="pci_manufacturer"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      options={PARTNER}
                      selectedOption={field.value}
                      setSelectedOption={field.onChange}
                      placeholder="예 : 태원"
                      isDisabled={isReadOnly}
                    />
                  );
                }}
              />
              {errors.pci_manufacturer && (
                <ErrorTxt>{String(errors.pci_manufacturer.message)}</ErrorTxt>
              )}
            </div>
          </div>

          <div className="field field2">
            <label htmlFor="evi_country">원산지</label>
            <div className={`box_inp ${errors.evi_country ? "error" : ""}`}>
              <Controller
                name="evi_country"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <MultiSelectWithBadges
                    options={COUNTRY}
                    selectedOptions={COUNTRY.filter((opt) =>
                      field.value.includes(opt.value)
                    )}
                    onChange={(selected) =>
                      field.onChange(selected.map((opt) => opt.value))
                    }
                    isDisabled={isReadOnly}
                  />
                )}
              />
              {errors.evi_country && (
                <ErrorTxt>{String(errors.evi_country.message)}</ErrorTxt>
              )}
            </div>
          </div>
        </div>

        <div className="line line14">
          <div className="field field1">
            <label htmlFor="purchase_place">매입처</label>
            <div className={`box_inp ${errors.purchase_place ? "error" : ""}`}>
              <input
                type="text"
                id="purchase_place"
                className="inp"
                placeholder=""
                disabled={isReadOnly}
                {...register("purchase_place")}
              />
              {errors.purchase_place && (
                <ErrorTxt>{errors.purchase_place.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>

        <div className="line line15">
          <div className="field field1">
            <label htmlFor="material_description" className="">
              원재료 설명
            </label>
            <div
              className={`box_inp ${
                errors.material_description ? "error" : ""
              }`}
            >
              <textarea
                id="material_description"
                placeholder="원재료에 대한 설명 입력"
                disabled={isReadOnly}
                {...register("material_description")}
              />
              {errors.material_description && (
                <ErrorTxt>{errors.material_description.message}</ErrorTxt>
              )}
            </div>
          </div>
        </div>
      </FormWrap>
    </PageLayout>
  );
};

export default MaterialForm;
