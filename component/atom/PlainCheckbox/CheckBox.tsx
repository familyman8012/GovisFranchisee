import React from 'react';
// eslint-disable-next-line import/no-cycle
import { CheckBoxSize, CheckBoxWrap } from './style';

interface CheckBoxProps {
  value?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  chksize?: CheckBoxSize;
  readOnly?: boolean;
  disabled?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  checked,
  onChange,
  chksize = 'md',
  readOnly,
  disabled,
}) => {
  return (
    <CheckBoxWrap
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChange}
      chksize={chksize}
      readOnly={readOnly}
      disabled={disabled}
    />
  );
};

export default CheckBox;
