import styled from "@emotion/styled";
import { Common } from "StyleFarm/common";

export const Components = styled.div`
  .search-action {
    &__title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 12px;
    }

    &__content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .gv-datepicker {
        width: 100%;
      }
      > * + * {
        margin-left: 8px;
      }
    }
  }

  .order-sales-summary {
    display: flex;
    padding: 20px 0;

    &__item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: ${Common.color.$typo2};

      & + & {
        border-left: 1px solid ${Common.color.$typo4};
      }

      li {
        &:first-of-type {
          font-size: 14px;
          margin-bottom: 12px;
        }

        &:nth-of-type(2) {
          font-size: 24px;
          font-weight: bold;
        }
      }
    }

    &__unit {
      font-size: 16px;
      vertical-align: baseline;
    }

    &__divider {
      width: 1px;
      border: 1px solid ${Common.color.$typo4};
    }
  }

  .list-more-button {
    width: 50px;
    height: 50px;
    font-weight: bold;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 18px;
    border-radius: 50%;

    /* Gray 6 */
    background: ${Common.color.$typo6};
    /* Gray 4 */
    border: 1px solid ${Common.color.$typo4};
    box-sizing: border-box;

    &:first-of-type {
      color: ${Common.color.$typo4};
    }
  }

  .fqs-filter-datepicker {
    border: 0;
    width: 100%;
    height: auto;
    min-height: 40px;

    & > svg {
      display: none;
    }

    svg {
      position: static !important;
    }

    .gv-datepicker__origin {
      display: inline-flex;
      padding: 0;
      white-space: pre;
      font-weight: 500;
      justify-content: center;
      * {
        line-height: 1.25;
      }
      * + * {
        margin-left: 1.25rem;
      }
    }
  }

  .summary-list {
    &__item {
      background: ${Common.color.$white};
      display: flex;
      flex-direction: column;
      border-radius: ${Common.color.$borderradius};
      padding: 24px;

      & + & {
        margin-top: 12px;
      }
    }

    &__info,
    &__total {
      width: 100%;
      li {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        &:last-of-type {
          padding-bottom: 0;
        }
      }
    }

    &__value {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__info {
      padding-bottom: 20px;
      font-weight: 500;
    }

    &__info &__key {
      margin-right: 1rem;
      flex: none;
      font-weight: 400;
    }

    &__total {
      border-top: 1px solid ${Common.color.$typo4};
      padding-top: 20px;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .error-box {
    position: fixed;
    bottom: 10px;
    width: 100%;
`;

export const OrderSalesSummaryList = styled.ul`
  display: flex;
  padding: 20px 0;

  &__item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${Common.color.$typo2};

    & + & {
      border-left: 1px solid ${Common.color.$typo4};
    }

    li {
      &:first-of-type {
        font-size: 14px;
        margin-bottom: 12px;
      }

      &:nth-of-type(2) {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }

  &__unit {
    font-size: 16px;
    vertical-align: baseline;
  }

  &__divider {
    width: 1px;
    border: 1px solid ${Common.color.$typo4};
  }
`;

export const ListMoreBtn = styled.button`
  width: 50px;
  height: 50px;
  font-weight: bold;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
  border-radius: 50%;

  /* Gray 6 */
  background: ${Common.color.$typo6};
  /* Gray 4 */
  border: 1px solid ${Common.color.$typo4};
  box-sizing: border-box;

  :first-of-type {
    color: ${Common.color.$typo4};
  }
`;

export const FqsFilterDatepicker = styled.div`
  border: 0;
  width: 100%;
  height: auto;
  min-height: map-get(40px, "datepicker");

  & > svg {
    display: none;
  }

  svg {
    position: static !important;
  }

  .gv-datepicker__origin {
    display: inline-flex;
    padding: 0;
    white-space: pre;
    font-weight: 500;
    justify-content: center;
    * {
      line-height: 1.25;
    }
    * + * {
      margin-left: 1.25rem;
    }
  }
`;

export const SummaryListWrap = styled.ul`
  &__item {
    background: ${Common.color.$white};
    display: flex;
    flex-direction: column;
    border-radius: ${Common.color.$borderradius};
    padding: 24px;

    & + & {
      margin-top: 12px;
    }
  }

  &__info,
  &__total {
    width: 100%;
    li {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      &:last-of-type {
        padding-bottom: 0;
      }
    }
  }

  &__value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__info {
    padding-bottom: 20px;
    font-weight: 500;
  }

  &__info &__key {
    margin-right: 1rem;
    flex: none;
    font-weight: 400;
  }

  &__total {
    border-top: 1px solid ${Common.color.$typo4};
    padding-top: 20px;
    font-size: 16px;
    font-weight: bold;
  }
`;

export const ErrorBox = styled.div`
  position: fixed;
  bottom: 10px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    background: ${Common.color.$white};
    width: 70%;
    color: ${Common.color.$error1};
    background: rgba(${Common.color.$error1}, 0.1);
    font-weight: bold;
    border-radius: ${Common.color.$borderradius};
    padding: 10px 10px;
    font-size: 1em;
    align-items: center;
    bottom: 0.5rem;

    display: flex;
    justify-content: center;

    svg {
      width: 1.2em;
      height: 1.2em;
      margin-right: 0.5em;
    }
  }
`;

export const SearchAction = styled.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  > * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
    margin-top: var(--bs-gutter-y);
  }

  .search-action__title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .search-action__content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .gv-datepicker {
      width: 100%;
    }
    > * + * {
      margin-left: 8px;
    }
  }
`;
