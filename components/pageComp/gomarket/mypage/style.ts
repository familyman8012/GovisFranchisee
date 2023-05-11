import styled from "@emotion/styled";
import { mq } from "../reset";

export const MyPageWrap = styled.div`
  max-width: 540px;
  margin: 0 auto;
  font-size: 13px;

  ${mq[0]} {
    font-size: 12px;
  }

  h2 {
    margin: 30px 0;
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
        width: 15%;
      }
      &:nth-of-type(2) {
        width: 50%;
      }
      &:nth-of-type(3) {
        width: 20%;
      }

      &:nth-of-type(4) {
        width: 15%;
      }
    }
  }

  .list_title {
    span {
      padding: 16px 0 15px;
      border-bottom: 1px solid #ddd;
    }
  }

  .list li {
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
`;
