import styled from "@emotion/styled";
import { PALLETES } from "LibFarm/color";
import { rgba } from "polished";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px 114px;
  margin: 0 auto;

  .gv-datepicker {
    display: flex;
  }

  > * + * {
    margin-top: 16px;
  }
`;

export const ContentCard = styled.div`
  border-radius: 0.25rem;
  background: ${PALLETES["white"]};

  border: 1px solid ${PALLETES["typo-5"]};
`;

export const OverflowXAxiosWrapper = styled.div`
  overflow-y: hidden;
  overflow-x: auto;

  .chart-wrapper-bar__view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .recharts-surface {
    margin-right: 0 !important;
  }
`;

export const ScrollShadow = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: -1px;
    width: 25px;
    transition: box-shadow 0.3s;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: -1px;
    right: 0;
    width: 25px;
    transition: box-shadow 0.3s;
    pointer-events: none;
  }

  &.left-show::before {
    box-shadow: inset 10px 0 15px -8px rgb(0 0 0 / 15%);
  }

  &.right-show::after {
    box-shadow: inset -10px 0 15px -8px rgb(0 0 0 / 15%);
  }
`;

export const ProductViewTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid ${PALLETES["typo-5"]};

  .title {
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
  }

  .right-area {
    display: flex;
  }
`;

export const ProductListFilterContainer = styled(ProductViewTypeContainer)`
  padding: 0.5rem 0.75rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProductFilterForm = styled.form`
  flex: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0.75rem 0.25rem;

  .product-filter-item {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;

    &:not(:first-of-type) {
      margin-top: 0.5rem;
    }
  }

  .product-filter-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .product-filter-input {
    width: 100%;
    font-size: 14px;
    box-shadow: none;
    border: 0;
    outline: 0;
    border-radius: 0.25rem;
    border: 1px solid ${PALLETES["typo-4"]};
    padding: 0.5rem 0.75rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:hover,
    &:focus,
    &:active {
      outline: 0;
      border-color: ${PALLETES["primary-3"]};
      box-shadow: 0 0 0 0.25rem ${rgba(PALLETES["primary-3"], 0.25)};
    }
  }

  .product-filter-select {
    display: flex;
    flex-wrap: wrap;

    li {
      margin-top: 0.5rem;
    }

    li:not(:last-of-type) {
      margin-right: 0.25rem;
    }
  }

  .product-filter-bottom {
    flex: none;
    padding-top: 1rem;
    /* width: 100%; */
    display: flex;
    margin: 0 -0.25rem -0.75rem;
    button {
      border-radius: 0 !important;

      &:first-of-type {
        width: 150px;
      }
    }
  }
`;

export const ProductSalesListContainer = styled.section`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
  }

  .product-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0.5rem;

    &:not(:first-of-type) {
      border-top: 1px solid ${PALLETES["typo-5"]};
    }
  }

  .item-info {
    .product-item-category {
      display: block;
      margin-top: 0.35rem;
    }
  }

  .order-info {
    margin-left: auto;
    font-size: 12px;
    letter-spacing: -0.02em;
    font-weight: 500;
  }

  .product-item-name {
    font-size: 14px;
  }

  .product-item-order-count {
    font-size: 13px;
    font-weight: 500;
  }
`;
