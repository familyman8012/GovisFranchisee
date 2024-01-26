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

  dl {
    width: 100%;
    display: flex;
  }

  dl:first-of-type {
    dt,
    dd {
      border-bottom: 1px solid var(--color-gray6);
    }
  }

  dt {
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

  dd {
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
    padding: 2.4rem 1.6rem;
    dl {
      display: block;

      dt,
      dd {
        width: 100%;
        border: none !important;
        background: none;
      }

      dt {
        padding: 0 0 1.6rem;
        text-align: left;
        color: var(--color-gray10);
      }
      dd {
        .box_daterange_input {
          margin: 0;
        }
        .inner {
          padding: 0;
        }
      }
    }

    dl:first-of-type {
      padding-bottom: 2.4rem;
      margin-bottom: 2.4rem;
      border-bottom: 1px solid var(--color-neutral95);

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

    dl:nth-of-type(2) {
      dt {
        display: flex;
        align-items: center;
        margin-left: auto;

        .btn_search {
          display: block;
          margin-left: auto;
        }
      }
      dd .inner {
        width: 100%;
        .btn_box {
          display: none;
        }

        .list_select_item {
          display: block;
          width: 100%;
          padding: 1.6rem;
          border-radius: 0.8rem;
          background: var(--color-neutral95);

          > button {
            width: 100%;
            &:not(&:last-of-type) {
              margin-bottom: 1.6rem;
            }
            background: #fff;

            .btn_close {
              margin-left: auto;
            }
          }
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
    margin: 3.2rem auto 6.4rem;
  }

  button {
    width: 12.3rem;
    &:first-of-type {
      margin-right: 1.6rem;
    }
  }
`;
