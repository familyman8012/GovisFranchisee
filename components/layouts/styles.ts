import styled from "@emotion/styled";
import { Common } from "StyleFarm/common";
import { grid } from "./gridsty";

export const Container = styled.div`
  padding: 24px 20px 114px;
  margin: 0 auto;
`;

export const LayoutWrap = styled.div`
  max-width: 100%;
  margin: 56px auto;

  &.fullWidth {
    max-width: 100vw !important;
  }

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }

  &.fullWidth {
    ${Container} {
      @media (min-width: 576px) {
        max-width: 540px;
      }
      @media (min-width: 768px) {
        max-width: 720px;
      }
      @media (min-width: 992px) {
        max-width: 960px;
      }
      @media (min-width: 1400px) {
        max-width: 1320px;
      }
    }
  }

  ${grid}
`;

export const LayoutHead = styled.div`
  position: fixed;
  z-index: 3;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  color: #333;
  font-weight: bold;
  border-bottom: 1px solid #dedede;
  background-color: #fff;

  .btn_menu_list {
    padding: 0;
    color: #dadada;
    z-index: 10;
  }

  h1 {
    position: absolute;
    z-index: 9;
    width: 100%;
    margin-left: -16px;
    margin-bottom: 0;
    padding: 16px;
    text-align: center;
    color: #333;
    font-size: 14px;
    font-weight: 500;
  }

  .btn_store_select {
    position: relative;
    overflow: hidden;
    margin-left: auto;
    z-index: 10;

    .txt {
      margin-right: 3px;
      text-align: right;

      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      font-weight: bold;
      color: rgb(130, 130, 130);
      letter-spacing: -1px;
    }

    .txt,
    svg {
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
    }
  }
`;

export const ContentsArea = styled.div`
  min-height: calc(100vh - 56px);
  background: #fafafa;
  display: inline-block;
  width: 100%;
`;

export const Row = styled.div`
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
`;

export const Col = styled.div`
  flex: 1 0 0%;
`;

export const SideMenu = styled.div`
  position: fixed;

  display: flex;
  flex-direction: column;
  z-index: 1045;
  bottom: 0;
  top: 0;
  left: -300px;
  max-width: 100%;
  width: 300px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #fff;
  background-clip: padding-box;
  outline: 0;
  transition: transform 0.3s ease-in-out;
  &.on {
    transform: translateX(300px);
  }
`;

export const MenuSection = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  padding: 20px;
`;

export const UserInfoBox = styled.div`
  padding-bottom: 19px;
  border-bottom: 1px solid #efefef;
  display: flex;
  flex-direction: column;
  .name {
    margin-bottom: 4px;
    color: #212529;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.2;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .email {
    color: #bdbdbd;
  }

  .btn_welfare {
    position: relative;
    right: -10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    border: 1px solid currentColor;
    padding: 5px 8px;
    border-radius: 4px;
    margin-right: 10px;
    font-size: 12px;
    font-weight: 500;
    background-color: #fff;
    color: #4f4f4f;

    svg {
      width: 14px;
      height: 14px;
      margin-left: 5px;
    }
  }
`;

export const MenuListBox = styled.div`
  h2 {
    margin: 19px 0 10px;
    font-size: 16px;
    font-weight: bold;
  }

  li {
    a {
      display: block;
      padding: 10px 21px;
      margin: 0 -20px;
      color: #4f4f4f;
      font-size: 14px;
      text-decoration: none;

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

export const LnbBottom = styled.div`
  /* position: relative; */
  flex: none;
  color: #828282;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;

  .btn_logout {
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    padding: 15px 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    svg {
      margin-right: 10px;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }

  .copyright {
    font-size: 10px;
    padding: 0 0 20px 20px;
  }
`;

export const StoreList = styled.ul`
  margin: -1rem;
  li {
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    text-align: left;
    cursor: pointer;
    span {
      margin: 0;
      cursor: pointer;
    }

    &.selected {
      pointer-events: none;
    }

    &:not(.selected) {
      cursor: pointer;
      &:hover,
      &:active {
        background-color: #f2f2f2;
      }
    }

    &:not(:last-of-type) {
      border-bottom: 1px solid #e0e0e0;
    }

    .icon {
      width: 20px;
      height: 20px;
      color: ${Common.color.$primary3};
    }
  }
`;

export const Pagination = styled.ul`
  display: flex;
  padding-left: 0;
  list-style: none;
  margin-bottom: 0;

  li.page-item {
    &:first-of-type {
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }
    &:not(:first-of-type) .page-link {
      margin-left: -1px;
    }
    &:last-of-type {
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }

  li.page-item.active {
    .page-link {
      z-index: 3;
      color: #fff;
    }
  }

  .page-link {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0;
    width: 2.375rem;
    height: 2rem;
    color: #061138;
    font-weight: 500;
    font-size: 1rem;
    line-height: 12px;
    letter-spacing: 0.1px;
    text-align: center;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    svg {
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      width: 1.3rem;
      height: 1.3rem;
    }
    &:hover {
      z-index: 2;
      color: #0a58ca;
      background-color: #e9ecef;
      border-color: #dee2e6;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 16px 20px calc(16px + 1.5rem);
  background: #fff;
  box-shadow: 2px 2px 5px 0 rgb(51 51 51 / 10%);
  position: relative;
`;

export const FormControl = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    color: #212529;
    background-color: #fff;
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }

  &.coupon-form__input {
    font-size: 1.5rem;
    height: 60px;
    flex: 1;
    width: 100%;
    font-weight: 500;
  }
`;

export const Offcanvas = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1045;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  background-color: #fff;
  background-clip: padding-box;
  outline: 0;
  transition: transform 0.3s ease-in-out;
  &.bottom {
    right: 0;
    left: 0;
    height: 30vh;
    max-height: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    transform: translateY(100%);
  }

  &.on {
    transform: none;
    transition: transform 0.3s ease-in-out;
  }
`;

export const OffcanvasBackDrop = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;

  .on {
  }

  ${({ show }) =>
    show ? "display:block;opacity:0.5;" : "display:none;opacity:0;"};
  transition: "opacity 500ms , display 500ms";
`;
