import { css } from "@emotion/react";
import { ContentsArea } from "ComponentsFarm/layouts/styles";

//CSS Variables Setting

/*=============================================
=                  Colors                     =
=============================================*/

export const breakpoints = [200, 700, 800, 1200, 1600];
export const mq = breakpoints.map(
  (bp, i) =>
    `@media (min-width:${breakpoints[i]}px) and (max-width: ${
      breakpoints[i + 1]
    }px)`
);

const COLOR = {
  orange: "#FF4600",
  blue: "#4053ff",
  white: "#fff",
  black: "#000",
  lightGray: "#ececec",
  gray: "#fbfbfb",
  borderGray: "#E3E3E3",
  gold: "#C48B3F",
  loadingbg: "#e5e5e5",
};

/* Font sizes */
const FONT_SIZES = {
  h2: "24px",
  h3: "18px",
  label: "14px",
  formInput: "16px",
};

const forVariables = (obj: any, fn: any) =>
  Object.entries(obj).map(fn).join("\n");

const createVariables = (property: any, varName: any) =>
  forVariables(
    property,
    ([name, value]: any) => `--${varName}-${name} : ${value};`
  );

// const createSizeVariables = (sizes: any, varName: any) =>
//   forVariables(sizes, ([name, percentage]: any) => `--${varName}-${name} : ${percentage}rem;`);

const reset = css`
  /* CSS Document */

  :root {
    ${createVariables(FONT_SIZES, "size")}
    ${createVariables(COLOR, "color")}
    --swiper-navigation-size : 8rem;
  }

  /* Type Selector */
  * {
    outline: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-touch-callout: none;
    color: var(--color-black);
  }
  html {
    /* overflow: hidden;
    max-width: 100vw; */
    /* font-size: 10px !important; */
  }

  html,
  body {
    height: 100%;
    width: 100%;
    font-size: 10px;
  }
  body {
    overflow-x: hidden;
    max-width: 100vw;
    color: var(--color-black);

    &.overflowhidden {
      overflow: hidden;
    }
  }

  button:disabled {
    background: #cccccc !important;
  }

  body,
  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  form,
  fieldset,
  p,
  blockquote,
  button,
  figure,
  table {
    margin: 0;
    padding: 0;
    font-family: "Noto Sans KR", "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: normal;
  }
  img {
    display: block;
    width: 100%;
  }
  img,
  fieldset,
  button {
    border: 0 none;
  }

  ul,
  ol {
    list-style: none;
  }

  dt,
  dd {
    display: block;
  }
  /* input[type="radio"] {
    width: 14px;
    height: 14px;
    margin: 0;
    padding: 0;
  } */
  input[type="text"]::-ms-clear {
    display: none;
  }

  a {
    border: 0;
    cursor: pointer;
  }
  a:link {
    color: #000;
    text-decoration: none;
  }
  a:visited {
    color: #000;
    text-decoration: none;
  }
  a:hover {
    color: var(--color-orange);
    text-decoration: none;
  }
  a:active {
    color: #000;
    text-decoration: none;
  }
  em {
    font-style: normal;
  }

  //TypoSetting
  h2 {
    font-size: var(--size-h2);
    font-weight: bold;

    &.tit {
      text-align: center;
    }
  }

  fieldset,
  button {
    border: none;
  }
  hr,
  legend {
    display: none;
    clear: both;
  }
  iframe {
    width: 100%;
    height: 100%;
  }

  label {
    vertical-align: middle;
    cursor: pointer;
  }

  hr {
    display: none;
  }
  caption,
  legend {
    visibility: hidden;
    overflow: hidden;
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
  }
  table {
    border-collapse: collapse;
    table-layout: fixed !important;
    border-spacing: 0;
  }
  table caption {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    font-size: 0;
    line-height: 0;
  }
  iframe {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .hiddenZone {
    display: none;
  }
  .hiddenZoneV {
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
  .screen_out {
    overflow: hidden;
    position: absolute;
    width: 0;
    height: 0;
    line-height: 0;
    text-indent: -9999px;
  }

  .form-group {
    margin-bottom: 16px;

    h3 {
      margin-bottom: 24px;
      font-size: 18px;
      font-weight: bold;
    }

    label {
      margin-bottom: 8px;
      font-size: var(--size-label);
    }

    .product_info div,
    p {
      font-size: 14px;
    }

    section {
      padding: 24px 16px;
      border-bottom: 5px solid #f6f6f6;

      &.order_production {
        border-top: 5px solid #f6f6f6;
      }
    }

    .box_inp {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;

      input:not([type="checkbox"]),
      .txt_input {
        flex: 1 1 auto;
        padding: 13px 16px;
        border-radius: 6px;
        border: 1px solid var(--color-lightGray);
        font-size: var(--size-formInput);
        -webkit-appearance: none;
      }

      &:last-child {
        margin-bottom: 0;
      }

      select {
        flex: 1 1 auto;
        padding: 13px 16px;
        border-radius: 6px;
        border: 1px solid #ececec;
        font-size: 16px;
        appearance: none;
        background-image: linear-gradient(45deg, transparent 50%, gray 50%),
          linear-gradient(135deg, gray 50%, transparent 50%),
          linear-gradient(to right, #ccc, #ccc);
        background-position: calc(100% - 20px) calc(1.2em + 2px),
          calc(100% - 15px) calc(1.2em + 2px), 32rem;
        background-size: 5px 5px, 5px 5px, 1px 1.5em;
        background-repeat: no-repeat;
      }
    }

    lable + .box_inp {
      margin-top: 8px;
    }

    input {
      &[type="radio"] {
        vertical-align: middle;
      }
      & + input {
        margin-top: 8px;
      }
      & + p {
        margin-top: 24px;
      }
      &[type="radio"] + label {
        margin-left: 10px;
      }
    }
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .box_btn {
    button {
      min-width: 160px;
      min-height: 54px;
      white-space: nowrap;
      font-size: 14px;
      font-family: Lato, sans-serif;
      font-weight: 400;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      transition: all 0.2s cubic-bezier(0.33, 0, 0.2, 1);
      box-sizing: border-box;
      border: 1px solid;
      cursor: pointer;

      ${mq[1]} {
        width: calc(50% - 10px);
        min-width: auto;
        max-width: 160px;
      }

      &:nth-of-type(1) {
        margin-right: 10px;
      }
      &:nth-of-type(2) {
        margin-left: 10px;
      }

      &.btn_black {
        color: #ffffff;
        background-color: #222222;
        border-color: #222222;

        &:hover {
          background: rgba(0, 0, 0, 0.7);
        }
      }

      &.btn_white {
        color: #222222;
        background-color: transparent;
        border-color: #222222;
        opacity: 1;

        &:hover {
          color: #ffffff;
          background-color: #222222;
        }
      }
    }
  }

  ${ContentsArea} {
    background: #fff !important;
  }

  .box_spinner {
    .location_indicator {
      position: relative;
      width: 3rem;
      height: 4rem;

      &:before,
      &:after {
        position: absolute;
        content: "";
      }
      &:before {
        left: 0.5rem;
        width: 2rem;
        height: 2rem;
        border-radius: 100% 100% 100% 0;
        box-shadow: 0px 0px 0px 0.2rem var(--color-orange);
        background: var(--color-orange);
        -webkit-animation: mapping 1s linear infinite;
        -moz-animation: mapping 1s linear infinite;
        animation: mapping 1s linear infinite;
        -webkit-transform: rotate(-46deg);
        -moz-transform: rotate(-46deg);
        transform: rotate(-46deg);
      }
      &:after {
        width: 3rem;
        height: 1rem;
        border-radius: 100%;
        background-color: rgba(255, 70, 0, 0.2);
        top: 2.4rem;
        z-index: -1;
      }
    }
    @keyframes mapping {
      0% {
        top: 0;
      }
      50% {
        top: -0.5rem;
      }
      100% {
        top: 0;
      }
    }
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -3rem;
    margin-left: -3rem;

    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
  }

  /*LOADER-7*/

  .loader-7 .line {
    width: 0.8rem;
    position: absolute;
    border-radius: 0.5rem;
    bottom: 0;
    background: linear-gradient(to bottom, #1ee95d, #5714ce);
  }

  .loader-7 .line1 {
    left: 0;
    -webkit-animation: line-grow 0.5s ease alternate infinite;
    animation: line-grow 0.5s ease alternate infinite;
  }

  .loader-7 .line2 {
    left: 2rem;
    -webkit-animation: line-grow 0.5s 0.2s ease alternate infinite;
    animation: line-grow 0.5s 0.2s ease alternate infinite;
  }

  .loader-7 .line3 {
    left: 4rem;
    -webkit-animation: line-grow 0.5s 0.4s ease alternate infinite;
    animation: line-grow 0.5s 0.4s ease alternate infinite;
  }

  @keyframes line-grow {
    0% {
      height: 0;
    }
    100% {
      height: 75%;
    }
  }

  @media (min-width: 1400px) and (max-width: 1530px) {
    html {
      font-size: 9px;
    }
  }
  @media (min-width: 1200px) and (max-width: 1400px) {
    html {
      font-size: 8px;
    }
  }
  @media (min-width: 1000px) and (max-width: 1200px) {
    html {
      font-size: 7px;
    }
  }
  @media (min-width: 800px) and (max-width: 1000px) {
    html {
      font-size: 6px;
    }
  }
  @media (min-width: 670px) and (max-width: 800px) {
    html {
      font-size: 5px;
    }
  }

  @media (min-width: 501px) and (max-width: 670px) {
    html {
      font-size: 3.7px;
    }
  }

  @media (min-width: 200px) and (max-width: 500px) {
    html {
      font-size: 2.5px;
    }
  }

  @font-face {
    font-family: "icon_gomarket";
    src: url("/font/icon_gomarket.eot");
    src: url("/font/icon_gomarket.eot") format("embedded-opentype"),
      url("/font/icon_gomarket.ttf") format("truetype"),
      url("/font/icon_gomarket.woff") format("woff"),
      url("/font/icon_gomarket.svg") format("svg");
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  [class^="ico-market"],
  [class*=" ico-market"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: "icon_gomarket" !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @font-face {
    font-family: "icomoon";
    src: url("/font/icomoon.eot");
    src: url("/font/icomoon.eot") format("embedded-opentype"),
      url("/font/icomoon.ttf") format("truetype"),
      url("/font/icomoon.woff") format("woff"),
      url("/font/icomoon.svg") format("svg");
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  [class^="icomoon-"],
  [class*=" icomoon-"] {
    font-family: "icomoon" !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .ico-market-zigzag:before {
    content: "\\e9d0";
  }
  .ico-market-bag-border:before {
    content: "\\e9c4";
  }
  .ico-market-bag:before {
    content: "\\e9c5";
  }
  .ico-market-cart-border:before {
    content: "\\e9c6";
  }
  .ico-market-cart:before {
    content: "\\e9c7";
  }
  .ico-market-menu-border:before {
    content: "\\e9c8";
  }
  .ico-market-menu:before {
    content: "\\e9c9";
  }
  .ico-market-search-border:before {
    content: "\\e9ca";
  }
  .ico-market-search:before {
    content: "\\e9cb";
  }
  .ico-market-snowman-border:before {
    content: "\\e9cc";
  }
  .ico-market-snowman:before {
    content: "\\e9cd";
  }
  .ico-market-user-border:before {
    content: "\\e9ce";
  }
  .ico-market-user:before {
    content: "\\e9cf";
  }
  .ico-market-pushpin-big:before {
    content: "\\e9c3";
    color: #fff;
  }
  .ico-market-close-circle-line:before {
    content: "\\e9c2";
  }
  .ico-market-print:before {
    content: "\\e9c1";
  }
  .ico-market-file:before {
    content: "\\e9c0";
  }
  .ico-market-chevron-left-line-big2:before {
    content: "\\e900";
  }
  .ico-market-chevron-right-line-big2:before {
    content: "\\e901";
  }
  .ico-market-img-big:before {
    content: "\\e902";
  }
  .ico-market-account-circle-line-big:before {
    content: "\\e903";
  }
  .ico-market-add-circle-line-big:before {
    content: "\\e904";
  }
  .ico-market-customer-manage-line-big:before {
    content: "\\e905";
  }
  .ico-market-domain-line-big:before {
    content: "\\e906";
  }
  .ico-market-global-line-big:before {
    content: "\\e907";
  }
  .ico-market-orderlist-line-big:before {
    content: "\\e908";
  }
  .ico-market-payment-add-line-big:before {
    content: "\\e909";
  }
  .ico-market-pencil-line-big:before {
    content: "\\e90a";
  }
  .ico-market-product-line-big:before {
    content: "\\e90b";
  }
  .ico-market-sale-line-big:before {
    content: "\\e90c";
  }
  .ico-market-shipment-line-big:before {
    content: "\\e90d";
  }
  .ico-market-shop-line-big:before {
    content: "\\e90e";
  }
  .ico-market-account-circle-line:before {
    content: "\\e90f";
  }
  .ico-market-add-circle-line:before {
    content: "\\e910";
  }
  .ico-market-arrow-circle-right-line-big:before {
    content: "\\e911";
  }
  .ico-market-board-big:before {
    content: "\\e912";
  }
  .ico-market-board-line-big:before {
    content: "\\e913";
  }
  .ico-market-cancle-square-line:before {
    content: "\\e914";
  }
  .ico-market-category-big:before {
    content: "\\e915";
  }
  .ico-market-channelad:before {
    content: "\\e916";
  }
  .ico-market-customer-manage-line:before {
    content: "\\e917";
  }
  .ico-market-dashboard-big:before {
    content: "\\e918";
  }
  .ico-market-detailsearch-line:before {
    content: "\\e919";
  }
  .ico-market-domain-big:before {
    content: "\\e91a";
  }
  .ico-market-domain-line:before {
    content: "\\e91b";
  }
  .ico-market-exchange-line:before {
    content: "\\e91c";
  }
  .ico-market-facebook-circle:before {
    content: "\\e91d";
  }
  .ico-market-facebook:before {
    content: "\\e91e";
  }
  .ico-market-flag-big:before {
    content: "\\e91f";
  }
  .ico-market-global-line:before {
    content: "\\e920";
  }
  .ico-market-grade-big:before {
    content: "\\e921";
  }
  .ico-market-img:before {
    content: "\\e922";
  }
  .ico-market-info-big:before {
    content: "\\e923";
  }
  .ico-market-instagram-line:before {
    content: "\\e924";
  }
  .ico-market-list-new-ilne:before {
    content: "\\e925";
  }
  .ico-market-naver:before {
    content: "\\e926";
  }
  .ico-market-order-big:before {
    content: "\\e927";
  }
  .ico-market-order-line-big:before {
    content: "\\e928";
  }
  .ico-market-orderlist-line:before {
    content: "\\e929";
  }
  .ico-market-payment-add-line:before {
    content: "\\e92a";
  }
  .ico-market-payment-complete-line:before {
    content: "\\e92b";
  }
  .ico-market-payment-wait-line:before {
    content: "\\e92c";
  }
  .ico-market-pencil-big:before {
    content: "\\e92d";
  }
  .ico-market-pencil-line:before {
    content: "\\e92e";
  }
  .ico-market-play-circle:before {
    content: "\\e92f";
  }
  .ico-market-product-line:before {
    content: "\\e930";
  }
  .ico-market-product-sell-line:before {
    content: "\\e931";
  }
  .ico-market-product-stop-line:before {
    content: "\\e932";
  }
  .ico-market-question-big:before {
    content: "\\e933";
  }
  .ico-market-quotation-big:before {
    content: "\\e934";
  }
  .ico-market-return-square-line:before {
    content: "\\e935";
  }
  .ico-market-sale-line:before {
    content: "\\e936";
  }
  .ico-market-search-line-big:before {
    content: "\\e937";
  }
  .ico-market-shipment-big:before {
    content: "\\e938";
  }
  .ico-market-shipment-line:before {
    content: "\\e939";
  }
  .ico-market-shipment-ready-line:before {
    content: "\\e93a";
  }
  .ico-market-shop-line:before {
    content: "\\e93b";
  }
  .ico-market-wrong-triangle-line:before {
    content: "\\e93c";
  }
  .ico-market-wrong:before {
    content: "\\e93d";
  }
  .ico-market-youtube:before {
    content: "\\e93e";
  }
  .ico-market-add-circle-big:before {
    content: "\\e93f";
  }
  .ico-market-answer-line:before {
    content: "\\e940";
  }
  .ico-market-arrow-next-line:before {
    content: "\\e941";
  }
  .ico-market-arrow-prev-line:before {
    content: "\\e942";
  }
  .ico-market-call-line:before {
    content: "\\e943";
  }
  .ico-market-chevron-left-line-big:before {
    content: "\\e944";
  }
  .ico-market-chevron-right-line-big:before {
    content: "\\e945";
  }
  .ico-market-close-line-big:before {
    content: "\\e946";
  }
  .ico-market-cs-line:before {
    content: "\\e947";
  }
  .ico-market-desktop-line:before {
    content: "\\e948";
  }
  .ico-market-download-line-big:before {
    content: "\\e949";
  }
  .ico-market-equals-circle-big:before {
    content: "\\e94a";
  }
  .ico-market-exit-line:before {
    content: "\\e94b";
  }
  .ico-market-guidebook-line:before {
    content: "\\e94c";
  }
  .ico-market-menu-line:before {
    content: "\\e94d";
  }
  .ico-market-minus-circle-big:before {
    content: "\\e94e";
  }
  .ico-market-mobile-line:before {
    content: "\\e94f";
  }
  .ico-market-news-line:before {
    content: "\\e950";
  }
  .ico-market-outlink-line:before {
    content: "\\e951";
  }
  .ico-market-question-line:before {
    content: "\\e952";
  }
  .ico-market-upload-line-big:before {
    content: "\\e953";
  }
  .ico-market-account-setting:before {
    content: "\\e954";
  }
  .ico-market-account:before {
    content: "\\e955";
  }
  .ico-market-add-circle:before {
    content: "\\e956";
  }
  .ico-market-answer-line-s:before {
    content: "\\e957";
  }
  .ico-market-api:before {
    content: "\\e958";
  }
  .ico-market-arrow-circle-right-line-s:before {
    content: "\\e959";
  }
  .ico-market-arrow-next:before {
    content: "\\e95a";
  }
  .ico-market-arrow-prev:before {
    content: "\\e95b";
  }
  .ico-market-badge:before {
    content: "\\e95c";
  }
  .ico-market-blog:before {
    content: "\\e95d";
  }
  .ico-market-board:before {
    content: "\\e95e";
  }
  .ico-market-calendar:before {
    content: "\\e95f";
  }
  .ico-market-call:before {
    content: "\\e960";
  }
  .ico-market-card:before {
    content: "\\e961";
  }
  .ico-market-category:before {
    content: "\\e962";
  }
  .ico-market-change:before {
    content: "\\e963";
  }
  .ico-market-check-circle:before {
    content: "\\e964";
  }
  .ico-market-check-line:before {
    content: "\\e965";
  }
  .ico-market-chevron-down-line:before {
    content: "\\e966";
  }
  .ico-market-chevron-left-line:before {
    content: "\\e967";
  }
  .ico-market-chevron-right-line:before {
    content: "\\e968";
  }
  .ico-market-chevron-up-line:before {
    content: "\\e969";
  }
  .ico-market-close-circle:before {
    content: "\\e96a";
  }
  .ico-market-close-line:before {
    content: "\\e96b";
  }
  .ico-market-coupon:before {
    content: "\\e96c";
  }
  .ico-market-cs-line-s:before {
    content: "\\e96d";
  }
  .ico-market-customer:before {
    content: "\\e96e";
  }
  .ico-market-dashboard:before {
    content: "\\e96f";
  }
  .ico-market-delete:before {
    content: "\\e970";
  }
  .ico-market-design:before {
    content: "\\e971";
  }
  .ico-market-desktop-line-s:before {
    content: "\\e972";
  }
  .ico-market-disconnect-line:before {
    content: "\\e973";
  }
  .ico-market-document:before {
    content: "\\e974";
  }
  .ico-market-domain:before {
    content: "\\e975";
  }
  .ico-market-download-line:before {
    content: "\\e976";
  }
  .ico-market-duplication:before {
    content: "\\e977";
  }
  .ico-market-extend:before {
    content: "\\e978";
  }
  .ico-market-grade:before {
    content: "\\e979";
  }
  .ico-market-guide-circle-line:before {
    content: "\\e97a";
  }
  .ico-market-guidebook-line-s:before {
    content: "\\e97b";
  }
  .ico-market-info-circle:before {
    content: "\\e97c";
  }
  .ico-market-info-triangle:before {
    content: "\\e97d";
  }
  .ico-market-info:before {
    content: "\\e97e";
  }
  .ico-market-link-line:before {
    content: "\\e97f";
  }
  .ico-market-list:before {
    content: "\\e980";
  }
  .ico-market-mail-line:before {
    content: "\\e981";
  }
  .ico-market-mail:before {
    content: "\\e982";
  }
  .ico-market-master:before {
    content: "\\e983";
  }
  .ico-market-menu-line-s:before {
    content: "\\e984";
  }
  .ico-market-mobile-line-s:before {
    content: "\\e985";
  }
  .ico-market-movecontrol:before {
    content: "\\e986";
  }
  .ico-market-naverpay:before {
    content: "\\e987";
  }
  .ico-market-news-line-s:before {
    content: "\\e988";
  }
  .ico-market-notice:before {
    content: "\\e989";
  }
  .ico-market-operatorsinfo:before {
    content: "\\e98a";
  }
  .ico-market-order:before {
    content: "\\e98b";
  }
  .ico-market-partcancle:before {
    content: "\\e98c";
  }
  .ico-market-pencil:before {
    content: "\\e98d";
  }
  .ico-market-plus-line:before {
    content: "\\e98e";
  }
  .ico-market-plus-square-line:before {
    content: "\\e98f";
  }
  .ico-market-point-circle:before {
    content: "\\e990";
  }
  .ico-market-preview-line:before {
    content: "\\e991";
  }
  .ico-market-price-circle:before {
    content: "\\e992";
  }
  .ico-market-price-global-circle:before {
    content: "\\e993";
  }
  .ico-market-product:before {
    content: "\\e994";
  }
  .ico-market-question-circle-line:before {
    content: "\\e995";
  }
  .ico-market-question-line-s:before {
    content: "\\e996";
  }
  .ico-market-quotation:before {
    content: "\\e997";
  }
  .ico-market-receipt-line:before {
    content: "\\e998";
  }
  .ico-market-reset:before {
    content: "\\e999";
  }
  .ico-market-review:before {
    content: "\\e99a";
  }
  .ico-market-search-line:before {
    content: "\\e99b";
  }
  .ico-market-security-1:before {
    content: "\\e99c";
  }
  .ico-market-security:before {
    content: "\\e99d";
  }
  .ico-market-setting:before {
    content: "\\e99e";
  }
  .ico-market-shipment:before {
    content: "\\e99f";
  }
  .ico-market-shop-setting:before {
    content: "\\e9a0";
  }
  .ico-market-statistic:before {
    content: "\\e9a1";
  }
  .ico-market-upgrade:before {
    content: "\\e9a2";
  }
  .ico-market-upload-line:before {
    content: "\\e9a3";
  }
  .ico-market-wrong-circle:before {
    content: "\\e9a4";
  }
  .ico-market-wrong1:before {
    content: "\\e9a5";
  }
  .ico-market-accounttransfer:before {
    content: "\\e9a6";
  }
  .ico-market-card-s:before {
    content: "\\e9a7";
  }
  .ico-market-home:before {
    content: "\\e9a8";
  }
  .ico-market-mobile-s:before {
    content: "\\e9a9";
  }
  .ico-market-pencil-s:before {
    content: "\\e9aa";
  }
  .ico-market-point-circle-s:before {
    content: "\\e9ab";
  }
  .ico-market-price-circle-s:before {
    content: "\\e9ac";
  }
  .ico-market-price-global-circle-s:before {
    content: "\\e9ad";
  }
  .ico-market-setting-s:before {
    content: "\\e9ae";
  }
  .ico-market-virtualaccount:before {
    content: "\\e9af";
  }
  .ico-market-check-line-s:before {
    content: "\\e9b0";
  }
  .ico-market-chevron-down-line-s:before {
    content: "\\e9b1";
  }
  .ico-market-chevron-left-line-s:before {
    content: "\\e9b2";
  }
  .ico-market-chevron-right-line-s:before {
    content: "\\e9b3";
  }
  .ico-market-chevron-up-line-s:before {
    content: "\\e9b4";
  }
  .ico-market-close-line-s:before {
    content: "\\e9b5";
  }
  .ico-market-plus-line-s:before {
    content: "\\e9b6";
  }
  .ico-market-chevron-down-line-xs:before {
    content: "\\e9b7";
  }
  .ico-market-chevron-left-line-xs:before {
    content: "\\e9b8";
  }
  .ico-market-chevron-right-line-xs:before {
    content: "\\e9b9";
  }
  .ico-market-chevron-up-line-xs:before {
    content: "\\e9ba";
  }
  .ico-market-expansion:before {
    content: "\\e9bb";
  }
  .ico-market-triangle-down:before {
    content: "\\e9bc";
  }
  .ico-market-triangle-left:before {
    content: "\\e9bd";
  }
  .ico-market-triangle-right:before {
    content: "\\e9be";
  }
  .ico-market-triangle-up:before {
    content: "\\e9bf";
  }

  .icomoon-airbnb:before {
    content: "\\e9c0";
  }

  .icomoon-airbnb-outline-round:before {
    content: "\\e9c1";
  }

  .icomoon-airbnb-outline-roundedSquare:before {
    content: "\\e9c2";
  }

  .icomoon-airbnb-outline-square:before {
    content: "\\e9c3";
  }

  .icomoon-ic-close-small-border:before {
    content: "\\e900";
  }

  .icomoon-SpanishFlag-outline-round:before {
    content: "\\e901";
  }

  .icomoon-SpanishFlag-outline-roundedSquare:before {
    content: "\\e902";
  }

  .icomoon-SpanishFlag-outline-square:before {
    content: "\\e903";
  }

  .icomoon-SpanishFlag:before {
    content: "\\e904";
  }

  .icomoon-naverPost:before {
    content: "\\e905";
  }

  .icomoon-naverPost-outline-round:before {
    content: "\\e906";
  }

  .icomoon-naverPost-outline-roundedSquare:before {
    content: "\\e907";
  }

  .icomoon-naverPost-outline-square:before {
    content: "\\e908";
  }

  .icomoon-bag:before {
    content: "\\e909";
  }

  .icomoon-bag-border:before {
    content: "\\e90a";
  }

  .icomoon-cart:before {
    content: "\\e90b";
  }

  .icomoon-cart-border:before {
    content: "\\e90c";
  }

  .icomoon-search:before {
    content: "\\e90d";
  }

  .icomoon-search-border:before {
    content: "\\e90e";
  }

  .icomoon-snowman:before {
    content: "\\e90f";
  }

  .icomoon-menu:before {
    content: "\\e910";
  }

  .icomoon-snowman-border:before {
    content: "\\e911";
  }

  .icomoon-user:before {
    content: "\\e912";
  }

  .icomoon-user-border:before {
    content: "\\e913";
  }

  .icomoon-menu-border:before {
    content: "\\e914";
  }

  .icomoon-daumCafe:before {
    content: "\\e915";
  }

  .icomoon-daumCafe-outline-round:before {
    content: "\\e916";
  }

  .icomoon-daumCafe-outline-roundedSquare:before {
    content: "\\e917";
  }

  .icomoon-daumCafe-outline-square:before {
    content: "\\e918";
  }

  .icomoon-naverCafe:before {
    content: "\\e919";
  }

  .icomoon-naverCafe-outline-round:before {
    content: "\\e91a";
  }

  .icomoon-naverCafe-outline-roundedSquare:before {
    content: "\\e91b";
  }

  .icomoon-naverCafe-outline-square:before {
    content: "\\e91c";
  }

  .icomoon-naverModoo:before {
    content: "\\e91d";
  }

  .icomoon-flickr:before {
    content: "\\e91e";
  }

  .icomoon-flickr-outline-round:before {
    content: "\\e91f";
  }

  .icomoon-flickr-outline-roundedSquare:before {
    content: "\\e920";
  }

  .icomoon-flickr-outline-square:before {
    content: "\\e921";
  }

  .icomoon-lock-round:before {
    content: "\\e922";
  }

  .icomoon-youtube:before {
    content: "\\e923";
  }

  .icomoon-youtube-outline-round:before {
    content: "\\e924";
  }

  .icomoon-youtube-outline-roundedSquare:before {
    content: "\\e925";
  }

  .icomoon-youtube-outline-square:before {
    content: "\\e926";
  }

  .icomoon-vimeo:before {
    content: "\\e927";
  }

  .icomoon-vimeo-outline-round:before {
    content: "\\e928";
  }

  .icomoon-vimeo-outline-roundedSquare:before {
    content: "\\e929";
  }

  .icomoon-vimeo-outline-square:before {
    content: "\\e92a";
  }

  .icomoon-blog:before {
    content: "\\e92b";
  }

  .icomoon-blog-outline-round:before {
    content: "\\e92c";
  }

  .icomoon-blog-outline-roundedSquare:before {
    content: "\\e92d";
  }

  .icomoon-blog-outline-square:before {
    content: "\\e92e";
  }

  .icomoon-facebook:before {
    content: "\\e92f";
  }

  .icomoon-facebook-outline-round:before {
    content: "\\e930";
  }

  .icomoon-facebook-outline-roundedSquare:before {
    content: "\\e931";
  }

  .icomoon-facebook-outline-square:before {
    content: "\\e932";
  }

  .icomoon-instagram:before {
    content: "\\e933";
  }

  .icomoon-instagram-outline-round:before {
    content: "\\e934";
  }

  .icomoon-instagram-outline-roundedSquare:before {
    content: "\\e935";
  }

  .icomoon-instagram-outline-square:before {
    content: "\\e936";
  }

  .icomoon-kakaoStory:before {
    content: "\\e937";
  }

  .icomoon-kakaoStory-outline-round:before {
    content: "\\e938";
  }

  .icomoon-kakaoStory-outline-roundedSquare:before {
    content: "\\e939";
  }

  .icomoon-kakaoStory-outline-square:before {
    content: "\\e93a";
  }

  .icomoon-kakaoTalk:before {
    content: "\\e93b";
  }

  .icomoon-kakaoTalk-outline-round:before {
    content: "\\e93c";
  }

  .icomoon-kakaoTalk-outline-roundedSquare:before {
    content: "\\e93d";
  }

  .icomoon-kakaoTalk-outline-square:before {
    content: "\\e93e";
  }

  .icomoon-kakaoYellowId:before {
    content: "\\e93f";
  }

  .icomoon-kakaoYellowId-outline-round:before {
    content: "\\e940";
  }

  .icomoon-kakaoYellowId-outline-roundedSquare:before {
    content: "\\e941";
  }

  .icomoon-kakaoYellowId-outline-square:before {
    content: "\\e942";
  }

  .icomoon-pinterest:before {
    content: "\\e943";
  }

  .icomoon-pinterest-outline-round:before {
    content: "\\e944";
  }

  .icomoon-pinterest-outline-roundedSquare:before {
    content: "\\e945";
  }

  .icomoon-pinterest-outline-square:before {
    content: "\\e946";
  }

  .icomoon-tumblr:before {
    content: "\\e947";
  }

  .icomoon-tumblr-outline-round:before {
    content: "\\e948";
  }

  .icomoon-tumblr-outline-roundedSquare:before {
    content: "\\e949";
  }

  .icomoon-tumblr-outline-square:before {
    content: "\\e94a";
  }

  .icomoon-twitter:before {
    content: "\\e94b";
  }

  .icomoon-twitter-outline-round:before {
    content: "\\e94c";
  }

  .icomoon-twitter-outline-roundedSquare:before {
    content: "\\e94d";
  }

  .icomoon-twitter-outline-square:before {
    content: "\\e94e";
  }

  .icomoon-telephone:before {
    content: "\\e94f";
  }

  .icomoon-telephone-outline-round:before {
    content: "\\e950";
  }

  .icomoon-telephone-outline-roundedSquare:before {
    content: "\\e951";
  }

  .icomoon-telephone-outline-square:before {
    content: "\\e952";
  }

  .icomoon-ChineseFlag:before {
    content: "\\e953";
  }

  .icomoon-ChineseFlag-outline-round:before {
    content: "\\e954";
  }

  .icomoon-ChineseFlag-outline-roundedSquare:before {
    content: "\\e955";
  }

  .icomoon-ChineseFlag-outline-square:before {
    content: "\\e956";
  }

  .icomoon-KoreanFlag:before {
    content: "\\e957";
  }

  .icomoon-KoreanFlag-outline-round:before {
    content: "\\e958";
  }

  .icomoon-KoreanFlag-outline-roundedSquare:before {
    content: "\\e959";
  }

  .icomoon-KoreanFlag-outline-square:before {
    content: "\\e95a";
  }

  .icomoon-AmericanFlag:before {
    content: "\\e95b";
  }

  .icomoon-AmericanFlag-outline-round:before {
    content: "\\e95c";
  }

  .icomoon-AmericanFlag-outline-roundedSquare:before {
    content: "\\e95d";
  }

  .icomoon-AmericanFlag-outline-square:before {
    content: "\\e95e";
  }

  .icomoon-naverModoo-outline-round:before {
    content: "\\e95f";
  }

  .icomoon-naverModoo-outline-roundedSquare:before {
    content: "\\e960";
  }

  .icomoon-naverModoo-outline-square:before {
    content: "\\e961";
  }

  .icomoon-email:before {
    content: "\\e962";
  }

  .icomoon-email-outline-round:before {
    content: "\\e963";
  }

  .icomoon-email-outline-roundedSquare:before {
    content: "\\e964";
  }

  .icomoon-email-outline-square:before {
    content: "\\e965";
  }

  .icomoon-linkedin:before {
    content: "\\e966";
  }

  .icomoon-linkedin-outline-round:before {
    content: "\\e967";
  }

  .icomoon-linkedin-outline-roundedSquare:before {
    content: "\\e968";
  }

  .icomoon-linkedin-outline-square:before {
    content: "\\e969";
  }

  .icomoon-global:before {
    content: "\\e96a";
  }

  .icomoon-global-outline-round:before {
    content: "\\e96b";
  }

  .icomoon-global-outline-roundedSquare:before {
    content: "\\e96c";
  }

  .icomoon-global-outline-square:before {
    content: "\\e96d";
  }

  .icomoon-camera:before {
    content: "\\e96e";
  }

  .icomoon-ic-close-small:before {
    content: "\\e96f";
  }

  .icomoon-down:before {
    content: "\\e970";
  }

  .icomoon-left:before {
    content: "\\e971";
  }

  .icomoon-lock:before {
    content: "\\e972";
  }

  .icomoon-right:before {
    content: "\\e973";
  }

  .icomoon-up:before {
    content: "\\e974";
  }

  .icomoon-upload:before {
    content: "\\e975";
  }

  .icomoon-write:before {
    content: "\\e976";
  }

  .icomoon-star:before {
    content: "\\e977";
  }

  .icomoon-star-outline:before {
    content: "\\e978";
  }

  .icomoon-androidMarket:before {
    content: "\\e979";
  }

  .icomoon-androidMarket-outline-round:before {
    content: "\\e97a";
  }

  .icomoon-androidMarket-outline-roundedSquare:before {
    content: "\\e97b";
  }

  .icomoon-androidMarket-outline-square:before {
    content: "\\e97c";
  }

  .icomoon-appleMarket:before {
    content: "\\e97d";
  }

  .icomoon-appleMarket-outline-round:before {
    content: "\\e97e";
  }

  .icomoon-appleMarket-outline-roundedSquare:before {
    content: "\\e97f";
  }

  .icomoon-appleMarket-outline-square:before {
    content: "\\e980";
  }

  .icomoon-windowsMarket:before {
    content: "\\e981";
  }

  .icomoon-windowsMarket-outline-round:before {
    content: "\\e982";
  }

  .icomoon-windowsMarket-outline-roundedSquare:before {
    content: "\\e983";
  }

  .icomoon-windowsMarket-outline-square:before {
    content: "\\e984";
  }

  .icomoon-naverTalk:before {
    content: "\\e985";
  }

  .icomoon-naverTalk-outline-round:before {
    content: "\\e986";
  }

  .icomoon-naverTalk-outline-roundedSquare:before {
    content: "\\e987";
  }

  .icomoon-naverTalk-outline-square:before {
    content: "\\e988";
  }

  .icomoon-VietnameseFlag:before {
    content: "\\e989";
  }

  .icomoon-VietnameseFlag-outline-round:before {
    content: "\\e98a";
  }

  .icomoon-VietnameseFlag-outline-roundedSquare:before {
    content: "\\e98b";
  }

  .icomoon-VietnameseFlag-outline-square:before {
    content: "\\e98c";
  }

  .icomoon-BritishFlag:before {
    content: "\\e98d";
  }

  .icomoon-naverLine:before {
    content: "\\e98e";
  }

  .icomoon-naverLine-outline-round:before {
    content: "\\e98f";
  }

  .icomoon-naverLine-outline-roundedSquare:before {
    content: "\\e990";
  }

  .icomoon-naverLine-outline-square:before {
    content: "\\e991";
  }

  .icomoon-naverBand:before {
    content: "\\e992";
  }

  .icomoon-naverBand-outline-round:before {
    content: "\\e993";
  }

  .icomoon-naverBand-outline-roundedSquare:before {
    content: "\\e994";
  }

  .icomoon-naverBand-outline-square:before {
    content: "\\e995";
  }

  .icomoon-BritishFlag-outline-round:before {
    content: "\\e996";
  }

  .icomoon-BritishFlag-outline-roundedSquare:before {
    content: "\\e997";
  }

  .icomoon-BritishFlag-outline-square:before {
    content: "\\e998";
  }

  .icomoon-JapaneseFlag:before {
    content: "\\e999";
  }

  .icomoon-JapaneseFlag-outline-round:before {
    content: "\\e99a";
  }

  .icomoon-JapaneseFlag-outline-roundedSquare:before {
    content: "\\e99b";
  }

  .icomoon-JapaneseFlag-outline-square:before {
    content: "\\e99c";
  }

  .icomoon-heart:before {
    content: "\\e99d";
  }

  .icomoon-share:before {
    content: "\\e99e";
  }

  .icomoon-googlePlus:before {
    content: "\\e99f";
  }

  .icomoon-googlePlus-outline-round:before {
    content: "\\e9a0";
  }

  .icomoon-googlePlus-outline-roundedSquare:before {
    content: "\\e9a1";
  }

  .icomoon-googlePlus-outline-square:before {
    content: "\\e9a2";
  }

  .icomoon-product-slide-previous:before {
    content: "\\e9a3";
  }

  .icomoon-product-slide-next:before {
    content: "\\e9a4";
  }

  .icomoon-ic-info:before {
    content: "\\e9a5";
  }

  .icomoon-naver:before {
    content: "\\e9a6";
  }

  .icomoon-naverBlog-outline-roundedSquare:before {
    content: "\\e9a7";
  }

  .icomoon-telegram:before {
    content: "\\e9a8";
  }

  .icomoon-telegram-outline-round:before {
    content: "\\e9a9";
  }

  .icomoon-telegram-outline-roundedSquare:before {
    content: "\\e9aa";
  }

  .icomoon-telegram-outline-square:before {
    content: "\\e9ab";
  }

  .icomoon-add:before {
    content: "\\e9ac";
  }

  .icomoon-less:before {
    content: "\\e9ad";
  }

  .icomoon-backToTop-arrow1-bold:before {
    content: "\\e9ae";
  }

  .icomoon-backToTop-arrow2-bold:before {
    content: "\\e9af";
  }

  .icomoon-backToTop-arrow3-bold:before {
    content: "\\e9b0";
  }

  .icomoon-backToTop-textArrow-bold:before {
    content: "\\e9b1";
  }

  .icomoon-backToTop-textEng-bold:before {
    content: "\\e9b2";
  }

  .icomoon-backToTop-textKor-bold:before {
    content: "\\e9b3";
  }

  .icomoon-backToTop-arrow1-normal:before {
    content: "\\e9b4";
  }

  .icomoon-backToTop-arrow2-normal:before {
    content: "\\e9b5";
  }

  .icomoon-backToTop-arrow3-normal:before {
    content: "\\e9b6";
  }

  .icomoon-backToTop-textArrow-normal:before {
    content: "\\e9b7";
  }

  .icomoon-backToTop-textEng-normal:before {
    content: "\\e9b8";
  }

  .icomoon-backToTop-textKor-normal:before {
    content: "\\e9b9";
  }

  .icomoon-backToTop-arrow1-thin:before {
    content: "\\e9ba";
  }

  .icomoon-backToTop-arrow2-thin:before {
    content: "\\e9bb";
  }

  .icomoon-backToTop-arrow3-thin:before {
    content: "\\e9bc";
  }

  .icomoon-backToTop-textArrow-thin:before {
    content: "\\e9bd";
  }

  .icomoon-backToTop-textEng-thin:before {
    content: "\\e9be";
  }

  .icomoon-backToTop-textKor-thin:before {
    content: "\\e9bf";
  }
`;

export default reset;
