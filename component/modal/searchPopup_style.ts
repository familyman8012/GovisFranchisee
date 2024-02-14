import styled from "@emotion/styled";
import { TableWrap, mq } from "@ComponentFarm/common";

export const SearchBox = styled.form<{ width?: string }>`
  position: relative;
  z-index: 100;
  width: ${(props) => `${props.width}`};
  border-radius: 4px;
  border: 1px solid var(--color-neutral90);

  table {
    width: 100%;
    text-align: left;

    th {
      width: 10rem;
      padding: 0 2rem;
      font-weight: normal;
      border-right: 1px solid var(--color-blue_gray20);
      background: var(--color-blue_gray10);
    }
    th,
    td {
      height: 6.5rem;
      border-bottom: 1px solid var(--color-blue_gray20);
    }

    td {
      padding: 0 1rem;
      .wrap_input {
        display: flex;
        gap: 0.8rem;
      }
      .box_searchkeyword,
      .box_searchkeyword .inp {
        width: 100%;
      }
    }

    tr:last-of-type {
      th,
      td {
        border-bottom: none;
      }
    }
  }

  ${mq[0]} {
    width: 100%;
    border: none;
    table {
      tbody,
      tr,
      th,
      td {
        display: block;
        width: 100%;
        height: auto;
        padding: 0;
        border: none;
      }

      tr:nth-of-type(2) th {
        margin-top: 1.6rem;
      }

      th {
        margin-bottom: 0.8rem;
        color: var(--color-gray10);
        font-size: 1.4rem;
        font-weight: 700;
        line-height: 120%; /* 1.68rem */
        background: none;
      }

      td {
        .wrap_input {
          gap: 1.2rem;

          > div {
            width: 50%;
          }
        }
      }
    }
  }

  @media (max-width: 360px) {
    .box_searchkeyword .inp {
      font-size: 12px;
    }
  }
`;

export const SearchResult = styled.form<{ width?: string; col?: number[] }>`
  width: ${(props) => `${props.width}`};
  margin-top: 1.5rem;
  border: 1px solid var(--color-neutral90);
  border-radius: 0.6rem;

  ${TableWrap} {
    border: none;
    display: block;
    width: 100%;

    th,
    td {
      width: auto;
    }
  }

  table thead,
  table tbody tr {
    display: table;
    width: 100%;
  }

  table thead tr:nth-of-type(1) th {
    background: none;
  }

  th {
    padding-left: 0;
    .label_checkbox {
      display: block;
    }
  }

  table tbody {
    display: block;
    max-height: 30rem;
    overflow-y: scroll;
  }

  td {
    label {
      margin-bottom: 0;
    }
    .txt_box {
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
  }

  th,
  td {
    &:nth-of-type(1) {
      width: 7%;
    }
    &:nth-of-type(2) {
      width: 15%;
    }
    &:nth-of-type(3) {
      width: 50%;
    }
    &:nth-of-type(4) {
      width: 28%;
    }
  }

  ${mq[0]} {
    width: 100%;
    margin-top: 0;
    border: none;

    table thead tr {
      &:nth-of-type(1) {
        &:hover {
          background: none;
        }
        th {
          margin-bottom: 0.8rem;
          padding: 0;
          color: var(--color-gray10);
          font-size: 1.4rem;
          font-weight: 700;
          line-height: 120%;
          background: none;
        }
      }
    }

    table tbody {
      overflow-y: scroll;
      display: block;
      max-height: calc(100vh - 50rem);
      height: calc(100vh - 50rem);
    }

    table thead tr:nth-of-type(2) th,
    td {
      &:first-of-type {
        border-left: 1px solid var(--color-neutral90);
      }
      &:last-of-type {
        border-right: 1px solid var(--color-neutral90);
      }
    }
  }

  @media (max-width: 360px) {
    table tbody {
      max-height: calc(100vh - 40rem);
      height: calc(100vh - 40rem);

      td label,
      .badge {
        font-size: 12px;
      }
    }
  }
`;
