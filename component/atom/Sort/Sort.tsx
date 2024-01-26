import React from "react";
import styled from "@emotion/styled";
import { QueryParams } from "HookFarm/useQueryParams";

const SortWrap = styled.div`
  margin-left: 0.3rem;
  .arrow {
    display: block;
    width: 0.8rem;
    height: 0.5rem;
    padding: 0.2rem 0.4rem 0.1rem;
    cursor: pointer;
    background: url("/images/common/arrow_sort.svg") no-repeat left top;

    &.down {
      margin-top: 2px;
      transform: rotate(180deg);
    }
  }
`;

type SortProps = {
  updateParams: (newParams: QueryParams) => void;
  field: string;
};

const Sort: React.FC<SortProps> = ({ updateParams, field }) => {
  const onSort = (sortField: string, sortOrder: "asc" | "desc") => {
    updateParams({
      sort_target: sortField,
      sort_type: sortOrder,
    });
  };

  return (
    <SortWrap>
      <button
        type="button"
        className="arrow up"
        onClick={() => onSort(field, "asc")}
      >
        <span className="hiddenZoneV">SORT ASC(오름차순)</span>
      </button>
      <button
        type="button"
        className="arrow down"
        onClick={() => onSort(field, "desc")}
      >
        <span className="hiddenZoneV">SORT DESC(내림차순)</span>
      </button>
    </SortWrap>
  );
};

export default Sort;
