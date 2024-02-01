import { mq } from "@ComponentFarm/common";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const AreaManufacturingQuality = styled.div`
  padding: 3.2rem;
  border-radius: 0.8rem;
  border: 1px solid var(--color-neutral90);
  background: #fff;

  ${mq[0]} {
    padding: 1rem 0;
  }
`;

export const ManufacturingQualityWrap = styled.div`
  overflow: hidden;

  min-width: 100%;
  height: 15.6rem;
  cursor: pointer;
  border-radius: 0.8rem;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

  &.on_1 {
    border: 0.2rem solid #2a31de;
    box-shadow: 0 0 0 0.8rem #eaebff;
  }

  &.on_2 {
    border: 0.2rem solid var(--color-yellow50);
    box-shadow: 0 0 0 0.8rem var(--color-yellow90);
  }

  &.on_3 {
    border: 0.2rem solid var(--color-orange70);
    box-shadow: 0 0 0 0.8rem var(--color-red90);
  }

  .status_head {
    display: flex;
    align-items: center;
    padding: 1.6rem 3.2rem;
    border-bottom: 1px solid #e5e5e5;
    background: var(--color-blue_gray10);

    .title {
      margin-right: 2.4rem;
      color: var(--color-blue-gray50);
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 110%;
    }

    .badge {
      font-weight: bold;
    }
  }

  .status_content {
    .info {
      display: flex;
      padding: 2.4rem 3.2rem;

      dl {
        width: 50%;

        &:first-of-type {
          padding-right: 2.4rem;
        }
        &:last-of-type {
          position: relative;
          padding-left: 2.4rem;

          &:before {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            content: "";
            width: 0.2rem;
            height: 4.3rem;
            background: var(--color-neutral95);
          }
        }

        dt {
          margin-bottom: 0.6rem;
          color: var(--color--neutral40);
          font-size: 1.4rem;
          font-weight: 400;
          line-height: 120%;
        }
        dd {
          display: flex;
          align-items: center;
          justify-content: end;
          .txt1 {
            color: var(--color-neutral20);
            font-family: "Pretendard";
            font-size: 2.4rem;
            font-style: normal;
            font-weight: 700;
            line-height: 110%;
          }
          .txt2 {
            margin-left: 0.8rem;
            color: var(--color-neutral40);
            font-family: "Pretendard";
            font-size: 1.4rem;
            font-style: normal;
            font-weight: 700;
            line-height: 120%;
          }
        }
      }
    }
  }
`;

export const ManufacturingQualityListWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.4rem;
  .recharts-surface {
    margin-right: 0px !important;
  }

  ${mq[0]} {
    margin-left: 0;
  }
`;

export const DonutArea = styled.div`
  width: 50%;
  height: 50rem;
  margin-right: 6.4rem;

  .donut-text {
    font-weight: bold;
  }

  ${mq[0]} {
    width: 100%;
    height: 25.2rem;
    margin-right: 0;

    .donut-text {
      font-size: 8px;
      &.text2 {
        font-size: 8px;
      }
    }
  }
`;

export const List = styled.div`
  width: 50%;
  padding-left: 6.4rem;
  border-left: 1px solid var(--color-neutral95);

  ${mq[0]} {
    display: none;
  }

  .items {
    display: block;
    margin-top: 2.4rem;
    &:hover {
      &:nth-of-type(1) {
        .manufacturing {
          border: 0.2rem solid #2a31de;
          box-shadow: 0 0 0 0.8rem #eaebff;
        }
      }
      &:nth-of-type(2) {
        .manufacturing {
          border: 0.2rem solid var(--color-yellow50);
          box-shadow: 0 0 0 0.8rem var(--color-yellow90);
        }
      }

      &:nth-of-type(3) {
        .manufacturing {
          border: 0.2rem solid var(--color-orange70);
          box-shadow: 0 0 0 0.8rem var(--color-red90);
        }
      }
    }
  }
`;

export const SkeletonWrap = styled.div`
  display: flex;

  > span {
    display: flex;
    overflow: hidden;
    width: calc(33.3% - 1.2rem);
    height: 25.3rem;
    margin-right: 1.2rem;
    border-radius: 0.8rem;

    &:nth-of-type(2) {
      width: 33.4%;
      margin: 0 2.4rem 0 1.2rem;
    }
  }
`;

export const MobileTableSty = css`
  &.basic {
    ${mq[0]} {
      td {
        min-height: auto;
        padding: 0 2.4rem 1.2rem;
        background: var(--color-blue_gray10);

        &:not(&:nth-of-type(2)) {
          padding-left: 2.4rem;
        }
        .thumb {
          padding: 0;
        }
        .box_rank {
          width: 6rem;
          margin-right: 0 !important;
        }
      }
    }
  }
  ${mq[0]} {
    display: block;
    colgroup {
      display: none;
    }
    thead {
      display: none;
    }
    tbody,
    tr,
    td {
      display: block;
    }
    tr {
      overflow: hidden;
      margin-bottom: 1.6rem;
      border: 1px solid var(--color-neutral90);
      border-radius: 0.8rem;
      background: var(--color-blue_gray10);
    }
    td {
      height: auto;
      padding: 0 2.4rem 1.2rem;
      text-align: left;
      font-size: 1.4rem !important;
      border-bottom: none;
      background: var(--color-blue_gray10);

      dl {
        display: flex;
        align-items: center;
        dt,
        dd {
          font-size: 1.4rem;
          font-weight: 600;
        }
        dt {
          display: block;
          color: var(--color-blue_gray50);
        }
        dd {
          margin-left: auto;
          color: var(--color-neutral30);
        }
      }

      &:nth-of-type(1) {
        display: none;
      }

      &:nth-of-type(2) {
        padding: 0.8rem;
        border-bottom: 1px solid var(--color-neutral90);
        background: #fff;

        .inner {
          .box_rank {
            display: block;
            min-width: 3rem;
            margin-right: 0.8rem;
            color: var(--color-neutral60);
            font-family: "Noto Sans KR";
            font-size: 1.4rem;
            font-weight: 700;
            text-align: center;
          }
          .thumb {
            width: 8.5rem;
            height: 6.4rem;
            margin: 0;
          }
          .txt_product_info {
            padding: 0 0 0 0.8rem;

            .category {
              font-size: 1.4rem;
            }
          }
        }
      }

      &:nth-of-type(3) {
        padding-top: 1.6rem;
      }
      &:last-of-type {
        padding-bottom: 1.6rem;
      }
    }
  }
`;

export const InfoArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 3.2rem;
  border: 1px solid var(--color-neutral90);
  border-radius: 0.8rem;
  background: #fff;

  ${mq[0]} {
    margin-bottom: 1.6rem;
  }

  dl {
    padding: 2.4rem 0;
    &:nth-of-type(2) {
      border-left: 1px solid var(--color-neutral90);
    }
    &.center {
      border-left: 1px solid var(--color-neutral90);
      border-right: 1px solid var(--color-neutral90);
      background: var(--color-blue_gray10);
    }
  }
  dt {
    margin-bottom: 0.8rem;
    color: var(--color-neutral20);
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    text-align: center;
  }
  dd {
    color: var(--color-neutral-10, #181818);
    font-family: Pretendard;
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 110%; /* 2.64rem */
    text-align: center;

    .txt {
      margin-left: 0.8rem;
      color: var(--color-neutral40);
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
`;
