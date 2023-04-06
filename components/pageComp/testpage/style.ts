import styled from "@emotion/styled";
import { mq } from "../mq";

export const Box = styled.div<{ width: string }>`
  width: ${({ width }) => width}px;
  height: 300px;
  border: 1px solid;
`;

export const WelcomeContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vh;
  flex-direction: column;
  align-items: center;

  ${mq[0]} {
    width: 50%;
  }

  button {
    border: none;
    outline: none;
    background: #795bfe;
    border-radius: 100px;
    color: #ffffff;
    padding: 16px;
    margin-top: 14px;
    min-width: 136px;
    cursor: pointer;
    text-decoration: none;
  }
`;

export const LoginWrap = styled.div`
  .container {
    max-height: 100vh;

    ${mq[0]} {
      height: 100vh;
      overflow: hidden;
    }
  }

  .loginMain {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 360px;
    position: relative;
    margin: 0 auto;

    h1 {
      font-size: 1.5em;
      line-height: 30px;
      margin-bottom: 14px;
    }
  }

  .loginStep {
    margin-top: 24px;
    overflow: hidden;
    max-width: 100%;

    ${mq[0]} {
      padding: 24px;
    }
  }

  .loginForm {
    label {
      display: block;
      font-size: 0.875em;
      line-height: 120%;
      color: #777777;
      text-align: left;
      margin-bottom: 8px;
    }

    input {
      width: 100%;
      align-self: flex-start;
      padding: 16px;
      border: 1px solid #e0e0e0;
      box-sizing: border-box;
      border-radius: 4px;
      margin-bottom: 14px;

      &:focus {
        border: 1px solid #795bfe;
        outline: none;
      }

      &.errorInput {
        border: 1px solid #fe5b5b;
        outline: none;
      }
    }

    & > p {
      font-size: 0.875em;
      line-height: 140%;
      color: #222222;
      margin-bottom: 40px;

      & > a {
        color: #43adbb;
        font-weight: bold;
      }
    }

    & > a {
      display: block;
      color: #777777;
      font-size: 0.875em;
      margin-top: 24px;
    }

    & > span.error {
      font-size: 12px;
      margin-top: 14px;
      display: block;
      color: #fe5b5b;
    }
  }

  .blueButtonRound {
    border: none;
    outline: none;
    background: #795bfe;
    border-radius: 100px;
    color: #ffffff;
    padding: 16px;
    margin-top: 14px;
    min-width: 136px;
    cursor: pointer;
    text-decoration: none;
    width: 100%;

    ${mq[0]} {
      min-width: 89px;
    }
  }
`;
