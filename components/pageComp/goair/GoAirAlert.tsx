import React from "react";

import { ExclamationCircle } from "@emotion-icons/bootstrap/ExclamationCircle";

import style from "StyleFarm/scss/modules/Goair.module.scss";
import { toClasses } from "LibFarm/toClasses";

interface GoAirAlertProps {
  text: string;
  color: "error" | "warning" | "normal";
}

export const GoAirAlert = ({ color, text }: GoAirAlertProps) => {
  return (
    <span className={toClasses([style["goair-alert"], style[`goair-alert--${color}`]])}>
      <ExclamationCircle />
      {text}
    </span>
  );
};
