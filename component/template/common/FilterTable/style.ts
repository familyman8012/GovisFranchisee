import { mq } from "@ComponentFarm/common";
import { DiffDateRangerWrap } from "@ComponentFarm/modules/DateRange/style";
import styled from "@emotion/styled";

export const FilterTableWrap = styled.div`
  overflow: hidden;
  border: 1px solid var(--color-gray6);
  border-radius: 0.8rem;
`;

export const FilterTable = styled.div`
  width: 100%;
  background-color: var(--color-gray1);

  dl.control_filter_line {
    width: 100%;
    display: flex;
  }

  dl.control_filter_line {
    &:first-of-type {
      dt.tit_filter,
      dd.box_filter_inp {
        border-bottom: 1px solid var(--color-gray6);
      }
    }
    &:nth-of-type(2) {
      .txt_mobile {
        display: none;
      }
    }
  }

  dt.tit_filter {
    width: 8%;
    padding: 1.95rem 2rem 1.95rem 0;
    color: var(--color-neutral50);
    font-size: 1.4rem;
    font-weight: 700;
    text-align: right;
    border-right: 1px solid var(--color-gray6);
    background: var(--color-gray2);

    .btn_search {
      display: none;
    }
  }

  dd.box_filter_inp {
    display: flex;
    align-items: center;
    width: 92%;
    border-right: 0;

    .inner {
      display: flex;
      align-items: center;
      padding: 0.8rem 1rem;
      border-right: none;

      button {
        min-width: auto;
        margin-right: 1.6rem;
      }

      .btn_box {
        display: flex;
        align-items: center;
      }

      .list_select_item {
        display: flex;
        gap: 1rem;

        .txt_notice {
          display: none;
          font-size: 1.3rem;
          color: var(--color-neutral60);

          ${mq[0]} {
            display: block;
          }
        }
      }

      .select_box {
        display: flex;
        align-items: center;
        gap: 0 1.6rem;

        & + .btn_reset {
          margin-left: 1.6rem;
        }
      }
    }
  }

  ${mq[0]} {
    display: flex;
    gap: 1rem;
    padding: 0 1rem;

    dl.control_filter_line {
      display: block;
      padding: 1.2rem 0;

      dt.tit_filter,
      dd.box_filter_inp {
        width: 100%;
        border: none !important;
        background: none;
      }

      dt.tit_filter {
        display: none;
        /* width: 9rem;
        margin: 0;
        padding: 0.5rem 2rem 0.5rem 0;
        text-align: left;
        color: var(--color-gray10); */
      }
      dd.box_filter_inp {
        .box_daterange_input {
          margin: 0;
        }
        .inner {
          padding: 0;
        }
      }
    }

    dl.control_filter_line:first-of-type {
      border-bottom: 1px solid var(--color-neutral95);

      .icoInput {
        font-size: 1.3rem;
      }

      .area_diff_dateranger {
        display: block;
        width: 100%;
        .area_dateranger {
          width: 100%;
          .box_daterange_input {
            width: 100%;
          }
        }
      }
    }

    dl.control_filter_line:nth-of-type(2) {
      width: 95px;
      dd.box_filter_inp .inner {
        width: 100%;
        .btn_box {
          width: 100%;
        }
        .btn_search {
          width: 100%;
          margin-right: 0;
          padding: 1.1rem 1.2rem 1.2rem 1.2rem;
          justify-content: center;
          align-items: center;
          color: var(--color-orange60);
          font-size: 1.3rem;
          font-weight: 400;
          border-radius: 0.4rem;
          border: 1px solid var(--color-orange60);
          background: #fff;

          .txt_mobile {
            display: block;
          }
          .txt_pc {
            display: none;
          }
        }
        .btn_reset {
          display: none;
        }

        .list_select_item {
          display: none;
        }
      }
    }
  }
`;

export const FilterTableBtnBox = styled.div`
  display: flex;
  width: fit-content;
  margin: 3.6rem auto;

  ${mq[0]} {
    margin: 2rem auto 0;
  }

  button {
    width: 12.3rem;
    &:first-of-type {
      margin-right: 1.6rem;
    }
  }
`;
