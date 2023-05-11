import React from "react";
import { BankTransferWrap } from "./style";

function BankTransfer() {
  return (
    <BankTransferWrap>
      <div className="box_inp">
        <label>입금자</label>
        <input type="text" name="banktransfer_user" value="윤은석" />
        <label>입금 계좌</label>
        <select>
          <option>선택하세요.</option>
          <option>신한은행</option>
        </select>
      </div>
    </BankTransferWrap>
  );
}

export default BankTransfer;
