import { breakpoints, mqMaxWidth } from "@ComponentFarm/common";
import styled from "@emotion/styled";

export const AnalysisPageStyle = styled.div`
  padding-top: 3.2rem;
  display: flex;
  flex-direction: column;

  .title {
    margin-bottom: 3.2rem;
  }

  .top {
    display: flex;
    flex-direction: row;

    .video {
      flex: 1;
      margin-right: 2.4rem;
    }

    .inspection-result {
      display: flex;
      flex-direction: column;
      width: 33.6rem;

      sub {
        display: inline-flex;
        font-size: 1.4rem;
        margin-bottom: 1.6rem;
        color: var(--color-neutral40);
      }

      .card {
        flex: 1;
        border-radius: 0.8rem;
        border: 1px solid var(--color-neutral90);
        background-color: var(--color-gray1);
        padding: 3.2rem;
      }

      .product {
        margin-bottom: 3.2rem;
      }

      .manufactor {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        .left {
          display: inline-flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .left p {
          font-size: 1.2rem;
          color: var(--color-neutral50);
        }

        .right {
          flex: none;

          button {
            max-width: 100%;
            min-width: auto !important;
            width: 100%;
          }
        }

        .bottom {
          flex: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--color-neutral60);
          border-top: 2px solid var(--color-neutral95);
          border-bottom: 2px solid var(--color-neutral95);
          padding: 2.4rem 0;
          margin: 2.4rem 0;
          width: 100%;
        }
      }

      .inspections {
        display: flex;
        flex-direction: column;
        padding: 1.6rem;
        gap: 1.6rem;
        background-color: var(--color-gray2);
        color: var(--color-gray9);

        .badge {
          margin-right: 0.8rem;
        }
      }
    }
  }

  .video-second-tags {
    display: inline-flex;
    align-items: center;
  }

  h2 {
    font-size: 2.4rem;
    font-weight: bold;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.5;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .content {
      margin-top: 3.2rem;
    }
  }

  .list {
    margin-top: 6.4rem;
  }

  ${mqMaxWidth(breakpoints[1])} {
    padding: 0 1.6rem;
    .top {
      margin-top: 3.2rem;
      flex-direction: column;

      .video {
        margin-right: 0;
        margin-bottom: 6.4rem;
      }

      .inspection-result {
        width: 100%;
      }

      .inspection-result .card {
        padding: 3.2rem 1.6rem;
      }
    }
  }
`;

export const VideoListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3.2rem -1.2rem 0;
  padding: 0;
  cursor: pointer;

  button {
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    background-color: transparent;
    appearance: none;
    cursor: pointer;
  }

  .item {
    flex: 0 0 auto;
    display: inline-flex;
    width: calc(25% - 2.4rem);
    flex-direction: column;
    border: 2px solid var(--color-neutral90);
    border-radius: 0.8rem;
    overflow: hidden;
    margin: 1.2rem;
    cursor: pointer;

    &:focus,
    &:hover {
      background-color: var(--color-blue90);
      border-color: var(--color-blue70);
    }

    &.loading {
      pointer-events: none;
      cursor: default;
    }
  }

  .img-wrap {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .badge {
      position: absolute;
      z-index: 2;
      top: 1rem;
      right: 1rem;
    }
  }

  .info-wrap {
    padding: 2.4rem;

    h3 {
      font-size: 2.4rem;
      line-height: inherit;
      line-height: 1.1;
    }

    .score {
      display: inline-flex;
      font-size: 1.4rem;
      padding: 0.2rem 0.4rem;
      color: var(--color-orange60);
      background-color: var(--color-gray3);
      margin: 1rem 0 1.6rem;
      border-radius: 0.2rem;
    }

    ul {
      margin-bottom: 2.2rem;
    }

    p {
      color: var(--color-neutral50);
      font-size: 1.4rem;
      line-height: 120%;
    }

    p + p {
      margin-top: 1rem;
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 1920px) {
    .item {
      width: calc(20% - 2.4rem);
    }
  }
`;
