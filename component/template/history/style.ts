import styled from '@emotion/styled';

export const InfiniteTableWrap = styled.div`
  width: 100%;
  overflow-y: auto;
  max-height: 48rem;
  border-radius: 0.6rem;
  border: 1px solid var(--color-neutral90);

  table.basic tr:hover {
    cursor: default !important;
  }

  thead {
    tr td,
    tr th {
      position: sticky;
      top: 0;
    }
  }
`;

export const HistoryPageLayout = styled.div`
  h2 {
    font-size: var(--font-size6);
    font-weight: bold;
    line-height: 1.55;
    padding: 3.2rem 0;
    margin-bottom: 3.2rem;
    border-bottom: 1px solid var(--color-neutral90);
  }
`;
