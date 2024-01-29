import styled from "@emotion/styled";

export const MonitoringPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.2rem;
  /* margin: 0 -3.2rem -3.2rem;
  padding: 0 3.2rem 3.2rem; */
  min-height: calc(100vh - 13.4rem);
`;

export const MonitoringListStyle = styled.div`
  border-radius: 0.4rem;

  .title {
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
      padding: 3.2rem;
      width: calc(100% - 30rem);
      min-height: 46.6rem;
    }
  }

  .side {
    position: relative;
    flex: none;
    width: 30rem;
    overflow-y: auto;
    max-width: 40rem;
    border-radius: 0.4rem;
  }

  .list {
    min-height: 46.6rem;
    border-radius: 0.4rem;
    padding-bottom: 1.2rem;
    background-color: var(--color-gray1);
    border: 1px solid var(--color-neutral90);
  }
`;
