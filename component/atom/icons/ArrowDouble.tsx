import { css } from "@emotion/react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  viewBoxSize?: number;
  customCss?: any;
};
const ArrowDouble = ({ size, viewBoxSize, ...props }: Props) => (
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
    <g clip-path="url(#clip0_3604_457)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.10009 1.10081L5.99927 0L-0.00146484 6.00074L5.99927 11.9999L7.10009 10.8991L2.20093 6.00074L7.10009 1.10081Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 1.10081L10.8992 0L4.89844 6.00074L10.8992 11.9999L12 10.8991L7.10086 6.00074L12 1.10081Z"
        fill="black"
      />
    </g>
  </svg>
);
export default ArrowDouble;
