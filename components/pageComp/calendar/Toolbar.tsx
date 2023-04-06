import React from "react";
import styled from "@emotion/styled";
import { ChevronLeft } from "@emotion-icons/bootstrap/ChevronLeft";
import { ChevronRight } from "@emotion-icons/bootstrap/ChevronRight";

import { IconButton } from "ComponentsFarm/elements/Button";
import { PALLETES } from "LibFarm/color";

const IconRoundButton = styled(IconButton)`
  border-radius: 50%;
`;

interface CalendarToolbarProps {
  dateText: string;
  loading?: boolean;
  onClickNext: () => void;
  onClickPrev: () => void;
}

export const CalendarToolbar: React.FC<CalendarToolbarProps> = ({ dateText, loading, onClickNext, onClickPrev }) => {
  return (
    <div className="gv-calendar__toolbar">
      <IconRoundButton
        size="sm"
        color={PALLETES["primary-3"]}
        icon={<ChevronLeft />}
        disabled={loading}
        onClick={onClickPrev}
      />
      <span className="gv-calendar__date">{dateText}</span>
      <IconRoundButton
        size="sm"
        color={PALLETES["primary-3"]}
        icon={<ChevronRight />}
        disabled={loading}
        onClick={onClickNext}
      />
    </div>
  );
};
