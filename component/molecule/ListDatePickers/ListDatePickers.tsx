import React from "react";
import dayjs from "dayjs";
import { QueryParams } from "HookFarm/useQueryParams";
import DatePicker from "../../modules/DatePicker/DatePicker";

export type dateConfigType = {
  field: string;
  placeholder: string;
  minDate?: string;
}[];

interface ListDatePickersProps {
  dateConfig: dateConfigType;
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
}

const ListDatePickers = ({
  dateConfig,
  params,
  updateParams,
}: ListDatePickersProps) => {
  const getMinDateForField = (field: string) => {
    const config = dateConfig.find((item) => item.field === field);
    if (config && config.minDate && params[config.minDate]) {
      return dayjs(String(params[config.minDate])).toDate();
    }
    return undefined;
  };

  return (
    <>
      {dateConfig.map((item, i) => (
        <div key={item.field} className={`field field${i + 1}`}>
          <DatePicker
            selectedDate={String(params[item.field] ?? "")}
            onChange={(value: string) =>
              updateParams({ [item.field]: value, current_num: 1 })
            }
            placeholderText={item.placeholder}
            minDate={getMinDateForField(item.field)}
          />
        </div>
      ))}
    </>
  );
};

export default ListDatePickers;
