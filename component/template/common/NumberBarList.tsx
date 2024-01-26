import React from 'react';
import styled from '@emotion/styled';
import Pic from '@ComponentFarm/atom/icons/Pic';

export const NumberBarWrap = styled.div`
  display: flex;
  align-items: center;
  height: 7.4rem;
  border-radius: 0.8rem;
  border: 1px solid var(--color-neutral90);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  background: var(--color-white);

  .txt_number {
    display: flex;
    width: 6.6rem;
    padding: 0 2.4rem;
    flex-direction: column;
    justify-content: center;
    color: var(--color-neutral50);
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: 110%; /* 1.76rem */
  }

  .thumb {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 9.7rem;
    width: 5rem;
    height: 5rem;
    margin: 0 2.4rem;
    padding: 0;
    border-radius: 0.8rem;
    background: var(--color-neutral90);

    img {
      width: 100%;
    }
  }

  .box1 {
    padding: 0 2.4rem;
    font-weight: 400;
    line-height: 120%;
    .line1 {
      margin-bottom: 0.8rem;
      color: var(--color-neutral10);
      font-size: 1.4rem;
    }
    .line2 {
      color: var(--color-neutral-50, #747474);
      font-size: 1.2rem;
    }
  }
  .box2 {
    margin: 0 1rem 0 auto;
    padding: 0 2.4rem;
    text-align: right;

    .line1 {
      color: var(--color-neutral10);
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 110%;
    }

    .line2 {
      margin-top: 0.6rem;
      color: var(--color-green50);
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 120%;
    }
  }
`;

export const NumberBar = ({
  index,
  data,
}: {
  index: number;
  data: {
    idx: number;
    imgUrl: string;
    box1Line1: string;
    box1Line2: string;
    box2Line1: string;
    box2Line2?: string;
  };
}) => {
  return (
    <NumberBarWrap>
      <div className="txt_number">
        {index < 9 ? `0${index + 1}` : index + 1}
      </div>
      <div className="thumb">
        {data.imgUrl ? <img src={data.imgUrl} alt={data.box1Line1} /> : <Pic />}
      </div>
      <div className="box1">
        <div className="line1">{data.box1Line1}</div>
        <div className="line2">{data.box1Line2}</div>
      </div>
      <div className="box2">
        <div className="line1">{data.box2Line1}</div>
        {data.box2Line2 && <div className="line2">{data.box2Line1}</div>}
      </div>
    </NumberBarWrap>
  );
};
