import styled from "@emotion/styled";
import React from "react";
import { Common } from "StyleFarm/common";

export const HomeContents = styled.div`
  padding: 24px 20px 114px;
  .home {
    &__stack-sales {
      padding: 16px;
      color: ${Common.color.$white};
      background-color: ${Common.color.$primary3};
      &__date-box {
        display: flex;
        justify-content: space-between;

        &__title {
          font-size: 16px;
          font-weight: bold;
        }

        &__date {
          font-size: 12px;
          margin: auto 0;
        }
      }

      &__price-box {
        display: flex;
        justify-content: flex-end;
        margin-top: 36px;
        align-items: baseline;
        &__prefix-per {
          margin-right: 5px;
          font-size: 16px;
        }
        &__price {
          font-size: 36px;
        }
        &__unit {
          margin-left: 5px;
          font-size: 16px;
        }
      }
    }

    &__yesterday-info {
      > li:first-of-type {
        margin-top: 0;
      }

      li {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        font-weight: bold;

        :first-of-type {
          font-weight: normal;
        }
      }
    }

    &__sub-title {
      margin-top: 16px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;

      span {
        padding-left: 8px;
        font-weight: normal;
        font-size: 12px;
      }
    }

    &__contents-box {
      margin-bottom: 16px;
      background-color: ${Common.color.$white};
      padding: 16px;

      > h5 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
      }
    }

    &__tmp-size {
      width: 100%;
      height: 300px;
    }

    &__order-type {
      width: 100%;
      height: 210px;
    }
  }

  .chart-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    overflow: hidden;

    &--squre {
      padding-bottom: 100%;
    }

    &__legend {
      padding-left: 26px;
      display: inline-flex;
      align-items: center;
      li + li {
        margin-top: 8px;
      }
    }

    &__symbol {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
      margin-right: 8px;
    }

    &__view {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    &__unit {
      padding-left: 8px;
    }
  }

  .chart-wrapper-bar {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;

    &--squre {
      padding-bottom: 100%;
    }
    &__legend {
      display: flex;
      justify-content: center;
      align-items: center;
      li > span {
        padding-left: 8px;
      }
      li + li {
        margin-left: 8px;
      }
    }

    &__tooltip {
      padding: 10px;
      background-color: ${Common.color.$white};
      border: 1px solid #ececec;

      li + li {
        margin-top: 8px;
      }
    }

    &__symbol {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
      margin-right: 8px;
    }

    &__view {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    &__unit {
      padding-left: 8px;
    }
  }
`;
