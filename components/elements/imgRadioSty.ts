import styled from "@emotion/styled";

export const ImgRadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 0 20px;
`;

export const WrapImageRadio = styled.div<{
  i: number;
  width: number;
  height: number;
  url: string;
}>`
  label {
    display: inline-block;
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
    cursor: pointer;
  }
  ${({ url, i }) => `&:nth-of-type(${i + 1}) label {
  background: url("/images/${url}${i + 1}.svg") no-repeat left top;
}`}
`;

export const RadioButton = styled.input`
  display: none;
  &:checked + label {
    filter: invert(61%) sepia(53%) saturate(2362%) hue-rotate(339deg) brightness(104%) contrast(102%);
  }
`;
