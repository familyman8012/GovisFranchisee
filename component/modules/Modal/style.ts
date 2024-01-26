import styled from '@emotion/styled';

export const AlertContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
  margin: -2.4rem -2.4rem 0;
  border-bottom: 1px solid var(--color-neutral90);
  .title {
    text-align: center;
    font-size: var(--font-size6);
    line-height: 1.55;
    font-weight: bold;
  }

  .content {
    font-size: var(--font-size4);
    line-height: 1.42;
    font-weight: normal;
    color: var(--color-neutral30);
    white-space: pre-wrap;
  }
`;
