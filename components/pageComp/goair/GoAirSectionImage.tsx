import React, { useRef, useState, useEffect } from "react";

import style from "StyleFarm/scss/modules/Goair.module.scss";

import { toClasses } from "LibFarm/toClasses";
import { AlternativeImage } from "ComponentsFarm/elements/Thumbnail";

interface ImageViewerProps {
  src: string;
  thumbnail?: boolean;
  readonly?: boolean;
  onChange?: () => void;
}

export const GoAirImageSectionImage: React.FC<ImageViewerProps> = ({ src, thumbnail }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoaded(!!imageRef.current?.complete);
    setLoadFailed(false);
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setLoaded(true);
    setLoadFailed(true);
  };

  const showAlternativeImage = !loaded || loadFailed;

  return (
    <div className={toClasses([style["goair-section-image"], loaded ? style["goair-section-image--loaded"] : ""])}>
      <img ref={imageRef} src={src} onLoad={handleLoad} onError={handleError} />
      {showAlternativeImage && <AlternativeImage full size={thumbnail ? 20 : 40} />}
    </div>
  );
};
