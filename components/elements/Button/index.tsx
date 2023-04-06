import React from "react";

import { TColor } from "LibFarm/color";

import { XLg } from "@emotion-icons/bootstrap/XLg";
import { ChevronLeft } from "@emotion-icons/bootstrap/ChevronLeft";
import { Shop } from "@emotion-icons/bootstrap/Shop";

import { Button as StyleButton } from "./style";

export interface ButtonProps {
  ref?: any;
  type?: "button" | "submit" | "reset";
  textColor?: TColor;
  color?: TColor;
  children?: React.ReactNode;
  className?: string;
  clear?: boolean;
  block?: boolean;
  outline?: boolean;
  disabled?: boolean;
  reverse?: boolean;
  size?: "sm";
  style?: React.CSSProperties;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseDown?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseUp?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface IconButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  ref,
  type,
  disabled,
  className,
  onClick,
  leftIcon,
  rightIcon,
  children,
  ...props
}) => (
  <StyleButton {...props} ref={ref} className={className} type={type} disabled={disabled} onClick={onClick}>
    {leftIcon ? leftIcon : ""}
    <span>{children}</span>
    {rightIcon ? rightIcon : ""}
  </StyleButton>
);

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { icon, ...buttonProps } = props;
  return (
    <StyleButton {...buttonProps} icon={!!icon}>
      {props.icon}
      {props.children}
    </StyleButton>
  );
};

export const StoreButton: React.FC<IconButtonProps> = (props) => {
  const { ...buttonProps } = props;
  return (
    <Button type="button" leftIcon={<Shop />} {...buttonProps}>
      매장
    </Button>
  );
};

export const CloseButton: React.FC<IconButtonProps> = (props) => {
  const { ...buttonProps } = props;
  return (
    <IconButton {...buttonProps} icon={<XLg />} size="sm">
      {props.children}
    </IconButton>
  );
};

export const BackButton: React.FC<IconButtonProps> = (props) => {
  const { ...buttonProps } = props;
  return (
    <IconButton {...buttonProps} icon={<ChevronLeft />} size="sm">
      {props.children}
    </IconButton>
  );
};
