import styled from "@emotion/styled";
import { FONT } from "@ComponentFarm/token";

export const PaginationWrap = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    padding: 1.2rem 0;
    margin-top: 1.6rem;
    gap: 0.8rem;
  }

  .page-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3.2rem;
    height: 3.2rem;
    border: 1px solid #dfe3e8;
    font-weight: 700;
    font-size: ${FONT.size4};
    line-height: 1.2;
    border-radius: 0.4rem;
    color: var(--color-dark_gray400);
    cursor: pointer;
    svg {
      position: static;
      width: 2.4rem;
      height: 2.4rem;
      top: auto;
      left: auto;
      color: currentColor;
    }
  }

  .page-item.disabled {
    opacity: 0.5;
    background: #919eab;
    border-color: #919eab;
    color: #c4cdd5;
    cursor: not-allowed;
    svg {
      fill: #c4cdd5;
    }
  }

  .page-item.active {
    background: var(--color-gray1);
    color: var(--color-blue60);
    border-color: currentColor;
  }

  .page-link {
    display: flex;
    color: inherit;
    cursor: inherit;
  }

  .page-item.active .page-link {
    border: none;
    background: transparent;
  }
`;

export const PaginationMobileWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.6rem;
    height: 1.6rem;
    padding: 0.5rem;
    background-size: 1.2rem 1.2rem !important;
    box-sizing: content-box;

    &:disabled {
      svg path {
        fill: var(--color-neutral90);
      }
    }
  }

  .txt_total {
    margin-left: 5px;
  }

  input {
    width: 55px;
    padding: 3px 7px;
    text-align: right;
    border: 1px solid rgb(224, 224, 224);
    border-radius: 3px;

    &:focus {
      border: 1px solid var(--color-orange70);
    }
  }

  .btn_prev {
    margin-right: 10px;
  }

  .btn_next {
    margin-left: 10px;
  }

  .btn_next,
  .btn_last {
    transform: rotate(180deg);
  }
`;
