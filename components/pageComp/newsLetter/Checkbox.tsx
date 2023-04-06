import styled from "@emotion/styled";
import { FormRadio } from "ComponentsFarm/elements/Checkbox";
import { PALLETES } from "LibFarm/color";

export const HeaderRadio = styled(FormRadio)`
  height: 32px;

  &.gv-checkbox--checked {
    background: ${PALLETES["primary-2"]};
    color: ${PALLETES["white"]};
    border-color: ${PALLETES["primary-2"]};
    box-shadow: none;
  }

  .gv-checkbox__icon {
    display: none;
  }

  .gv-checkbox__label {
    margin-left: 0;
  }

  & + & {
    margin-left: 0.5rem;
  }
`;
