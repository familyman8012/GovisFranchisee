import styled from "@emotion/styled";
import { CartWrap } from "../cart/style";
import { mq } from "../reset";

export const OrderInfoWrap = styled.section`
  max-width: 928px;
  margin: 0 auto;
  font-size: 14px;

  h2 {
    padding: 25px 0;
  }

  h3 {
    margin-bottom: 40px;
    font-size: 20px;
    font-weight: bold;
    line-height: 32px;
  }

  ${CartWrap} {
    margin-bottom: 70px;
  }
`;

export const InfoArea = styled.div`
  display: flex;
  ${mq[0]} {
    display: block;
  }
  .box_order,
  .box_payment {
    width: 43%;
  }

  .box_order {
    margin-right: 14%;
  }

  .list_info {
    li {
      display: flex;
      align-items: center;
      padding: 25px 0;
      border-bottom: 1px solid #ddd;

      > span:nth-of-type(1) {
        width: 40%;
      }

      .state {
        display: flex;
        align-items: center;
        width: 60%;

        &.on {
          display: block;
        }

        .form-group {
          margin-bottom: 0;
          .box_btn {
            display: flex;
            width: 100% !important;
            button {
              width: calc(50% - 10px);
              min-width: auto;
            }
          }
        }
        .state_control {
          margin-left: auto;

          .btn_cancle {
            width: 94px;
            height: 51px;
            margin-left: 10px;
            padding: 0 20px;
            color: #4053ff;
            font-size: 14px;
            border-radius: 6px;
            border: 1px solid #4053ff;
            cursor: pointer;
          }

          .box_btn {
            display: flex;
            margin-top: 20px;
            button {
              min-width: calc(50% - 10px);
            }
          }
        }
      }
    }
  }
  .form-group section {
    margin-top: 70px;
    padding: 0;
    border-bottom: 0;

    .box_order_request_message {
      padding-top: 0;
      border-top: none;
    }
  }

  ${mq[0]} {
    display: block;
    .box_order,
    .box_payment {
      width: 100%;
    }
    .box_payment {
      margin-top: 70px;
    }
  }
`;
