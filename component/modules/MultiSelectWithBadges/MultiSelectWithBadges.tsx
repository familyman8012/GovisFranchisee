import React from 'react';
import Select from 'react-select';
import { Button } from '@ComponentFarm/atom/Button/Button';
import { Sync } from '@ComponentFarm/atom/icons';
import Cross from '@ComponentFarm/atom/icons/Cross';
import { ReactMultiSelectWrap } from './style';

export interface IOption {
  value: string;
  label: string;
}

interface MultiSelectWithBadgesProps {
  options: IOption[];
  selectedOptions: IOption[];
  onChange: (options: IOption[]) => void;
  isDisabled?: boolean;
}

const MultiSelectWithBadges: React.FC<MultiSelectWithBadgesProps> = ({
  options,
  selectedOptions,
  onChange,
  isDisabled,
}) => {
  const handleRemoveBadge = (valueToRemove: string) => {
    const updatedOptions = selectedOptions.filter(
      (option: IOption) => option.value !== valueToRemove
    );
    onChange(updatedOptions);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <ReactMultiSelectWrap>
      <div className="wrap_select">
        <Select
          isMulti
          isDisabled={isDisabled}
          className="react-select-container"
          classNamePrefix="react-select"
          options={options as any}
          value={selectedOptions}
          onChange={selected => onChange(selected as IOption[])}
          // components={{
          //   MultiValue: () => null, // 선택된 항목들을 숨김
          // }}
        />
        {selectedOptions.length > 0 && !isDisabled && (
          //   <button type="button" onClick={handleClearAll}>
          //     All Clear
          //   </button>
          <Button
            className="btn_reset"
            variant="transparent"
            onClick={handleClearAll}
            LeadingIcon={<Sync />}
          >
            초기화
          </Button>
        )}
      </div>
      <div className="badges">
        {selectedOptions.map((option: IOption) => (
          <span key={option.value} className="badge">
            {option.label}
            <button
              type="button"
              onClick={() => handleRemoveBadge(option.value)}
            >
              <Cross />
              <span className="hiddenZoneV">삭제</span>
            </button>
          </span>
        ))}
      </div>
    </ReactMultiSelectWrap>
  );
};

export default MultiSelectWithBadges;
