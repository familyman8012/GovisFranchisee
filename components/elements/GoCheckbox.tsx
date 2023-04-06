import React, { SyntheticEvent } from "react";
import { Check, ListCheck } from "./style";

interface ICheckBox {
  id: string;
  label: string;
  register?: object;
  onChange?: any;
  className?: string;
  checked?: boolean;
}

interface IListCheckBOx {
  id: string;
  label: string;
  register?: object;
  register2?: object;
  selesctValue?: string;
  value?: number;
  onChange?: (e: SyntheticEvent) => void;
  className?: string;
  checked?: boolean;
}

export function GoCheckBox({ id, label, register, onChange, className = "default" }: ICheckBox) {
  return (
    <Check className={className}>
      {register ? (
        <input type="checkbox" id={id} {...register} />
      ) : (
        <input type="checkbox" id={id} onChange={(e) => onChange(e.currentTarget.checked, id)} />
      )}
      <label htmlFor={id}>{label}</label>
    </Check>
  );
}

export function ListCustomCheckBox({ id, label, value, register, register2, className }: IListCheckBOx) {
  return (
    <ListCheck className={className}>
      <Check className="default">
        <input type="checkbox" id={id} {...register} value={value} />
        <label htmlFor={id}>{label}</label>
      </Check>
      {label.includes("기타") && (
        <div className="box_inp_text">
          <label>사유</label>
          <input type="text" placeholder="사유를 입력하세요." autoComplete="off" {...register2} />
        </div>
      )}
    </ListCheck>
  );
}

export default GoCheckBox;
