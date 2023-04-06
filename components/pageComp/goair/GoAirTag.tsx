import React from "react";

import style from "StyleFarm/scss/modules/Goair.module.scss";

import { toClasses } from "LibFarm/toClasses";

import { IGoAirModule } from "InterfaceFarm/Goair";

interface GoAirTagProps {
  className?: string;
  label?: string;
  checked?: boolean;
  value: IGoAirModule;
  color?: "normal" | "error" | "warning";
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: (value: IGoAirModule) => void;
}

export const GoAirTag = React.forwardRef<any, GoAirTagProps>(
  ({ className, checked, value, label, color, onClick, onChange }, ref) => {
    return (
      <label
        className={toClasses([
          style["goair-tag"],
          checked ? style["goair-tag--checked"] : "",
          color ? style[`goair-tag--${color}`] : "",
          className,
        ])}
      >
        <input
          ref={ref}
          type={"checkbox"}
          checked={checked}
          onClick={onClick}
          onChange={() => onChange && onChange(value)}
        />
        <span className={style["goair-tag__label"]} title={label}>
          {label}
        </span>
      </label>
    );
  }
);

GoAirTag.displayName = "GoAirTag";
