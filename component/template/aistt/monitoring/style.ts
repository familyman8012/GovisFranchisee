import { breakpoints, mediaMaxWidth } from "@ComponentFarm/common";
import styled from "@emotion/styled";

export const MonitoringPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6.4rem;
  /* min-height: calc(100vh - 13.4rem); */
  ${mediaMaxWidth(breakpoints[2])} {
    padding-top: 3.2rem;
  }
`;

export const MonitoringListStyle = styled.div`
  border-radius: 0.4rem;

  h2 {
    margin-bottom: 3.2rem;
    font-weight: 600;
  }

  .wrap {
    border-radius: 0.4rem;
    min-height: 46.6rem;

    display: flex;
    flex-direction: row;
    align-items: stretch;

    > .view {
      flex: 1;
      padding-left: 2.4rem;
      width: calc(100% - 30rem);
      min-height: 60rem;
    }
  }

  .side {
    position: relative;
    flex: none;
    width: 30rem;
    max-width: 40rem;
  }

  .list {
    width: 100%;
    max-height: 60rem;
    border-radius: 0.8rem;
    padding-bottom: 1.2rem;
    overflow-y: auto;
    overscroll-behavior: contain;
    background-color: var(--color-gray1);
    border: 1px solid var(--color-neutral90);
  }

  ${mediaMaxWidth(breakpoints[2])} {
    .wrap {
      flex-direction: column;
      padding: 0 1.6rem;

      > .view {
        width: 100%;
        padding-left: 0;
        min-height: 0;
      }
    }

    .side {
      width: 100%;
      max-width: 100%;
    }

    .list {
      max-height: 37.5rem;
      overscroll-behavior: none;
    }
  }
`;
