import React from 'react';
import styled from '@emotion/styled';

const ProgressWrap = styled.div<{ width: string; height: string; bg?: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 3.4rem;
  background: ${props => props.bg || 'var(--color-blue_gray20)'};
`;

const ProgressBar = styled.div<{ color: string; progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  border-radius: 3.4rem;
  background-color: ${props => props.color};
  transition: width 0.4s ease-in-out;
  /* animation: loadProgress 0.4s ease-in-out forwards;

  @keyframes loadProgress {
    from {
      width: 0;
    }
    to {
      width: ${props => props.progress};
    }
  } */
`;

interface ProgressProps {
  width: string;
  height: string;
  color: string;
  progress: number;
  bg?: string;
}

export const Progress = ({
  width,
  height,
  bg,
  color,
  progress,
}: ProgressProps) => {
  return (
    <ProgressWrap width={width} height={height} bg={bg}>
      <ProgressBar color={color} progress={progress} />
    </ProgressWrap>
  );
};
