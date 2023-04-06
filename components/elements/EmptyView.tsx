import React from "react";

import { toClasses } from "LibFarm/toClasses";
import { ExclamationCircle } from "@emotion-icons/bootstrap/ExclamationCircle";

interface EmptyViewProps {
  [otherProps: string]: any;
  tag?: React.FunctionComponent<{ className: string }> | string;
  full?: boolean;
  blockHeight?: boolean;
}

export const EmptyView: React.FC<EmptyViewProps> = ({ tag = "div", children, full, blockHeight, ...otherProps }) => {
  return React.createElement(
    tag,
    {
      ...otherProps,
      className: toClasses([
        "empty-view",
        full ? "empty-view--full" : "",
        blockHeight ? "empty-view--block-height" : "",
      ]),
    },
    <>
      <ExclamationCircle />
      <p>{children}</p>
    </>
  );
};
