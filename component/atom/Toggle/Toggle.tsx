import React, { HTMLAttributes } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useSyncedRef from "HookFarm/useSyncedRef";

type TVariant = "primary" | "red" | "green";

interface Props extends Omit<HTMLAttributes<HTMLInputElement>, "type"> {
  className?: string;
  checked?: boolean;
  loading?: boolean;
  disabled?: boolean;
  variant?: TVariant;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type StyleProps = { variant?: TVariant };

const variantStyle = (props: StyleProps) => {
  if (props.variant === "red") {
    return css`
      input:checked + .slider {
        background-color: var(--color-red60);
      }
    `;
  }

  if (props.variant === "green") {
    return css`
      input:checked + .slider {
        background-color: var(--color-green400);
      }
    `;
  }

  return css`
    input:checked + .slider {
      background-color: var(--color-blue60);
    }
  `;
};

const ToggleStyle = styled.label<StyleProps>`
  position: relative;
  display: inline-flex;
  width: 3.6rem;
  height: 2rem;
  cursor: pointer;
  margin: 0;

  &.disabled,
  &.loading {
    cursor: not-allowed;
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: inherit;
    background-color: var(--color-gray4);
    border-radius: 11px;
    transition: all 0.3s ease;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.6rem;
    width: 1.6rem;
    left: 0.2rem;
    bottom: 0.2rem;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0px 2px 1px rgba(16, 24, 40, 0.06);
    background-color: var(--color-gray2);
  }

  input:checked + .slider {
    background-color: var(--color-blue60);
  }

  input:checked + .slider:before {
    transform: translateX(calc(3.6rem - 2rem));
  }

  ${variantStyle}
`;

const Toggle = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      checked,
      loading,
      onChange,
      className,
      disabled,
      variant = "primary",
      ...otherProps
    },
    ref
  ) => {
    const refs = useSyncedRef<HTMLInputElement>(ref);

    return (
      <ToggleStyle
        className={`${loading ? "loading" : ""} ${disabled ? "disabled" : ""} ${
          className ?? ""
        }`}
        variant={variant}
      >
        <input
          ref={refs}
          {...otherProps}
          type="checkbox"
          checked={checked}
          disabled={loading || disabled}
          onChange={(e) => !loading && onChange?.(e)}
        />
        <span className="slider" />
      </ToggleStyle>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;
