import styled from '@emotion/styled';

export const LayoutWrap = styled.div``;

export const LeftMenuWrap = styled.div`
  /* display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh; */
  display: flex;
`;

export const GroupWrap = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 9.2rem;
  height: 100%;
  padding: 3.2rem 2.4rem;
  background: var(--color-blue60);

  h1 {
    width: 4.4rem;
    height: 6.7rem;
    margin-bottom: 0.6rem;
    background: url('/images/common/logo_title.svg') no-repeat left top / 100%
      auto;
  }

  ul {
    li {
      width: 4rem;
      margin-bottom: 0.8rem;
      button {
        display: block;
        background: transparent;
        cursor: pointer;

        .box_svg {
          display: block;
          padding: 0.8rem;
        }
      }

      &.on {
        background: #101464;
        border-radius: 0.4rem;
        svg {
          g,
          path {
            opacity: 1;
          }
        }
      }
    }
  }

  .area_user_setting {
    position: absolute;
    width: 2.2rem;
    height: 2.2rem;
    margin-left: 0.8rem;
    bottom: 4.2rem;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 2px;
      cursor: pointer;
      background: #fff;
    }
    &:after {
      content: '';
      position: absolute;
      right: -0.334rem;
      bottom: -0.334rem;
      width: 0.668rem;
      height: 0.668rem;
      border: 1px solid #192f64;
      border-radius: 50%;
      background: var(--color-orange60);
    }

    .layer_set_account {
      position: absolute;
      bottom: 0;
      left: 3.5rem;
      width: 14rem;
      height: 7.7rem;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 0.25rem;
      background: #fff;

      li {
        width: 100%;
        height: 50%;
        margin-bottom: 0;
        &:not(:last-of-type) {
          border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        }
      }
      button {
        width: 100%;
        height: 100%;
        justify-content: left;
        padding: 0 1.4rem;
        font-size: 1.4rem;
        font-weight: 400;

        &:hover {
          background: #e9ecef;
        }
      }
    }
  }
`;

export const MenuWrap = styled.div`
  position: fixed;
  left: 9.2rem;
  width: 22.8rem;
  height: 100%;
  padding: 3.2rem 2.4rem;
  background: #ebebf3;

  h2 {
    margin-bottom: 0.6rem;
    padding: 1rem 0.6rem;
    color: var(--color-blue60);
    font-size: 2.4rem;
    font-weight: var(--font-bold);
    line-height: 4.7rem;
  }

  > ul li {
    margin-bottom: 0.8rem;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  a {
    color: var(--color-neutral10);
  }
  .link_depth1 {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.2rem 0;
    border-radius: 0.4rem;
    cursor: pointer;
    .txt {
      display: block;
      padding: 0.8rem;
      font-size: 1.6rem;
      font-weight: var(--font-semiBold);
      line-height: 1.76rem;
      white-space: pre-line;
    }

    &:after {
      content: '';
      display: block;
      width: 2.4rem;
      height: 2.4rem;
      margin-left: auto;
      background: url('/images/common/arrow_right.svg') no-repeat left top /
        2.4rem;
      transition: transform 0.1s ease-in-out;
    }

    &.depth1Only {
      &:after {
        display: none;
      }
    }

    &.on {
      color: #292fb1;
      background: #d7ddf1;

      &:after {
        transform: rotate(90deg);
      }
    }
  }

  .depth2 {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.1s ease-in-out;

    &.on {
      padding: 0.8rem 0 0.8rem 5.5rem;
      max-height: 100rem;
    }

    li {
      .link_depth2 {
        display: block;
        padding: 1rem 0;

        &.on {
          color: var(--color-blue60);
          text-decoration: underline;
        }
      }
    }
  }
`;

export const Content = styled.main`
  width: calc(100% - 32rem);
  margin-left: 32rem;
  padding: 3.2rem;
`;

export const TitleAreaWrap = styled.div`
  display: flex;
  align-items: center;

  .btn_box {
    display: flex;
    margin-left: auto;
    min-height: 4.4rem;

    button {
      &:not(&:last-of-type) {
        margin-right: 0.8rem;
      }
    }
  }
`;

export const ListHandlerWrap = styled.div`
  padding: 3.2rem 0;
  .line {
    display: flex;
    &:not(&:last-of-type) {
      margin-bottom: 1.6rem;
    }
    .field {
      margin-right: 1.6rem;
    }
    button.btn_reset {
      min-width: auto;
      height: 4.4rem;
      padding: 0;
      color: var(--color-neutral60);
      svg {
        path {
          fill: var(--color-neutral50);
        }
      }
    }
  }

  button {
    min-width: auto;
  }

  .left {
    display: flex;
  }
  .right {
    margin-left: auto;
  }
`;
