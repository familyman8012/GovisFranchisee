import React from 'react';
import styled from '@emotion/styled';
import { Badge } from '@ComponentFarm/atom/Badge/Badge';

interface FqsCardProps {
  label: string;
  title: string;
  value?: string;
  unit?: string;
  placeholder?: string;
  variant?: 'success' | 'error';
}

const CardContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2.4rem;
  border: 1px solid var(--color-neutral90);
  border-radius: 0.8rem;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  background-color: var(--color-gray1);
  color: var(--color-blue-gray50);
  overflow: hidden;

  .icon-wrap {
    display: flex;
    align-items: center;
    svg {
      width: 5.2rem;
      height: 5.2rem;
      color: var(--color-neutral50);
      path {
        stroke: currentColor;
      }
    }
  }

  .value-text {
    font-size: 2.4rem;
    font-weight: bold;
    display: inline-flex;
    align-items: center;
  }

  .unit {
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    color: var(--color-neutral50);
    vertical-align: middle;
    margin-left: 0.2rem;
    line-height: 1.1;
  }

  .placeholder {
    font-size: 1.2rem;
    font-weight: normal;
    color: var(--color-neutral50);
    vertical-align: middle;
    margin-left: 1.2rem;
  }

  &.success .placeholder,
  &.success svg {
    color: var(--color-green500);
  }

  &.error .placeholder,
  &.error svg {
    color: var(--color-red50);
  }

  h3 {
    font-size: 1.6rem;
    line-height: 1.1;
    margin: 0.8rem 0;
  }
`;

const FqsCard = ({
  title,
  label,
  unit,
  placeholder,
  variant,
  value,
}: FqsCardProps) => {
  return (
    <CardContainer className={variant ?? ''}>
      <div className="info">
        <Badge
          color={
            variant === 'success'
              ? 'green'
              : variant === 'error'
              ? 'red'
              : 'gray'
          }
          size="sm"
        >
          {label}
        </Badge>
        <h3>{title}</h3>
        <span className="value-text">
          {value}
          {unit && <span className="unit">{unit}</span>}
          {placeholder && <span className="placeholder">({placeholder})</span>}
        </span>
      </div>
    </CardContainer>
  );
};

export default FqsCard;
