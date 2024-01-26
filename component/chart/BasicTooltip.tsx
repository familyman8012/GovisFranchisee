import React from 'react';
import styled from '@emotion/styled';

const BasicTooltipWrap = styled.div`
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
      display: flex;
      span {
        &:nth-of-type(1) {
          margin-right: 0.4rem;
          color: #242424;
          font-family: 'Inter';
          font-size: 2rem;
          font-weight: 500;
        }
        &:nth-of-type(2) {
          display: flex;
          .txt {
            display: flex;

            text-align: center;
            font-family: 'Inter';
            font-size: 1.5rem;
            font-weight: 500;
            &:before {
              content: '';
              display: block;
              width: 1.2rem;
              height: 1.2rem;
              margin: 0 0.2rem 0 0.4rem;
            }
          }
          &.increase .txt {
            color: var(--color-green300);
            &:before {
              background: url('/images/icons/arrow_increase.svg') no-repeat left
                top;
            }
          }
          &.decrease .txt {
            color: #d1293d;
            &:before {
              background: url('/images/icons/arrow_decrease.svg') no-repeat left
                top;
            }
          }
        }
      }
    }
  }
`;

export const BasicTooltip = ({ active, payload, label }: any) => {
  const data = payload[0];
  if (active) {
    return (
      <BasicTooltipWrap>
        <dl>
          <dt>기준일 판매 수</dt>
          <dd>
            <span>{data?.payload?.base_sales_count.toLocaleString()}</span>
          </dd>
        </dl>
        <dl>
          <dt>비교일 판매 수</dt>
          <dd>
            <span>
              {data?.payload?.comparison_sales_count.toLocaleString()}
            </span>
          </dd>
        </dl>
        <dl>
          <dt>증감율</dt>
          <dd>
            <span>
              {data?.payload?.increase_decrease_number.toLocaleString()}
            </span>
            <span
              className={
                data?.payload?.increase_decrease_rate > 0
                  ? 'increase'
                  : data?.payload?.increase_decrease_rate < 0
                  ? 'decrease'
                  : ''
              }
            >
              <span className="txt">
                {data?.payload?.increase_decrease_rate.toLocaleString()}%
              </span>
            </span>
          </dd>
        </dl>
      </BasicTooltipWrap>
    );
  }

  return null;
};
