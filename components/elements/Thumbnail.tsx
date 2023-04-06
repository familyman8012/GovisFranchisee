import React from "react";

import { Image as ImageIcon } from "@emotion-icons/bootstrap/Image";

interface ImageAlternativeProps {
  full?: boolean;
  size?: number;
  children?: React.ReactNode;
}

export const AlternativeImage: React.FC<ImageAlternativeProps> = ({ children, full, size = 40 }) => {
  return (
    <div
      className={`gv-alternative-image ${full ? "gv-alternative-image--full" : ""} text-white bg-typo-5 weight-bold`}
    >
      <ImageIcon width={size} height={size} />
      {children && <div className="gv-alternative-image__content">{children}</div>}
    </div>
  );
};
