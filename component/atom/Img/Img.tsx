import React from "react";

interface ImgProps {
  src: string;
  width: string;
  height: string;
  alt?: string;
}

const Img = ({ src, width, height, alt }: ImgProps) => {
  return (
    <img
      src={`https://dev.aistt-img.gopizza.kr/image/${width}x${height}?u=${src}`}
      alt={alt}
    />
  );
};

export default Img;
