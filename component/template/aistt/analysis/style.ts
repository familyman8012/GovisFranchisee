import styled from '@emotion/styled';

export const AnalysisPageStyle = styled.div`
  padding-top: 3.2rem;
  display: flex;
  flex-direction: column;

  .video-wrap {
    position: relative;
    width: 100%;
    max-width: 1536px;
    border-top-right-radius: 0.8rem;
    border-top-left-radius: 0.8rem;
    overflow: hidden;

    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &:before {
      display: block;
      content: '';
      padding-bottom: 56.25%;
    }

    .badge {
      position: absolute;
      z-index: 2;
      top: 1.6rem;
      right: 1.6rem;
    }
  }

  .info {
    margin-top: 3.2rem;
    padding-bottom: 1.6rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    h2 {
      flex: 100%;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: inline-flex;
        align-items: center;
      }
    }

    p {
      font-size: 1.6rem;
      font-weight: 400;
      color: var(--color-neutral50);

      & + p {
        margin-left: 1.6rem;
      }
    }

    .badge {
      margin-left: 1.6rem;
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
    font-size: 1.8rem;
    font-weight: bold;
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
