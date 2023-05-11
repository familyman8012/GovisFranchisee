import styled from "@emotion/styled";
import { mq } from "ComponentsFarm/pageComp/mq";

export const CartWrap = styled.div`
  font-size: 14px;

  h2 {
    margin: 10px 0;
  }

  .list_title,
  .list li {
    display: flex;
    > span,
    .cell {
      display: flex;
      &:not(&:nth-of-type(1)) {
        justify-content: center;
      }

      &:nth-of-type(1) {
        width: 50%;
      }
      &:nth-of-type(2) {
        width: 20%;
      }
      &:nth-of-type(3) {
        width: 15%;
      }
      &:nth-of-type(4) {
        width: 15%;
      }
    }
  }

  .list_title {
    ${mq[0]} {
      display: none;
    }
    span {
      padding: 16px 0 15px;
      border-bottom: 1px solid #ddd;
    }
  }

  .list li {
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;

    .img {
      display: inline-block;
      width: 15%;
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 75%;
      padding-left: 5%;

      .name {
        margin: 5px 0;
      }

      .option {
        font-size: 12px;
        line-height: 18px;
      }

      .delete {
        margin-top: 12px;
      }
    }

    ${mq[0]} {
      display: block;

      .cell {
        .img {
          width: 40%;
        }
        .text {
          width: auto;
        }
        .delete {
          position: absolute;
          top: 0;
          right: 0;
          width: 10px;
          height: 10px;

          .txt {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
            *visibility: hidden;
          }
          background: url("/images/btn_close.svg") center center / 10px
            no-repeat;
        }
        &:not(:nth-of-type(1)) {
          display: block;
          width: 100%;
          padding-left: 45%;
        }
        &:nth-of-type(1) {
          position: relative;
          width: 100%;
        }

        &:nth-of-type(2) {
          padding-top: 30px;
        }

        &:nth-of-type(4) {
          padding-left: 0;
          &:before {
            content: "|";
            display: inline-block;
            position: relative;
            top: -1px;
            padding: 0 7px;
            font-size: 12px;
            color: #ddd;
          }
        }

        &:nth-of-type(3),
        &:nth-of-type(4) {
          display: inline-block;
          width: auto;
          margin-top: 20px;
        }
      }
    }
  }

  .bottom_cart,
  .total_cart {
    padding: 20px 0;

    .box_price {
      display: flex;
      justify-content: flex-end;
      text-align: right;

      &:nth-of-type(2) {
        margin-top: 20px;
      }

      .price {
        width: 40%;
      }

      ${mq[0]} {
        justify-content: flex-start;

        .price {
          margin-left: auto;
        }
      }
    }
  }

  .bottom_cart {
    border-bottom: 1px solid #ddd;
  }

  .total_cart {
    font-weight: bold;
  }

  .box_btn {
    display: flex;
    margin-top: 40px;

    .btn_black {
      margin-left: auto;

      ${mq[0]} {
        width: 100%;
        margin-left: 0;
      }
    }
  }
`;
