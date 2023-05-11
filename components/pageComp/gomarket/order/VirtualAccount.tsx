import React from "react";
import { VirtualAccountWrap } from "./style";

function VirtualAccount() {
  return (
    <VirtualAccountWrap>
      <h4>환불 계좌</h4>
      <div className="box_inp">
        <div className="box_refund_account">
          <select>
            <option>선택하세요.</option>
            <option>신한은행</option>
          </select>
          <input type="text" name="refund_user" value="윤은석" />
        </div>
        <input type="text" name="account_address" value="110****" />
      </div>
    </VirtualAccountWrap>
  );
}

export default VirtualAccount;
