import React from 'react';
import { TitleAreaWrap } from './styles';

interface TitleAreaProps {
  title: string;
  BtnBox?: React.ReactNode;
}

const TitleArea = ({ title, BtnBox }: TitleAreaProps) => {
  return (
    <TitleAreaWrap>
      <h1>{title}</h1>
      {BtnBox && <div className="btn_box">{BtnBox}</div>}
    </TitleAreaWrap>
  );
};

export default TitleArea;
