import { css } from "@emotion/react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  viewBoxSize?: number;
  customCss?: any;
};
const ArrowPagination = ({ size, viewBoxSize, ...props }: Props) => (
  <svg
    css={css`
      ${props.customCss}
    `}
    xmlns="http://www.w3.org/2000/svg"
    width={size || 12}
    height={size || 12}
    fill="#000000"
    viewBox={`0 0 ${viewBoxSize || 12} ${viewBoxSize || 12}`}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.44996 0L9.55077 1.10081L4.65162 6.00074L9.55077 10.8991L8.44996 11.9999L2.44922 6.00074L8.44996 0Z"
      fill="black"
    />
  </svg>
);
export default ArrowPagination;
