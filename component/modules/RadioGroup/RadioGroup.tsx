import React, { ReactNode, useState, useEffect } from 'react';
import { CheckBoxProps } from '@ComponentFarm/atom/Checkbox/CheckBox';
import Radio from '@ComponentFarm/atom/Radio/Radio';

export type CheckBoxSize = 'sm' | 'md';

export const sizes = {
  sm: '1.6rem',
  md: '2.4rem',
};

type OptionType = { label: string; subText?: string; value: string };
type RadioValueType = string;

export interface RadioGroupProps {
  chksize?: CheckBoxSize;
  children?: React.ReactNode;
  options?: OptionType[];
  defaultValue?: RadioValueType;
  onChange: (checkedValue: RadioValueType) => void;
  disabled?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  chksize,
  children,
  options,
  defaultValue = '',
  onChange,
  disabled = false,
}) => {
  const [checkedValue, setCheckedValue] =
    useState<RadioValueType>(defaultValue);

  const handleChange = (value: string) => {
    setCheckedValue(value);
    onChange(value);
  };

  useEffect(() => {
    if (defaultValue && defaultValue !== checkedValue) {
      handleChange(defaultValue);
    }
  }, [defaultValue]);

  const renderChildren = (nodes: ReactNode): ReactNode => {
    return React.Children.map(nodes, node => {
      if (React.isValidElement<CheckBoxProps>(node) && node.type === Radio) {
        const isChecked = checkedValue === String(node.props.value);
        return React.cloneElement(node, {
          checked: isChecked,
          onChange: () => handleChange(String(node.props.value)),
          disabled,
        });
      }

      if (React.isValidElement(node) && node.props.children) {
        const newProps = {
          children: renderChildren(node.props.children),
        };
        return React.cloneElement(node, newProps);
      }
      return node;
    });
  };

  const renderOptions = (optionArr: OptionType[]): ReactNode => {
    return optionArr.map(option => (
      <Radio
        key={option.value}
        value={option.value}
        checked={checkedValue === option.value}
        onChange={() => handleChange(option.value)}
        chksize={chksize}
        label={option.label}
        subText={option.subText}
        disabled={disabled}
      />
    ));
  };

  return (
    <span className="box_radio_group">
      {options ? renderOptions(options) : renderChildren(children)}{' '}
    </span>
  );
};

export default RadioGroup;
