import React from 'react';
import styled from '@emotion/styled';

const CustomTooltipWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  position: relative;
  padding: 1.6rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.4rem;
  background: #fff;
  box-shadow: 0px 2.55556px 5.11111px 0px rgba(0, 0, 0, 0.04);
  .btn_close {
    position: absolute;
    bottom: -13px;
    left: 50%;
    transform: translateX(-50%);
  }

  dl {
    dt {
      margin-bottom: 0.6rem;
      color: var(--gray400);
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 120%;
    }
    dd {
      span {
        &:nth-of-type(1) {
          margin-right: 0.4rem;
          color: #242424;
          font-family: 'Inter';
          font-size: 2rem;
          font-weight: 500;
        }
        &:nth-of-type(2) {
          svg {
            margin-right: 0.2rem;
          }
          color: var(--color-green300);
          text-align: center;
          font-family: 'Inter';
          font-size: 1.5rem;
          font-weight: 500;
        }
      }
    }
  }
`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <CustomTooltipWrap>
        <dl>
          <dt>기준일 제조 수</dt>
          <dd>
            <span>879</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.00011 3.98425C6.25311 3.98425 6.49511 4.10075 6.66311 4.30525L8.76961 6.85425C9.02161 7.15975 9.07161 7.59325 8.89911 7.95975C8.74661 8.28325 8.44311 8.48425 8.10661 8.48425L3.89361 8.48425C3.55711 8.48425 3.25361 8.28325 3.10111 7.95975C2.92811 7.59325 2.97861 7.15975 3.23011 6.85475L5.33711 4.30525C5.50511 4.10075 5.74711 3.98425 6.00011 3.98425Z"
                  fill="#14804A"
                />
              </svg>
              3.4%
            </span>
          </dd>
        </dl>
        <dl>
          <dt>비교일 제조 수</dt>
          <dd>
            <span>653</span>
          </dd>
        </dl>
        <dl>
          <dt>증감율</dt>
          <dd>
            <span>226</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.00011 3.98425C6.25311 3.98425 6.49511 4.10075 6.66311 4.30525L8.76961 6.85425C9.02161 7.15975 9.07161 7.59325 8.89911 7.95975C8.74661 8.28325 8.44311 8.48425 8.10661 8.48425L3.89361 8.48425C3.55711 8.48425 3.25361 8.28325 3.10111 7.95975C2.92811 7.59325 2.97861 7.15975 3.23011 6.85475L5.33711 4.30525C5.50511 4.10075 5.74711 3.98425 6.00011 3.98425Z"
                  fill="#14804A"
                />
              </svg>
              12%
            </span>
          </dd>
        </dl>
      </CustomTooltipWrap>
    );
  }

  return null;
};

export default CustomTooltip;
