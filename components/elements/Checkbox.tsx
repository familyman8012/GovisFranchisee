import React from "react";

import { toClasses } from "LibFarm/toClasses";
import { CheckCircleFill } from "@emotion-icons/bootstrap/CheckCircleFill";

interface FormCheckboxProps {
  className?: string;
  type: "checkbox" | "radio";
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string | number | unknown;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: (value: unknown) => void;
}

export const Checkbox = React.forwardRef<any, FormCheckboxProps>(
  (
    {
      type,
      className,
      checked,
      value,
      disabled,
      name,
      label,
      onClick,
      onChange,
      ...otherProps
    },
    ref
  ) => {
    return (
      <label
        className={toClasses([
          "gv-checkbox",
          checked ? "gv-checkbox--checked" : "",
          disabled ? "gv-checkbox--disabled" : "",
          className,
        ])}
      >
        <input
          {...otherProps}
          ref={ref}
          name={name}
          type={type}
          disabled={disabled}
          checked={checked}
          onClick={onClick}
          onChange={() => onChange && onChange(value)}
        />
        <CheckCircleFill className="gv-checkbox__icon" />
        <span className={"gv-checkbox__label"}>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export const FormCheckbox = React.forwardRef<
  any,
  Omit<FormCheckboxProps, "type">
>((props, ref) => <Checkbox {...props} ref={ref} type="checkbox" />);

FormCheckbox.displayName = "FormCheckbox";

export const FormRadio = React.forwardRef<any, Omit<FormCheckboxProps, "type">>(
  (props, ref) => <Checkbox {...props} ref={ref} type="radio" />
);

FormRadio.displayName = "FormRadio";
