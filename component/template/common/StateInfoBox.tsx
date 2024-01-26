import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from '@emotion/styled';

export const StateInfoBoxWrap = styled.div`
  display: flex;
  padding: 3.2rem;
  align-items: center;
  flex: 1 0 0;
  border: 1px solid var(--color-gray6);
  border-left: 0.8rem solid var(--color-blue70);

  .item {
    display: flex;
    algin-items: center;
    &:before {
      display: block;
      content: '';
      width: 1px;
      height: 7.5rem;
      margin: 0 4.8rem;
      background: var(--color-gray6);
    }

    &:first-of-type:before {
      display: none;
    }
  }
  dl {
    display: flex;
    width: 12rem;
    flex-direction: column;
    justify-content: center;
    border-left: 0.1rem solid var(--color-gray6);

    &:first-of-type {
      margin-left: 0;
      border-left: 0;
    }
  }
  dt {
    margin-bottom: 2.4rem;
    color: var(--color-neutral50);
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.54rem;
  }
  dd {
    display: flex;
    align-items: baseline;

    .txt1 {
      color: var(--color-neutral10);
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 2.64rem;

      > span {
        display: inline-block;
        width: 7.8rem;
      }
    }

    .txt2 {
      margin-left: 0.3rem;
      color: var(--color-neutral50);
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 1.54rem;
    }

    .txt3 {
      margin-left: 1.2rem;
      color: var(--color-green50);
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.44rem;
    }
  }
`;

interface IStateInfoBoxItem {
  title: string;
  txt1: string;
  txt2?: string;
  txt3?: string;
}

interface IStateInfoBoxItemsProps {
  items: IStateInfoBoxItem[];
}

const StateInfoBox: FC<IStateInfoBoxItemsProps> = ({ items }) => {
  return (
    <StateInfoBoxWrap>
      {items.map((el, i) => (
        <div className="item" key={i}>
          <dl>
            <dt>{el.title}</dt>
            <dd>
              <span className="txt1">
                {el.txt1 !== 'undefined' ? (
                  el.txt1
                ) : (
                  <Skeleton width="100%" baseColor="#fcfcfc" />
                )}
              </span>
              {el.txt2 && <span className="txt2">{el.txt2}</span>}
              {el.txt3 && <span className="txt3">{el.txt3}</span>}
            </dd>
          </dl>
        </div>
      ))}
    </StateInfoBoxWrap>
  );
};

export default StateInfoBox;
