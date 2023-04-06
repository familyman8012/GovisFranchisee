import styled from "@emotion/styled";
import { FormCheckbox, FormRadio } from "ComponentsFarm/elements/Checkbox";
import { PALLETES } from "LibFarm/color";

export const Checkbox = styled(FormCheckbox)`
  height: 32px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1;
  padding: 0 0.75rem;

  &.gv-checkbox--checked {
    background: ${PALLETES["primary-2"]} !important;
    color: ${PALLETES["white"]} !important;
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
