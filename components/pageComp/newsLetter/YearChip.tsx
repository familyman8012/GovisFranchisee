import { useCallback, useMemo } from "react";
import dayjs from "dayjs";

import { HeaderRadio } from "ComponentsFarm/pageComp/newsLetter/Checkbox";

import style from "StyleFarm/scss/modules/NewsLetter.module.scss";

interface YearChipProps {
  initialYear: string;
  years: string[];
  onChangeYear: (year_chip_category: string) => void;
}

export default function YearChip({ initialYear, years, onChangeYear }: YearChipProps) {
  const handleChange = useCallback((value: any) => onChangeYear(value), []);

  return (
    <div className={`${style["news__header"]}`}>
      {years.map((year, i) => (
        <HeaderRadio
          key={i}
          checked={initialYear === `${year}`}
          value={`${year}`}
          label={`${year}`}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}
