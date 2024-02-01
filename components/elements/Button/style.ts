import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { lighten, rgba } from "polished";

import { PALLETES, TColor } from "LibFarm/color";

export interface ButtonStyleProps {
  icon?: boolean;
  clear?: boolean;
  block?: boolean;
  outline?: boolean;
  disabled?: boolean;
  size?: string;
  textColor?: TColor;
  color?: TColor;
}

const active = `&:hover,&:focus`;
const colorKeys = Object.keys(PALLETES);

const defaultColor = (color: string, bg: string) => css`
  color: ${color};
  background: ${bg};

  ${active} {
    color: ${lighten(0.08, color)};
    background: ${lighten(0.08, bg)};
  }

  &:disabled {
    background: ${PALLETES["typo-6"]} !important;
    color: ${PALLETES["typo-4"]} !important;
    border-color: transparent !important;
    box-shadow: none !important;
    cursor: not-allowed !important;
  }
`;

const clearColor = (color: string) => css`
  color: ${color};
  background: ${rgba(color, 0)};

  ${active} {
    color: ${color};
    background: ${rgba(color, 0.2)};
  }

  &:disabled {
    background: transparent !important;
    color: ${PALLETES["typo-4"]} !important;
    border-color: transparent !important;
    box-shadow: none !important;
    cursor: not-allowed !important;
  }
`;

const outlineColor = (color: string) => css`
  color: ${color};
  background: ${rgba(color, 0)};
  border: 1px solid currentColor;
  box-shadow: none;

  ${active} {
    color: ${color};
    background: ${rgba(color, 0.2)};
  }

  &:disabled {
    background: transparent !important;
    color: ${PALLETES["typo-4"]} !important;
    box-shadow: none !important;
    cursor: not-allowed !important;
  }
`;

const colorStyle = (props: ButtonStyleProps) => {
  const isInKeyColor = colorKeys.includes(props.color ?? "");
  const isInKeyTextColor = colorKeys.includes(props.color ?? "");
  const color = isInKeyColor
    ? PALLETES[props.color as keyof typeof PALLETES]
    : props.color;
  const textColor = isInKeyTextColor
    ? PALLETES[props.textColor as keyof typeof PALLETES]
    : props.textColor;

  return css`
    ${props.clear
      ? clearColor(color ?? PALLETES["black"])
      : props.outline
      ? outlineColor(color ?? PALLETES["black"])
      : defaultColor(
          color
            ? textColor ?? PALLETES["white"]
            : textColor ?? PALLETES["black"],
          color ?? PALLETES["white"]
        )}
  `;
};

export const Button = styled.button`
  display: ${(props) => (props.block ? "flex" : "inline-flex")};
  position: relative;
  appearance: none;
  border: 0;
  border-radius: 0.4rem;
  font-weight: ${(props) => (props.size === "sm" ? "500" : "bold")};
  justify-content: center;
  align-items: center;

  box-shadow: ${(props) =>
    props.clear ? "none" : "0px 2px 4px 0px rgba(0, 0, 0, 0.1)"};
  cursor: pointer;
  ${(props) =>
    props.icon
      ? `
        min-width: auto;
        width: ${props.size === "sm" ? "30px" : "39px"};
        height: ${props.size === "sm" ? "30px" : "39px"};;
        padding: 0;
        svg {
          width: ${props.size === "sm" ? "1.125rem" : "1.5rem"};
          height: ${props.size === "sm" ? "1.125rem" : "1.5rem"};
        }
      `
      : `
        min-width: ${props.size === "sm" ? "56px" : "78px"};
        width: ${props.block ? "100%" : "auto"};
        height: ${props.size === "sm" ? "32px" : "39px"};
        padding: 0.5rem 0.75rem;
        svg {
          width: 1rem;
          height: 1rem;
        }
  `}

  transition: opacity 0.35s, color 0.35s ease-out, background 0.35s ease-out;
  font-size: ${(props) => (props.size === "sm" ? "1.3rem" : "1.4rem")};

  > * {
    line-height: 1;
  }

  > * + * {
    margin-left: 0.5rem;
  }

  ${colorStyle}
`;
