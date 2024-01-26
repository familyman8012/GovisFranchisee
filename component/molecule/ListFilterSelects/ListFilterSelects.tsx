import React from "react";
import { Select } from "@ComponentFarm/atom/Select/Select";
import { QueryParams } from "HookFarm/useQueryParams";

type selectConfigType = {
  label: string;
  field: string;
  options: {
    value: string | number;
    label: string | number;
  }[];
}[];

interface ListFilterSelectsProps {
  selectConfig: selectConfigType;
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
}

const ListFilterSelects = ({
  selectConfig,
  params,
  updateParams,
}: ListFilterSelectsProps) => {
  return (
    <>
      {selectConfig.map((item, i) => (
        <div key={item.field} className={`field field${i + 1}`}>
          <Select
            options={item.options}
            selectedOption={String(params[item.field] ?? "")}
            setSelectedOption={({ value }: { value: string }) =>
              updateParams({ [item.field]: value, current_num: 1 })
            }
            placeholder="전체"
            prefixLabel={item.label}
          />
        </div>
      ))}
    </>
  );
};

export default ListFilterSelects;
