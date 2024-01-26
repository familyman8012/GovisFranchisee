import React from 'react';
import styled from '@emotion/styled';
import { Progress } from '@ComponentFarm/chart/Progress';

export const ProgressStatus = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-gray8);
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 120%;

  .label {
    width: 7.1rem;
    margin-right: 1rem;
  }

  .txt_progress {
    margin-left: 1rem;
  }
`;

export const ProgressStatusExample = () => {
  return (
    <ProgressStatus>
      <span className="label">제조수</span>
      <Progress
        width="31.4rem"
        height="0.8rem"
        color="var(--color-green30)"
        progress={50}
      />
      <span className="txt_progress">14%</span>
    </ProgressStatus>
  );
};
