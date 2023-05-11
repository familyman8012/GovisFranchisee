import styled from "@emotion/styled";
import React, { useState } from "react";

export const CustomSelectWrap = styled.div`
  position: relative;
  display: inline-block;
  min-width: 80px;
  max-width: 100%;
  padding: 9px 11px 9px 15px;
  font-size: 14px;
  border: 1px solid #ddd;

  .selected_option {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:after {
      position: relative;
      top: 2px;
      content: "\\e970";
      font-family: "icomoon";
      margin-left: 15px;
    }
  }

  .layer {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 9;
    min-width: 250px;
    max-width: 100%;
    margin-top: -1px;
    border: 1px solid #e3e3e3;
    background-color: white;

    .item {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.03);
      }

      .name {
        display: flex;
        flex-grow: 1;
        padding: 9px 15px 9px 15px;
        word-break: break-all;
        text-align: left;
      }

      .item_price {
        padding-right: 15px;
      }
    }
  }
`;

function CustomSelect() {
  const [showLayer, setShowLayer] = useState(false);

  return (
    <CustomSelectWrap>
      <div
        className="selected_option"
        onClick={() => setShowLayer((prev) => !prev)}
      >
        선택하세요.
      </div>
      {showLayer && (
        <div className="layer">
          <div className="item">
            <span className="name">선택하세요</span>
          </div>
          <div className="item">
            <span className="name">A4</span>
            <span className="item_price">(+1,500원)</span>
          </div>
        </div>
      )}
    </CustomSelectWrap>
  );
}

export default CustomSelect;
