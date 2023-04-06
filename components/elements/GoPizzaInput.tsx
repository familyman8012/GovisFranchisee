import React, { ChangeEventHandler, SyntheticEvent } from "react";
import { Check, Radio, ListCheck, TextArea, ErrorTxt } from "./style";

interface ILabelText {
  type: string;
  label: string;
  register: any;
  errors: object;
}

export function LabelText({ type = "text", label, register, errors }: any) {
  return (
    <>
      <label>
        <div className="tit">{label}</div>
        <div className={errors[register.name] ? "error" : ""}>
          <input type={type} placeholder="필수 입력 사항입니다." autoComplete="off" {...register} />
        </div>
      </label>
      {errors[register.name] && errors[register.name].type === "required" && <ErrorTxt>필수 입력 사항입니다.</ErrorTxt>}
    </>
  );
}

export function LabelTextArea({ label, register, errors }: any) {
  return (
    <>
      <label>
        <div className="tit">{label}</div>
        <div className={errors[register.name] ? "error" : ""}>
          <TextArea height={120} placeholder="상세내용을 입력해주세요." autoComplete="off" {...register} />
        </div>
      </label>
      {errors[register.name] && errors[register.name].type === "required" && <ErrorTxt>필수 입력 사항입니다.</ErrorTxt>}
    </>
  );
}
