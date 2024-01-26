import { css } from '@emotion/react';

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  viewBoxSize?: number;
  customCss?: any;
};
const Setting1 = ({ size, viewBoxSize, ...props }: Props) => (
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
      d="M4.403 11.622c1.116.383 2.005 1.317 2.377 2.501l.04.12c.426 1.256.253 2.608-.461 3.622-.13.184-.101.404.036.508l2.072 1.574a.253.253 0 0 0 .188.05.272.272 0 0 0 .182-.119l.23-.328a3.796 3.796 0 0 1 2.972-1.614 3.78 3.78 0 0 1 3.234 1.64l.118.17a.272.272 0 0 0 .182.12.231.231 0 0 0 .188-.05l2.06-1.555c.145-.108.177-.339.07-.494l-.26-.375a3.968 3.968 0 0 1-.532-3.359 3.915 3.915 0 0 1 2.492-2.614l.2-.068c.162-.053.249-.253.192-.437l-.787-2.52a.317.317 0 0 0-.155-.194.235.235 0 0 0-.187-.015l-.34.113a3.743 3.743 0 0 1-3.431-.564l-.108-.08a3.79 3.79 0 0 1-1.49-3.036l.003-.28a.353.353 0 0 0-.101-.254.254.254 0 0 0-.183-.08L10.657 4c-.156 0-.283.15-.284.333l-.001.242A3.926 3.926 0 0 1 8.85 7.67l-.13.098a3.915 3.915 0 0 1-3.634.597.162.162 0 0 0-.133.01.238.238 0 0 0-.118.147l-.817 2.596a.357.357 0 0 0 .22.45l.165.055ZM8.613 22c-.485 0-.957-.158-1.355-.46l-2.072-1.574c-.99-.75-1.21-2.193-.49-3.216.375-.53.452-1.21.232-1.857l-.055-.168c-.183-.582-.601-1.034-1.118-1.21h-.001l-.163-.058a2.344 2.344 0 0 1-1.481-2.94l.816-2.595A2.23 2.23 0 0 1 4.05 6.588a2.157 2.157 0 0 1 1.683-.116 1.916 1.916 0 0 0 1.777-.297l.129-.098c.456-.348.73-.913.733-1.51v-.24C8.379 3.041 9.403 2 10.657 2h.004l2.547.003c.602.001 1.17.24 1.598.67.443.445.685 1.04.683 1.675l-.002.28a1.78 1.78 0 0 0 .694 1.428l.107.081a1.74 1.74 0 0 0 1.594.264l.339-.113a2.226 2.226 0 0 1 1.732.132c.555.284.965.773 1.153 1.378l.787 2.521c.38 1.218-.278 2.532-1.465 2.93l-.201.066a1.918 1.918 0 0 0-1.21 1.286 1.949 1.949 0 0 0 .259 1.652l.26.375c.714 1.032.486 2.48-.508 3.23l-2.061 1.555a2.23 2.23 0 0 1-1.711.428 2.262 2.262 0 0 1-1.51-.957l-.117-.172c-.35-.504-.91-.81-1.497-.777a1.773 1.773 0 0 0-1.428.767l-.231.328a2.268 2.268 0 0 1-1.858.97ZM12 10.5c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5Zm0 5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Setting1;
