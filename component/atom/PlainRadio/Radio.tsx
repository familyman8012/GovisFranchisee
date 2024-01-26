import React from 'react';
import { CheckBoxSize, RadioBoxWrap } from './style';

interface CheckBoxProps {
  value?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  chksize?: CheckBoxSize;
}

const Radio: React.FC<CheckBoxProps> = ({
  value,
  checked,
  onChange,
  chksize = 'md',
}) => {
  return (
    <RadioBoxWrap
      value={value}
      type="radio"
      checked={checked}
      onChange={onChange}
      chksize={chksize}
    />
  );
};

export default Radio;
