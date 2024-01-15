import styled from "@emotion/styled";
import { mq } from "ComponentsFarm/pageComp/mq";

export const OrderWrap = styled.div`
  max-width: 540px;
  margin: 0 auto;

  h2 {
    margin: 30px 0;
  }

  .order_production {
    .list {
      li {
        display: flex;

        .thumb {
          width: 86px;
          margin-right: 16px;
          cursor: pointer;
        }

        .product_info {
          .name {
            margin-bottom: 2px;
          }
          .option {
            color: #b7b7b7;
            font-size: 13px;
          }
          .box_price {
            margin-top: 8px;
          }
        }
      }
    }
    .total_product {
      display: flex;
      align-items: center;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #ececec;

      .tit {
        font-size: 16px;
      }
      .price {
        margin-left: auto;
        color: #4053ff;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
`;

export const OrderProductionWrap = styled.section`
  border-top: 5px solid #f6f6f6;

  .list {
    li {
      display: flex;

      .thumb {
        width: 86px;
        margin-right: 16px;
        cursor: pointer;
      }

      .product_info {
        .name {
          margin-bottom: 2px;
        }
        .option {
          color: #b7b7b7;
          font-size: 13px;
        }
        .box_price {
          margin-top: 8px;
        }
      }
    }
  }
  .total_product {
    display: flex;
    align-items: center;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid #ececec;

    .tit {
      font-size: 16px;
    }
    .price {
      margin-left: auto;
      color: #4053ff;
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

export const OrderPeopleWrap = styled.section``;
export const OrderAddressWrap = styled.section`
  .list_address {
    display: flex;
    margin-bottom: 24px;

    li:nth-of-type(2) {
      margin-left: 15px;
    }
  }

  .box_postnumber {
    display: flex;
    align-items: center;
  }

  button {
    height: 51px;
    margin-left: 10px;
    padding: 0 10px;
    color: #4053ff;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #4053ff;
    cursor: pointer;
  }

  .box_order_request_message {
    padding-top: 24px;
    border-top: 1px solid #ececec;
  }

  .txt_label {
    margin-bottom: 8px;
    font-size: var(--size-label);
  }
  .txt_input {
  }
`;
export const OrderPayInfoWrap = styled.section`
  .info-item {
    display: flex;
    align-items: center;
    padding-top: 24px;
  }
  .calc_price,
  .total_price {
    border-top: 1px solid #ececec;
  }
  .calc_price {
    .tit {
      font-size: 14px;
    }
    .price {
      font-size: 16px;
      margin-left: auto;
    }
  }
  .total_price {
    margin-top: 24px;
    .tit {
      font-size: 16px;
    }
    .price {
      margin-left: auto;
      color: #4053ff;
      font-size: 20px;
      font-weight: bold;
    }
  }
`;
export const OrderPayMethodWrap = styled.section`
  .list_payment_method {
    display: flex;
    flex-wrap: wrap;
    li {
      width: calc(50% - 5px);
      margin-bottom: 10px;
      padding: 16px 12px;
      border: 1px solid #ececec;
      border-radius: 6px;
      line-height: 16px;
      cursor: pointer;

      &:nth-of-type(odd) {
        margin-right: 5px;
      }
      &:nth-of-type(even) {
        margin-left: 5px;
      }
    }
  }
`;

export const PayBtn = styled.button`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 540px;
  margin-bottom: 16px;
  padding: 18px 20px;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  background: #000;
  ${mq[0]} {
    left: 0;
    bottom: 0;
    margin-bottom: 0;
    padding: 18px 0;
  }
`;

// 결제요청완료
export const CompleteWrap = styled.section`
  h2 {
    margin-bottom: 50px;
    text-align: center;
  }
  .box_inp {
    margin-bottom: 20px;
    .txt_label {
      margin-bottom: 8px;
      font-size: var(--size-label);
    }
    .txt_input {
      flex: 1 1 auto;
      padding: 13px 16px;
      border-radius: 6px;
      border: 1px solid var(--color-lightGray);
      font-size: var(--size-formInput);
      background: #fbfbfb;
    }
  }

  a {
    display: block;
    max-width: 50%;
    margin: 70px auto 0;
    padding: 18px 20px;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    background: #000;
  }
`;

export const VirtualAccountWrap = styled.div`
  h4 {
    margin: 14px 0 8px;
    font-size: 14px;
  }
  .box_refund_account {
    display: flex;
    margin-bottom: 16px;

    select {
      margin-right: 5px;
    }
  }
`;

export const BankTransferWrap = styled.div`
  margin-bottom: 20px;
  label {
    padding-top: 14px;
  }
  select {
    background-image: linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%) !important;
  }
`;
