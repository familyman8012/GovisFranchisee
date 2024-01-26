import styled from '@emotion/styled';

export const TimeInputStyle = styled.div`
  display: inline-flex;
  align-items: center;

  input {
    width: 10rem;
  }

  span {
    margin-left: 1.6rem;
    &:not(:last-child) {
      margin-right: 3.2rem;
    }
  }
`;
