import styled from "@emotion/styled";

export const RegisterForm = styled.form`
  > label,
  > .box {
    display: block;
    margin-top: 24px;

    input::placeholder,
    textarea::placeholder {
      color: #e0e0e0;
    }
    .tit {
      margin-bottom: 4px;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #828282;
    }
    .gv-datepicker {
      display: block;
      border: none;
      input {
        padding-left: 0;
      }
      svg {
        top: 0px;
      }
    }
    input {
      margin-top: 0;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
    input[type="radio"],
    input[type="checkbox"] {
      width: 10px;
    }
  }
  .gv-datepicker__origin {
    transform: scale(1);
    width: 100%;
    height: 100%;
  }
  .box .wrap_radio {
    display: flex;
    max-width: 320px;
    justify-content: space-between;
  }
  .wrap_imgupload {
    display: flex;
    justify-content: space-between;
    max-width: 320px;
  }
  .error input[type="text"] {
    border-bottom: 1px solid #ef4747;
  }
  .error svg {
    color: #ef4747;
  }
  .error textarea {
    border: 1px solid #ef4747;
  }
`;

export const RegisterFormView = styled.div`
  .box {
    display: block;
    margin-top: 24px;
    .tit {
      margin-bottom: 4px;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #828282;
    }
  }
  .area_img_view {
    display: flex;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      width: 80px;
      height: 80px;
      margin-right: 5px;
      border-radius: 4px;
      background: #f2f2f2;
      &:last-of-type {
        margin-right: 0;
      }
      &.blank {
        display: none;
      }

      img {
        height: 100%;
      }

      color: #bdbdbd;
    }
  }
`;

export const MachineApplyView = styled.div`
  position: relative;
  padding-bottom: 30px;

  &.view {
    padding-bottom: 90px;
  }
  &.post {
    .contents-prefix-box {
      padding: 24px 0 30px;
      pre {
        margin: 0 20px;
      }
    }
  }

  .contents {
    padding-top: 0;
    padding-bottom: 0;
  }

  .recipe-feedback-post {
    padding: 0;
    .contents-info {
      margin: 0;
      padding: 20px 0;
      border-bottom: 1px solid #f2f2f2;

      .date {
        font-size: 12px;
      }
      .subject {
        font-size: 16px;
      }
    }
    form {
      padding: 0 20px;
    }
  }

  .box_btn_area {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;

    .btn {
      height: 60px;
      font-weight: 500;
      font-size: 16px;
      border-radius: 0;
    }
    .btn_modify {
      width: 24%;
      color: #333;

      background: #e0e0e0;
    }
    .btn_chat {
      width: 76%;
      color: #fff;
      background: #ff862c;

      .txt {
        margin-left: 7px;
      }
    }
    &.fin .btn_chat {
      width: 100%;
    }
  }
`;

export const ErrorTxt = styled.p`
  margin-top: 3px;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #eb5757;
`;

export const UploadWrapper = styled.div`
  position: relative;
  .testBtn {
    display: block;
    margin-top: 30px;
  }
  .textbox {
    width: 100px;
    height: 100px;
    background: #000;
  }
  .img-wrapper {
    display: flex;

    overflow: hidden;
    align-items: center;
    justify-content: center;
    width: 77px;
    height: 77px;
    background: #f2f2f2;
    border-radius: 4px;

    .inner {
      font-size: 12px;
      text-align: center;
    }

    img {
      height: 100%;
    }

    svg {
      color: #bdbdbd;
    }
  }
  .upload-button {
    margin-top: 5px;
    .btn {
      color: #fff;

      text-align: center;
    }
    .btn_add_file {
      display: inline-block;
      width: 100%;
      padding: 6px 0;
      font-size: 12px;
      line-height: 12px;
      border-radius: 4px;
      cursor: pointer;
      background-color: #ff862c;
    }
    .btn_del_file {
      display: flex;
      z-index: 10;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -3px;
      right: -3px;
      width: 20px;
      height: 20px;
      padding: 0;
      border-radius: 50%;
      background-color: #c9302c;
    }
  }
  .btn_machine_imgsend {
    width: 1px;
    height: 1px;
    overflow: hidden;
    display: block;
    visibility: hidden;
    position: absolute;
  }
`;
