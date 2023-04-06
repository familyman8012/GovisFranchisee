import style from "StyleFarm/scss/modules/Coupon.module.scss";
import { ExclamationTriangleFill } from "@emotion-icons/bootstrap/ExclamationTriangleFill";
import React from "react";
import { ErrorBox } from "./ComponentsSty";

interface iErrorMassageBox {
  massage: string;
}

export default function ErrorMassageBox({ massage }: iErrorMassageBox) {
  return (
    <>
      <ErrorBox>
        <p>
          <ExclamationTriangleFill />
          {massage}
        </p>
      </ErrorBox>
    </>
  );
}
