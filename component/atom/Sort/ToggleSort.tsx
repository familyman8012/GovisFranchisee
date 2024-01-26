import React from 'react';
import styled from '@emotion/styled';

const SortWrap = styled.div`
  margin-left: 0.3rem;
  .arrow {
    display: block;
    width: 0.55rem;
    height: 0.55rem;
    cursor: pointer;
    background: url('/images/common/arrow_sort.svg') no-repeat left top;

    &.on {
      background: url('/images/common/arrow_sort_on.svg') no-repeat left top;
    }

    &.down {
      margin-top: 2px;
      transform: rotate(180deg);
    }
  }
`;

const ToggleSort = ({ el, sortState }: any) => {
  return (
    <SortWrap>
      <span
        className={`arrow up ${
          sortState.field === el.sort && sortState.type === 'asc' ? 'on' : ''
        }`}
      >
        <span className="hiddenZoneV">SORT ASC(오름차순)</span>
      </span>
      <span
        className={`arrow down ${
          sortState.field === el.sort && sortState.type === 'desc' ? 'on' : ''
        }`}
      >
        <span className="hiddenZoneV">SORT DESC(내림차순)</span>
      </span>
    </SortWrap>
  );
};

export default ToggleSort;
