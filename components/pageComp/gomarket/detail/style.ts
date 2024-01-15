import styled from "@emotion/styled";
import { mq } from "../reset";

// 디테일
export const GomarketDetail = styled.div`
  padding: 50px 0;

  .wrap_info {
    display: flex;
    padding: 0 16px;

    ${mq[0]} {
      display: block;
    }
    ${mq[1]} {
      padding: 0;
    }
  }

  // 컨텐츠 영역
  .wrap_content {
    max-width: 832px;
    padding: 160px 16px 0;
    margin: 0 auto;

    ${mq[0]} {
      padding-top: 50px;
    }
  }
`;

export const ProductImgWrap = styled.div`
  position: relative;
  width: 50%;
  .thumb_img {
  }
  .list {
    display: grid;
    gap: 0 20px;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 20px;
  }
  ${mq[0]} {
    width: 100%;
  }
`;

export const PaymentInfoWrap = styled.div`
  width: 45%;
  margin-left: 5%;
  margin-right: 0;
  text-align: left;
  padding-top: 100px;

  ${mq[0]} {
    width: 100%;
    margin-left: 0;
    padding-top: 20px;
  }

  .tit {
    font-size: 24px;
    font-weight: bold;
  }

  .price {
    margin: 20px 0;
    font-size: 16px;
    color: #757575;
  }

  .delivery_fee {
    display: flex;
    margin: 20px 0;
    font-size: 13px;
    dt {
      width: 90px;
      font-weight: bold;
    }
  }

  ${mq[0]} {
    .price {
      margin: 5px 0;
    }
    .delivery_fee {
      margin: 10px 0 20px;
    }
  }

  .option_control {
    margin-bottom: 20px;
    dt {
      margin-bottom: 10px;
      font-size: 13px;
    }

    &.add_text {
      input {
        width: 100%;
        max-width: 340px;
        font-size: 14px;
        height: 37px;
        padding: 5px 15px;
        border: 1px solid #ddd;
      }
    }
  }

  .box_payment {
    padding: 20px 0;
    font-size: 13px;
    border-top: 1px solid var(--color-borderGray);
    dl {
      display: flex;
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 20px;
      }
    }
    dt {
      font-weight: bold;
    }
    dd {
      margin-left: auto;
    }
  }
`;
