import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@ComponentFarm/token';

export const MenuOptionListStyle = styled.section`
  border-radius: 0.4rem;
  h2 {
    margin-bottom: 0;
  }

  .wrap {
    border-radius: 0.4rem;
    min-height: 46.6rem;
    border: 1px solid var(--color-neutral90);
    display: flex;
    flex-direction: row;
    align-items: stretch;

    > .view {
      flex: 1;
      padding: 3.2rem;
      width: calc(100% - 30rem);
      border-left: 1px solid var(--color-neutral90);
      min-height: 46.6rem;
    }
  }

  .side {
    position: relative;
    flex: none;
    width: 30rem;
    padding: 1.6rem;
    overflow-y: auto;
    max-width: 40rem;

    > button {
      width: 100%;
      margin-bottom: 1.6rem;
    }
  }

  .list {
    border-bottom: 1px solid var(--color-neutral90);
    padding-bottom: 1.2rem;

    &.abs {
      padding: inherit;
      margin-bottom: 1.2rem;
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 0;
      left: 0;
      width: 100%;
      border-bottom: 0;
    }
  }
`;

export const MenuOptionGroupStyle = styled.div`
  .header {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 1rem 0 1.6rem;
    border-radius: 0.4rem;
    border: 1px solid var(--color-grayborder);
    background-color: var(--color-gray2);
    margin-bottom: 1.2rem;
    height: 4.5rem;

    .title {
      flex: 1;
      display: inline-flex;
      font-size: 1.6rem;
      line-height: 1.1;
      width: 100%;
      font-weight: 600;
      color: var(--color-neutral50);
      padding: 1.2rem 0;

      &:empty {
        height: calc(1.6rem * 1.1);
        box-sizing: content-box;
      }
    }

    input {
      flex: 1;
      background: transparent;
      height: 100%;
      padding: 0;
      border: 0;

      &::placeholder {
        color: var(--color-neutral50);
      }

      &:focus {
        border: 0;
      }
    }

    & > .save-button {
      padding: 0.4rem 0.8rem;
      border-radius: 0.2rem;
      color: var(--color-gray1);
      background: var(--color-blue60);
      cursor: pointer;
    }

    .icon-btn {
      display: inline-flex;
      width: 1.6rem;
      height: 1.6rem;
      align-items: center;
      justify-content: center;
      background: transparent;
      margin-left: 0.8rem;
      cursor: pointer;
      color: var(--color-neutral10);

      &.expanded {
        transform: rotate(180deg);
      }
    }

    &.editable {
      background-color: var(--color-gray1) !important;
      border: 1px solid var(--bage-blueLabel);
      border-width: 2px;
    }
  }

  &.option + .option {
    margin-top: 0.4rem;
  }

  &.option .header {
    margin: 0;
    padding: 0 0.8rem;
    border-radius: 0.4rem;
    cursor: pointer;
    width: 100%;
    background: transparent;
  }

  &.active .header {
    background-color: var(--color-gray4);
  }

  &.invalid .header {
    border-color: var(--color-red50);
  }

  .dropdown {
    position: relative;
    display: inline-flex;

    .dropdown-list {
      position: absolute;
      top: calc(100% + 1rem);
      right: -1.5rem;
      display: flex;
      flex-direction: column;
      width: 9rem;
      padding: 0.6rem 0;
      border-radius: 0.4rem;
      border: 1px solid var(--color-neutral90);
      background: var(--color-gray1);
      color: var(--color-neutral10);
      z-index: 2;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);

      button {
        font-size: 1.4rem;
        line-height: 1.2;
        padding: 0.8rem 1.2rem;
        cursor: pointer;
        background: transparent;
        appearance: none;
        text-align: left;

        &:hover,
        &:active {
          background: var(--color-gray2);
        }
      }
    }
  }

  .option {
    display: flex;
    margin-left: 3.2rem;
    padding: 1rem 1.6rem;
    font-weight: 400;
    font-size: 1.6rem;
    border-radius: 0.4rem;
    width: calc(100% - 3.2rem) !important;
    background-color: transparent;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    border: 1px solid var(--color-grayborder);
    align-items: baseline;

    .sub {
      margin-left: 0.8rem;
      color: var(--color-neutral50);
      font-size: 0.8em;
      vertical-align: baseline;
    }

    &.active {
      background-color: ${Button.ghostPrimaryHoverBg};
      font-weight: 600;
    }

    &.invalid {
      border-color: var(--color-red50);
    }

    & + .option {
      margin-top: 1.2rem;
    }

    &:first-of-type {
      margin-top: 1.2rem;
    }

    &:last-of-type {
      margin-bottom: 1.2rem;
    }
  }

  > .content button {
    margin-left: 3.2rem;
    width: calc(100% - 3.2rem);
    justify-content: flex-start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > .content button + button {
    margin-top: 1.2rem;
  }

  .content {
    overflow: hidden;
    box-sizing: border-box;
  }

  .add-button {
    height: 4rem;
    color: var(--color-blue60);
  }
`;

export const MenuOptionDetailStyle = styled.div`
  h3 {
    padding: 0;
    margin-bottom: 1.2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    gap: 0 0.8rem;
    input {
      border-radius: 0.4rem;
      max-width: 74.6rem;
    }

    .buttons {
      display: flex;
      gap: 0.8rem;
      button {
        width: 100%;
        min-width: 0;
      }
    }
  }
`;

export const MenuCopyInputStyle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  border-radius: 0.4rem;
  border: 1px solid var(--input-border);

  &:focus-within {
    border-color: var(--color-neutral10);
  }

  select,
  input.inp {
    border: 0;
    border-radius: 0;
    height: 100%;
  }

  input.inp {
    width: 100%;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  select {
    width: 25%;
    min-width: 11.9rem;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }

  &.error {
    border-color: var(--color-red50);
  }
`;

export const FormStyle = css`
  h2 {
    border: 0;

    &:nth-of-type(2) {
      border-bottom: 1px solid var(--color-neutral90);
    }
  }

  .field1 {
    display: inline-flex;
    gap: 0.8rem;
    width: 52rem;

    select {
      width: 21%;
      min-width: 15rem;
    }

    input {
      width: 100%;
      flex: 1;
      margin-left: 0.8rem;
    }

    .box_inp {
      flex: none;
      width: 52rem;
    }
  }

  .field3 select {
    width: 32.6rem;
  }

  .field4 input {
    width: 32.6rem;
  }

  [class^='line'] {
    margin-bottom: 3.2rem;
  }

  [class^='field'] {
    display: inline-flex;
    gap: 0.8rem;
    width: 100%;
  }

  .box_inp {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    p {
      width: 100%;
    }
  }

  .field5,
  .field6,
  .field7 {
    .box_inp {
      gap: 1rem 2.5%;
    }
  }

  .price {
    input {
      margin: 0 0.8rem;
      width: 13.5rem;
    }

    span {
      font-weight: normal;
      color: var(--color-neutral10);
    }
  }
`;
