import styled from '@emotion/styled';

export const ReactMultiSelectWrap = styled.div`
  width: 100%;

  .wrap_select {
    display: flex;
    .react-select-container {
      flex: 1;
      max-width: 30rem;
    }
    button.btn_reset {
      min-width: auto;
      min-height: 3.8rem;
      padding: 0;
      margin-left: 1.5rem;
      color: var(--color-neutral60);
    }
  }
  .react-select__value-container {
    position: relative;
  }
  .react-select__control:not(.react-select__control--menu-is-open)
    .react-select__value-container--has-value {
    &:before {
      position: absolute;

      left: 1rem;
      content: 'Select...';
      color: hsl(0, 0%, 50%);
    }
    .react-select__multi-value {
      display: none;
    }
  }
  .react-select__clear-indicator {
    display: none;
  }
  .badges {
    margin-top: 1rem;
  }
  .badge {
    display: inline-flex;
    margin-right: 1rem;
    aling-items: center;
    padding: 0.8rem 1rem;
    background-color: #eee;
    border-radius: 0.5rem;
    position: relative;
    button,
    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
    button {
      margin-left: 0.5rem;
      cursor: pointer;
    }
    svg {
      margin-top: 1px;
    }
    border: 1px solid hsl(0, 0%, 83%);
  }

  .remove-badge {
    margin-left: 0.5rem;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
  }
`;
