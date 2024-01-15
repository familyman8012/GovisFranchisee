import styled from "@emotion/styled";
import { mq } from "ComponentsFarm/pageComp/gomarket/reset";

// Layout
export const GoMarketWrap = styled.div``;

export const GoContent = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  padding: 67px 16px;
`;

// HEAD
export const GoMarketMenu = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  border-bottom: 1px solid var(--color-borderGray);
  background: #fff;

  .inner {
    display: flex;
    align-items: baseline;
    max-width: 1600px;
    margin: 0 auto;
    padding: 20px 16px;
    font-size: 18px;
    font-weight: bold;
  }

  ul {
    display: flex;
    li {
      margin-right: 15px;
      cursor: pointer;

      ${mq[0]} {
        margin-right: 10px;
      }

      &.on a {
        color: var(--color-orange);
      }
    }
  }
  aside {
    display: flex;
    margin-left: auto;
    [class^="ico-market"] {
      margin-right: 20px;
      font-size: 16px;
      vertical-align: middle;

      &.on,
      &:hover {
        color: #c48b3f !important;
      }
      cursor: pointer;
    }
    .box_cart {
      display: flex;
      .ico-market-bag {
        margin-right: 5px;
      }
      .txt_number {
        font-size: 16px;
        font-weight: normal;
        line-height: 1;
        vertical-align: middle;
      }
    }
  }
  ${mq[0]} {
    .inner {
      padding: 20px 16px 5px;
      border-top: 1px solid #ececec;
      .box_menu {
        overflow-x: auto;
        width: calc(100vw - 150px);
        padding-bottom: 15px;

        .list {
          width: max-content;
        }
      }

      font-size: 16px;
    }
    aside {
      width: 102px;
      &[class^="ico-market"],
      .box_cart .txt_number {
        font-size: 14px !important;
      }
    }
  }
`;

// 리스트 화면
export const GoMarketList = styled.ul`
  display: grid;
  gap: 35px 20px;
  grid-template-columns: repeat(4, 1fr);
  padding: 35px 0;

  ${mq[0]} {
    gap: 35px 16px;
    grid-template-columns: repeat(2, 1fr);
  }

  .thumb {
    overflow: hidden;
    border-radius: 10px;
  }
  .txt_product_name {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    max-height: 3em;
    margin-top: 1.2em;
    line-height: 1.5em;
    font-size: 16px;
    color: #262626;
    text-align: center;
    font-family: NanumSquare, sans-serif;
    font-weight: 800;

    ${mq[0]} {
      font-size: 14px;
    }
  }
  .txt_price {
    color: #757575;
    font-family: NanumSquare, sans-serif;
    font-size: 14px;
    text-align: center;
    margin-top: 8px;
    font-weight: 600;
    ${mq[0]} {
      font-size: 13px;
    }
  }
`;
