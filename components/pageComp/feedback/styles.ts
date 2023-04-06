import styled from "@emotion/styled";
import { Button } from "ComponentsFarm/elements/Button/style";
import { Container } from "ComponentsFarm/layouts/styles";
import { Common } from "StyleFarm/common";
import { RegisterForm } from "../return/style";

export const FeedBackContents = styled.div`
  .contents-prefix-box {
    ${Container} {
      &:not(.contents) {
        padding: 0 var(--bs-gutter-x, 0.75rem);
      }
    }
  }
  ${Container} {
    max-width: 1320px;
  }
  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .empty-view p {
    margin-top: 1.5rem;
  }

  .recipe-feedback {
    overflow-y: auto;
  }
  .contents-info {
    display: flex;
    align-items: center;

    .marker-status {
      width: 50px;
      height: 50px;
      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: bold;
      position: relative;
      margin: auto;

      &.ing {
        background-color: ${Common.color.$success2};
        color: ${Common.color.$success1};
      }

      &.wait {
        background-color: ${Common.color.$other2};
        color: ${Common.color.$other1};
      }

      &.finish {
        background-color: ${Common.color.$typo6};
        color: ${Common.color.$typo3};
      }

      .unread {
        content: "";
        position: relative;
        display: inline-block;
        width: 7px;
        height: 7px;
        margin-right: 7px;
        top: -1px;
        background: $primary-3;
        border-radius: 50%;
        position: absolute;
        right: 0;
        top: 0;
        margin-right: 0;
      }
    }

    .contents-summary {
      //margin-left: 12px;

      .date {
        color: ${Common.color.$typo3};
        font-size: 10px;
      }

      .subject {
        color: #333333;
        font-size: 14px;
        word-break: break-all;
      }
    }

    .btn-delete-box {
      color: #eb5757;
      border: 0;
      background-color: ${Common.color.$white};
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    &.return-style {
      .marker-status {
        font-size: 12px;
        text-align: center;
        word-break: keep-all;
      }
    }
  }

  .recipe-feedback-list {
    > ul {
      margin-bottom: 20px;
    }

    .box {
      background-color: ${Common.color.$white};
      margin-top: 10px;

      &:first-of-type {
        margin-top: 0;
      }

      > div {
        padding: 16px 0;

        > div {
          padding: 0;
        }

        > div:first-of-type {
          display: flex;
        }

        > div:last-of-type {
          display: flex;
          align-items: center;
          justify-content: center;

          color: ${Common.color.$typo5};
          font-weight: bold;
        }
      }
    }
  }

  .recipe-feedback-post {
    pre {
      padding: 20px;
      background: #fff6f0;
      border: 1px solid ${Common.color.$primary3};
      box-sizing: border-box;
      border-radius: 4px;
      font-family: inherit;
      color: ${Common.color.$primary3};
      font-size: 12px;
    }

    input {
      margin-top: 26px;
      width: 100%;
      height: 30px;
      font-size: 14px;
      padding: 12px 0;
      border: 0;
      border-bottom: 0.8px solid ${Common.color.$typo5};
      font-size: 16px;

      &::-webkit-input-placeholder,
      &::-moz-placeholder,
      &:-ms-input-placeholder,
      &:-moz-placeholder {
        font-size: 0.8em;
        letter-spacing: -0.01em;
      }

      &:focus {
        outline: 0;
      }
    }

    ${RegisterForm} {
      input {
        margin-top: 0;
      }
    }

    .gv-datepicker__origin {
      margin-top: 0;
    }

    p {
      word-break: keep-all;
      white-space: pre-wrap;
      margin-bottom: 0;
    }
  }

  .recipe-feedback-view {
    margin-bottom: 25px;
    padding-top: 0;

    .contents-info {
      padding: 20px;
      display: flex;
      align-items: center;

      .contents-summary {
        //margin-left: 12px;

        .date {
          color: ${Common.color.$typo3};
          font-size: 12px;
        }

        .subject {
          color: #333333;
          font-size: 16px;
          word-break: break-all;
        }
      }
      &.return-style {
        .marker-status {
          font-size: 12px;
          text-align: center;
          word-break: keep-all;
        }
      }
    }

    .contents-list {
      li {
        margin-top: 10px;
        padding: 20px;
        background-color: ${Common.color.$white};
        border-radius: 10px;

        &.date {
          text-align: center;
          padding: 8px;

          h5 {
            color: ${Common.color.$typo3};
          }
        }

        &.answer {
          background-color: #fff6f0;
          color: ${Common.color.$primary3};
        }

        img {
          border-radius: 10px;
        }

        p {
          white-space: pre-wrap;
        }

        hr {
          margin: 1rem 0;
          color: inherit;
          opacity: 0.25;
          height: 1px;
          background-color: #e0e0e0;
          border: 0.8px solid #e0e0e0;
        }

        button {
          color: #eb5757;
          border: 0;
          background-color: ${Common.color.$white};
        }

        &.no-background {
          background-color: #fafafa;
          padding: 0px;

          button {
            background-color: #fafafa;
          }

          .row div:first-of-type {
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            padding-right: 0;
          }
        }
      }

      li:first-of-type {
        margin-top: 0;
      }
    }
  }

  .form-contents-spinner-box {
    background-color: ${Common.color.$typo4};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .spinner-border {
      width: 50px;
      height: 50px;
      border: 7px solid $primary-3;
      border-radius: 50%;
      border-right-color: transparent;
      animation: 0.75s linear infinite spinner-border;
      vertical-align: -0.125em;
    }
  }

  .form-contents-box {
    width: 100%;
    height: calc(100% - 38px);

    textarea {
      width: 100%;
      height: 100%;
      border: 0;
      border-top: 0.8px solid ${Common.color.$typo5};
      color: ${Common.color.$typo2};
      padding: 15px;
      font-size: 16px;
      &::-webkit-input-placeholder,
      &::-moz-placeholder,
      &:-ms-input-placeholder,
      &:-moz-placeholder {
        color: ${Common.color.$typo4};
        font-size: 0.9em;
      }
      &:focus {
        outline: 0;
      }
    }

    .image-box {
      // height:38px;
      padding: 0.5rem 0;
      background-color: ${Common.color.$typo6};
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: -5px;

      label {
        margin-left: 10px;

        span {
          margin-left: 8px;
        }
      }

      input {
        display: none;
      }

      button {
        height: 24px;
        width: 54px;
        margin-top: 0;
        min-width: 0;
        border: 0;
        border-radius: 12px;
        margin-right: 10px;
        background-color: ${Common.color.$typo4};
        color: ${Common.color.$white};
        box-shadow: none;
        cursor: not-allowed;
        &.btn-enabled {
          background-color: ${Common.color.$primary3};
          color: ${Common.color.$white};
          cursor: pointer;
        }
      }
    }

    .image-box-label {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      line-height: 1;
      font-size: 12px;
    }
  }

  .btn-post {
    width: 50px;
    height: 50px;
    padding: 17px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: ${Common.color.$primary3};
    border: 0 solid ${Common.color.$primary3};
    border-radius: 50%;
    box-shadow: #80808054 1px 1px 1px 0px;
    color: ${Common.color.$white};
    font-weight: bold;

    display: flex;
    align-items: center;
    align-content: center;
  }

  .btn-contents {
    width: 100%;
    height: 56px;
    background-color: ${Common.color.$white};
    border: 1px solid ${Common.color.$primary3};
    margin: auto;
    margin-top: 20px;
    border-radius: 28px;
    font-weight: bold;
    color: ${Common.color.$primary3};

    &:hover,
    &:focus {
      color: ${Common.color.$white};
      background-color: ${Common.color.$primary3};
    }

    &:disabled {
      color: ${Common.color.$typo5};
      border-color: ${Common.color.$typo5};
      background: transparent;
    }
  }

  .btn-reply {
    margin-top: 12px;

    width: 100%;
    height: 54px;

    background: ${Common.color.$white};

    border: 1px solid ${Common.color.$typo6};
    box-sizing: border-box;
    border-radius: 10px;

    color: ${Common.color.$typo4};
  }

  // 건의/문의
  .suggestion-category-title {
    color: #333;
    width: 68px;
    height: 20px;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .suggestion-category {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .suggestion-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    height: 52px;
    border: 1px solid #e0e0e0;
    color: #828282;
  }
  .suggestion-checkbox--checked {
    font-weight: bold;
    font-size: 16px;
    border-color: #ff862c;
    color: #ff862c;
  }

  .suggestion-checkbox input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    z-index: 3;
  }
  .suggestion-checkbox + .suggestion-checkbox {
    margin-left: 15px;
  }

  ${Button} {
    margin-top: 12px;
    min-width: 56px;
    height: 54px;
    font-size: 16px;
    font-weight: 700;
    border-radius: 10px;
  }
`;
