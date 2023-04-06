import styled from "@emotion/styled";
import { Container } from "ComponentsFarm/layouts/styles";

export const CouponWrap = styled.div`
  form > ${Container} {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    padding: 0 10.5px;
    flex: 1;

    .coupon-form__input {
      font-size: 1.5rem;
      height: 60px;
      flex: 1;
      width: 100%;
      font-weight: bold;
      color: #212529;
    }
    button {
      font-size: 1.5rem;
      height: 60px;
      flex: 0 0 auto;
      margin-left: 9px;
    }
  }
  .coupon-list {
    padding: 16px 20px 23px;
    max-width: 1320px;
  }
`;
