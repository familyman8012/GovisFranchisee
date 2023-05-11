import styled from "@emotion/styled";
import React from "react";

const QunityControlWrap = styled.div`
  display: flex;

  button {
    width: 37px;
    height: 37px;
    text-align: center;
    line-height: 37px;
    color: #e3e3e3;
    font-family: "icomoon" !important;
    font-size: 13px;
    border: 1px solid #e3e3e3;
    cursor: pointer;
  }

  .btn_minus {
    order: 1;
    border-right: 0;
    &:before {
      content: "\\e9ad";
    }
  }
  .btn_add {
    order: 3;
    border-left: 0;
    &:before {
      content: "\\e9ac";
    }
  }
  input {
    order: 2;
    width: 40px;
    height: 37px;
    text-align: center;
    font-size: 14px;
    line-height: 14px;
    border: 1px solid #ddd;
  }
`;

function QuanityControl() {
  return (
    <QunityControlWrap>
      <input
        type="number"
        className="productQuantity"
        value="1"
        min="1"
        autoComplete="off"
      />
      <button className="btn_add">
        <span className="hiddenZoneV">add</span>
      </button>
      <button className="btn_minus">
        <span className="hiddenZoneV">minus</span>
      </button>
    </QunityControlWrap>
  );
}

export default QuanityControl;
