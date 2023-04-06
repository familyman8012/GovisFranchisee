import styled from "@emotion/styled";

export const BoxReview = styled.div`
  margin-top: 24px;
  padding: 16px;
  border: 1px solid #f2f2f2;
  border-radius: 10px;

  h6 {
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    margin-bottom: 16px;
  }

  ul {
    display: flex;
    margin-bottom: 16px;
  }

  p:last-of-type {
    margin-bottom: 0;
  }
`;
export const SelectRadioItem = styled.li<{
  i: number;
  sel: number;
}>`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  background: url("/img/ico_as_${({ i }) => `${i + 1}`}.svg") no-repeat left top;
  &:nth-of-type(${({ sel }) => `${sel}`}) {
    filter: invert(61%) sepia(53%) saturate(2362%) hue-rotate(339deg)
      brightness(104%) contrast(102%);
  }
`;
export const NoticeComplete = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  margin-top: 16px;
  padding: 0 16px;
  color: #bdbdbd;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.41 px;
  background: #f2f2f2;
`;
