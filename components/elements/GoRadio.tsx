import React, { ChangeEventHandler, SyntheticEvent } from "react";
import { Radio } from "./style";

interface ICustomInput {
  id: string;
  label: string;
  register?: object;
  selesctValue?: string;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  width?: string;
  height?: string;
  circleSize?: string;
  circleColor?: string;
  disabled?: boolean;
  roundBorder?: string;
}

export function GoRadio({
  id,
  label,
  register,
  selesctValue,
  value,
  onChange,
  className = "default",
  circleSize,
  circleColor,
  disabled,
  roundBorder,
}: ICustomInput) {
  return (
    <Radio className={className} circleSize={circleSize ? circleSize : ""} circleColor={circleColor ? circleColor : ""}>
      {register ? (
        <input type="radio" id={id} {...register} value={id} />
      ) : (
        <input
          type="radio"
          id={id}
          onChange={onChange}
          value={value}
          checked={selesctValue === String(value)}
          disabled={disabled ? disabled : false}
        />
      )}
      <label htmlFor={id}>
        {className === "default" && <span className="ico_chk"></span>}
        {label}
      </label>
    </Radio>
  );
}
