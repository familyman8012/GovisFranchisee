import { css } from '@emotion/react';

const ScoreLabel = ({
  cx,
  cy,
  value,
}: {
  cx?: number;
  cy?: number;
  value?: number;
}) => {
  return (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="central"
      css={css`
        font-size: 2.3rem;
        font-weight: 800;
        fill: #ef6d85;
      `}
    >
      {value?.toFixed(1)}점
    </text>
  );
};

export default ScoreLabel;
