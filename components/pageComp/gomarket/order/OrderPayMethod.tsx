import React, { useState } from "react";
import VirtualAccount from "./VirtualAccount";
import { OrderPayMethodWrap } from "./style";
import BankTransfer from "./BankTransfer";

function OrderPayMethod() {
  const [method, setMethod] = useState(0);

  const paymentMethods = [
    { id: 0, label: "신용 / 체크카드" },
    { id: 1, label: "계좌 이체" },
    { id: 2, label: "가상 계좌" },
    { id: 3, label: "무통장 입금" },
  ];

  const handlePaymentChange = (event: any) => {
    setMethod(Number(event.target.value));
  };

  return (
    <OrderPayMethodWrap>
      <h3>결제 방법</h3>
      <ul className="list_payment_method">
        {paymentMethods.map((paymentMethod) => (
          <li key={paymentMethod.id}>
            <input
              type="radio"
              id={`payment${paymentMethod.id + 1}`}
              name="payment"
              value={paymentMethod.id}
              checked={method === paymentMethod.id}
              onChange={handlePaymentChange}
            />
            <label htmlFor={`payment${paymentMethod.id + 1}`}>
              {paymentMethod.label}
            </label>
          </li>
        ))}
      </ul>
      <div className="add_control">
        {method === 2 && <VirtualAccount />}
        {method === 3 && <BankTransfer />}
      </div>
    </OrderPayMethodWrap>
  );
}

export default OrderPayMethod;
