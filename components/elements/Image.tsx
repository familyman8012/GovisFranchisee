import NextImage, { ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "loaders"> {}

// wrapped by Next/Image Component
const Image = (props: Props) => <NextImage {...props} unoptimized />;

export default Image;
