import { css } from '@emotion/react';

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  viewBoxSize?: number;
  customCss?: any;
};
const Alert = ({ size, viewBoxSize, ...props }: Props) => (
  <svg
    css={css`
      ${props.customCss}
    `}
    xmlns="http://www.w3.org/2000/svg"
    width={size || 16}
    height={size || 16}
    fill="none"
    viewBox={`0 0 ${viewBoxSize || 24} ${viewBoxSize || 24}`}
  >
    <path
      fill="#747474"
      fillRule="evenodd"
      d="m5.515 16 1.18-1.182c.378-.378.586-.88.586-1.414V8.727c0-1.357.59-2.654 1.62-3.556a4.66 4.66 0 0 1 3.737-1.129c2.327.309 4.082 2.413 4.082 4.895v4.467c0 .534.208 1.036.585 1.413L18.485 16H5.516ZM14 18.341C14 19.24 13.084 20 12 20s-2-.76-2-1.659V18h4v.341Zm6.52-3.133-1.8-1.804V8.937c0-3.481-2.502-6.438-5.82-6.877a6.722 6.722 0 0 0-5.317 1.607 6.728 6.728 0 0 0-2.302 5.06l-.001 4.677-1.801 1.804a1.631 1.631 0 0 0-.354 1.782c.255.614.848 1.01 1.512 1.01H8v.341C8 20.359 9.794 22 12 22s4-1.641 4-3.659V18h3.363c.664 0 1.256-.396 1.51-1.009a1.63 1.63 0 0 0-.352-1.783Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Alert;
