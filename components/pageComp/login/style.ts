import styled from "@emotion/styled";
import { rgba } from "polished";
import { mq } from "ComponentsFarm/pageComp/mq";
import { PALLETES } from "LibFarm/color";

export const LoginWrap = styled.div`
  position: relative;
  background: #fff;
  min-height: 100vh;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginMain = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 450px;
  max-height: 600px;
  padding: 1.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 ${rgba(PALLETES["black"], 0.1)};

  ${mq[0]} {
    border: 0;
    box-shadow: none;
  }
`;

export const LoginLogo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    position: relative;
    top: -1rem;
    min-width: 180px;
    max-width: 220px;
    width: 100%;
    margin: 0 auto 14px;
    &:before {
      content: "";
      display: block;
      padding-bottom: 71%;
    }
  }
`;

export const LoginInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  height: 45px;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    outline: 0;
    border-color: #ff862c;
    box-shadow: 0 0 0 0.25rem ${rgba("#ff862c", 0.25)};
  }
`;

export const LoginInputLabel = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

export const LoginInputWrap = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 1rem;
  }
`;

export const LoginGuide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 1rem 0;
`;

export const Copyright = styled.p`
  margin: 1rem 0 0;
`;
