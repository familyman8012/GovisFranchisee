import React, { RefObject, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";

import { ExclamationTriangleFill } from "@emotion-icons/bootstrap/ExclamationTriangleFill";

import style from "StyleFarm/scss/modules/Coupon.module.scss";
import useSyncedRef from "HookFarm/useSyncedRef";
import { toClasses } from "LibFarm/toClasses";
import { PALLETES } from "LibFarm/color";

import { Container, Form, FormControl } from "ComponentsFarm/layouts/styles";
import { Button } from "ComponentsFarm/elements/Button";

const CouponFormError = (errorText: string) => {
  return (
    <p className={style["coupon-form__error"]}>
      <ExclamationTriangleFill />
      {errorText}
    </p>
  );
};

interface CouponFormProps {
  reset?: boolean;
  disabled?: boolean;
  onSubmit: (couponCode: string) => void;
  onReset: () => void;
  invalid?: Error;
}

const CouponForm: React.FC<CouponFormProps> = ({ reset, disabled, invalid, onSubmit, onReset }) => {
  const { register, handleSubmit, formState, resetField } = useForm({
    defaultValues: {
      couponCode: "",
    },
  });

  const forms = useMemo(
    () => ({
      couponCode: register("couponCode", {
        required: "쿠폰번호를 입력해 주세요.",
      }),
    }),
    [register]
  );

  const couponInputRef = useSyncedRef<HTMLInputElement>(forms.couponCode.ref);

  const error = useMemo(() => {
    return (formState.errors && formState.errors.couponCode) || (invalid ? invalid : null);
  }, [formState, invalid]);
  const handleFormSubmit = handleSubmit((data) => !disabled && onSubmit(data.couponCode));

  /**
   * @desc 쿠폰 페이지 진입 OR window focus시 쿠폰 입력에 자동으로 포커스 될 수 있도록 조치
   */
  useEffect(() => {
    couponInputRef.current?.focus();
    const handleWindowFocus = () => couponInputRef.current?.focus();
    window.addEventListener("focus", handleWindowFocus);
    return () => window.removeEventListener("focus", handleWindowFocus);
  }, [forms]);

  useEffect(() => {
    if (!reset) return;
    resetField("couponCode");
    onReset();
  }, [reset]);

  return (
    <Form className={`coupon-form m-0`} onSubmit={handleFormSubmit}>
      <Container className={`${style["coupon-form__wrapper"]}`}>
        <label className={toClasses([style["coupon__label"], error ? style["coupon__label--error"] : ""])}>
          쿠폰번호 등록
        </label>
        <FormControl
          {...forms.couponCode}
          ref={couponInputRef}
          type="text"
          name="couponCode"
          autoComplete="off"
          placeholder="이곳에 쿠폰번호를 입력하세요."
          className={`coupon-form__input ${error ? "coupon-form__input--error" : ""}`}
        />
        <Button disabled={disabled} color="primary-3" className={`coupon-form__submit`}>
          확인
        </Button>
        {error && CouponFormError(error.message ?? "")}
      </Container>
    </Form>
  );
};

export default CouponForm;
