import styled from "@emotion/styled";

export interface ICircleSize {
  [key: string]: {
    width: string;
    height: string;
    innerDotWidth: string;
    innerDotHeight: string;
  };
}

export interface ICircleColor {
  [key: string]: string;
}

const circleSizeDefine: ICircleSize = {
  xs: {
    width: "16px",
    height: "16px",
    innerDotWidth: "8px",
    innerDotHeight: "8px",
  },
  s: {
    width: "18px",
    height: "18px",
    innerDotWidth: "10px",
    innerDotHeight: "10px",
  },
  m: {
    width: "20px",
    height: "20px",
    innerDotWidth: "10px",
    innerDotHeight: "10px",
  },
  l: {
    width: "24px",
    height: "24px",
    innerDotWidth: "10px",
    innerDotHeight: "10px",
  },
};

export const Radio = styled.div<{ circleSize: string; circleColor: string }>`
  display: inline-block;
  label {
    position: relative;
    cursor: pointer;
  }
  input {
    position: absolute !important;
    opacity: 0;
    margin: 0;
  }

  &.default {
    label {
      display: flex;
      align-items: center;
      .ico_chk {
        position: relative;
        display: inline-block;
        content: "";

        ${({ circleSize }) =>
          circleSize !== ""
            ? `
            width: ${circleSizeDefine[circleSize].width};
            height: ${circleSizeDefine[circleSize].height};
            `
            : `
            width: 24px;
            height: 24px;
        `}

        margin-right: 6px;
        border-radius: 50%;
        border: 1px solid #bdbdbd;
      }
    }

    input {
      position: absolute !important;
      opacity: 0;
      margin: 0;
      &:checked + label .ico_chk {
        ${({ circleColor }) =>
          circleColor !== ""
            ? `
            border: 1px solid ${circleColor};
            `
            : `
            border: 1px solid #2f80ed;
        `}
      }
      &:checked + label .ico_chk::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        ${({ circleSize }) =>
          circleSize !== ""
            ? `
          width: ${circleSizeDefine[circleSize].innerDotWidth};
          height: ${circleSizeDefine[circleSize].innerDotHeight};
          `
            : `
          width: 10px;
          height: 10px;
      `}
        border-radius: 50%;
        ${({ circleColor }) =>
          circleColor !== ""
            ? `
            background:  ${circleColor};
            `
            : `
            background: #2f80ed;
        `}
      }

      &:disabled + label .ico_chk {
        border: 1px solid #bdbdbd !important;
        &::after {
          background: #bdbdbd !important;
        }
      }
    }
  }
  // 개별 스타일
  &.round {
    label {
      display: inline-block;
      height: 36px;
      padding: 0 26px;
      color: #828282;
      line-height: 36px;
      border: 1px solid #e0e0e0;
      border-radius: 20px;
    }
    input {
      &:checked + label {
        color: #ff862c;
        border: 1px solid #ffd5b5;
      }
    }
  }
`;

export const Check = styled.div`
  width: 100%;

  label {
    position: relative;
    vertical-align: top;
    margin-bottom: 0;
    font-weight: 400;
    cursor: pointer;

    &:before {
      content: "";
      display: inline-block;
      position: absolute;
      width: 22px;
      height: 22px;
      margin-left: -29px;
      border-radius: 50%;
      background: #f2f2f2;
    }
    &:after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 9px;
      left: 0;
      width: 7px;
      height: 10px;
      border: 2px solid #bdbdbd;
      border-left: none;
      border-top: none;
      transform: translate(7.75px, 4.5px) rotate(45deg);
    }
  }

  input {
    position: absolute !important;
    opacity: 0;
    margin: 0;

    &:checked + label:after {
      border: 2px solid #fff;
      border-left: none;
      border-top: none;
    }
  }

  // 개별 스타일
  &.default {
    label {
      padding-left: 29px;
      min-height: 22px;
      line-height: 22px;
    }
    input {
      &:checked + label::before {
        background-color: #ff862c;
      }
      &:checked + label:after {
        width: 7px;
        height: 10px;
        transform: translate(7.75px, 4.5px) rotate(45deg);
      }
    }
  }
`;

export const ListCheck = styled.div`
  overflow: hidden;
  height: 40px;
  margin-bottom: 4px;
  border: 1px solid #e0e0e0;
  background: #fff;
  border-radius: 4px;

  &.on {
    border: 1px solid #ffd5b5;
    background: #fff6f0;
  }

  &:last-of-type.on {
    height: auto;
  }

  div.default {
    label {
      display: block;
      padding: 9px 16px;
      &:before {
        position: absolute;
        right: 16px;
      }
      &:after {
        position: absolute;
        left: auto !important;
        right: 31px;
      }
    }
  }
  .box_inp_text {
    padding: 0 16px;
    margin-bottom: 10px;
    label {
      margin-bottom: 4px;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #828282;
    }
    input {
      background: transparent;
    }
  }
`;

export const TextArea = styled.textarea<{
  height: number;
}>`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
`;

export const ErrorTxt = styled.p`
  margin-top: 3px;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #eb5757;
`;

export const GvDatePickerWrap = styled.div`
  .react-datepicker__current-month,
  .react-datepicker-time__header {
    font-size: 1.44rem;
  }
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 3rem;
    line-height: 3rem;
  }
  .gv-datepicker__close {
    width: 30px;
    height: 30px;
    min-width: auto;
    border-radius: 50%;
    position: absolute;
    right: 0;
    bottom: -40px;
    color: #828282;
    background: #f2f2f2;
  }
`;
