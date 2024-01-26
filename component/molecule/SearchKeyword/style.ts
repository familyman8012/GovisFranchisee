import styled from '@emotion/styled';
import { INPUT } from '@ComponentFarm/token';

export const SearchKeywordWrapper = styled.div`
  display: inline-flex;
  border: 1px solid ${INPUT.focusBorder};
  border-radius: 4px;
  height: ${INPUT.height};

  &:focus-within {
    border: 1px solid ${INPUT.focusBorder};
  }

  button,
  input {
    border: 0;
    height: 100%;

    &:active,
    &:hover,
    &:focus {
      border: 0;
    }
  }

  & > div:first-of-type {
    min-width: 11.9rem;
  }
`;
