import styled from '@emotion/styled';

export const DevicePageStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.2rem;
  margin: 0 -3.2rem -3.2rem;
  padding: 0 3.2rem 3.2rem;
  min-height: calc(100vh - 13.4rem);

  &.bg-gray {
    background-color: var(--color-blue_gray10);
  }

  .status {
    display: flex;
    gap: 0 3.2rem;

    & > * {
      flex: 1;
    }
  }

  .camera-group .header {
    font-weight: 600;
    font-size: 1.6rem;
    border: 0;
    background-color: transparent;
    margin-bottom: 0;
    padding-left: 0.8rem;
  }

  .camera-group .option {
    display: inline-flex;
    align-items: center;
    margin-left: 0;
    border: 0;
    background-color: transparent;
    width: 100%;

    &:before {
      content: '';
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      margin-right: 1rem;
    }

    & + .option {
      margin-top: 0;
    }

    &.on::before {
      background-color: var(--color-green50);
    }

    &.off::before {
      background-color: var(--color-red50);
    }

    &.none::before {
      background-color: var(--color-gray5);
    }
  }

  .view > div:first-of-type {
    margin-bottom: 3.2rem;
  }

  .view > section:first-of-type {
    margin-top: 0;
  }
`;
