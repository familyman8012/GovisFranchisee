import React from 'react';
import styled from '@emotion/styled';

const AreaDonutLegendWrap = styled.ul`
  display: grid;
  width: fit-content;
  margin: 0 auto;
  gap: 1.6rem 3.2rem;
  grid-template-columns: 1fr 1fr 1fr;
  min-width: 50rem;
  margin: 0 auto;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 0.4rem;

    dt {
      display: flex;
      align-items: center;
      .dot {
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.8rem;
        border-radius: 50%;
      }
      .txt {
        color: var(--color-neutral50);
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 120%;
      }
    }

    dd {
      margin-top: 1rem;
      padding-left: 2rem;

      .base_sales_count {
        color: var(--color-neutral10);
        font-size: 2.4rem;
        font-weight: 700;
        line-height: 110%;
      }

      .comparison_sales_count {
        font-size: 1.4rem;
        font-weight: 500;
      }
      .rate {
        margin-top: 0.5rem;
        font-size: 1.2rem;
        font-weight: 500;
      }
      .comparison_sales_count {
        margin: 0 0.5rem 0 1rem;
        color: var(--color-gray10);
      }

      .rate {
        &.increase .txt {
          color: var(--color-green50);
        }
        &.decrease .txt {
          color: var(--color-blue60);
        }
      }
    }
  }
`;

export const AreaDonutLegend = (props: any) => {
  const { payload } = props;

  return (
    <AreaDonutLegendWrap>
      {payload.map((data: any, index: number) => (
        <li key={`item-${index}`}>
          <dl>
            <dt>
              <span className="dot" style={{ background: data.payload.fill }} />
              <span className="txt">{data.payload.item_label}</span>
            </dt>
            <dd>
              <div>
                <span className="base_sales_count">
                  {data.payload.base_sales_count.toLocaleString()}
                </span>
                <span className="comparison_sales_count">
                  {data.payload.comparison_sales_count.toLocaleString()}
                </span>
              </div>
              <div
                className={`rate ${
                  data?.payload?.increase_decrease_rate > 0
                    ? 'increase'
                    : 'decrease'
                }`}
              >
                <span className="txt">
                  ({data?.payload?.increase_decrease_rate > 0 && '+'}
                  {data?.payload?.increase_decrease_rate}%)
                </span>
              </div>
            </dd>
          </dl>
        </li>
      ))}
    </AreaDonutLegendWrap>
  );
};
