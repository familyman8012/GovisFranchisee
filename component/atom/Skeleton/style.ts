import { css } from '@emotion/react';

export const CardContainer = css`
  max-width: 345px;
  margin: 2rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

export const CardHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

export const CardContent = css`
  padding: 1rem;
`;
