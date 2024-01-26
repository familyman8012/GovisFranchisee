import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import DateRangePicker from '@ComponentFarm/modules/DateRange/DateRange';
import { BtnDelete, Button } from '@ComponentFarm/atom/Button/Button';
import Sync from '@ComponentFarm/atom/icons/Sync';
import { getTableWidthPercentage } from '@UtilFarm/calcSize';

export const FilterTable = styled.table`
  width: 100%;
  th,
  td {
    border: 1px solid var(--color-gray6);
  }
  th {
    width: fit-content;
    padding: 1.95rem 2rem 1.95rem 0;
    color: var(--color-neutral50);
    font-size: 1.4rem;
    font-weight: 700;
    border-left: none;
    text-align: right;
    background: var(--color-gray2);
  }
  td {
    border-right: 0;
    .inner {
      display: flex;
      align-items: center;
      padding: 0.8rem 1rem;
      border-right: none;

      button {
        min-width: auto;
        margin-right: 1.6rem;
      }

      .btn_box {
        display: flex;
        align-items: center;
      }

      .list_select_item {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.6rem 0;
      }
    }
  }
`;

export const FilterTableBtnBox = styled.div`
  diplay: flex;
  width: fit-content;
  margin: 3.6rem auto;

  button {
    width: 12.3rem;
    &:first-of-type {
      margin-right: 1.6rem;
    }
  }
`;

export const DiffDateRangerWrap = styled.div`
  display: flex;
  align-items: center;

  .box_daterange_input {
    margin: 0 1rem;
  }
`;

export type DateRangeType = [Date | null, Date | null];

const FilterTableForm = ({ params, updateParams }: any) => {
  const [selectedDateRanges, setSelectedDateRanges] = useState<{
    range1: DateRangeType;
    range2: DateRangeType;
  }>({
    range1: [null, null],
    range2: [null, null],
  });

  const handleDateRangeChange = (
    rangeIdentifier: 'range1' | 'range2',
    update: DateRangeType
  ) => {
    setSelectedDateRanges(prevRanges => ({
      ...prevRanges,
      [rangeIdentifier]: update,
    }));
  };

  const handleCheckDateRanges = () => {
    const { range1, range2 } = selectedDateRanges;
    if (
      range1.every(date => date !== null) &&
      range2.every(date => date !== null)
    ) {
      updateParams({
        base_dt_start: dayjs(range1[0]).format('YYYY-MM-DD'), // dayjs로 날짜 포맷팅
        base_dt_finish: dayjs(range1[1]).format('YYYY-MM-DD'),
        comparison_dt_start: range2[0]
          ? dayjs(range2[0]).format('YYYY-MM-DD')
          : '0000-00-00',
        comparison_dt_finish: range2[1]
          ? dayjs(range2[1]).format('YYYY-MM-DD')
          : '0000-00-00',
      });
    }
  };

  // URL의 쿼리 파라미터로부터 날짜 범위를 설정합니다.
  useEffect(() => {
    if (
      params.base_dt_start &&
      params.base_dt_finish &&
      params.comparison_dt_start &&
      params.comparison_dt_finish
    ) {
      setSelectedDateRanges({
        range1: [params.base_dt_start, params.base_dt_finish],
        range2: [params.comparison_dt_start, params.comparison_dt_finish],
      });
    }
  }, [
    params.base_dt_start,
    params.base_dt_finish,
    params.comparison_dt_start,
    params.comparison_dt_finish,
  ]);

  return (
    <>
      <FilterTable>
        <colgroup>
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(1416)} />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">기간 선택</th>
            <td>
              <DiffDateRangerWrap>
                <span>
                  <DateRangePicker
                    onDateRangeChange={update =>
                      handleDateRangeChange('range1', update)
                    }
                    initialDateRange={selectedDateRanges.range1}
                  />
                </span>
                <span className="bar">~</span>
                <span>
                  <DateRangePicker
                    onDateRangeChange={update =>
                      handleDateRangeChange('range2', update)
                    }
                    initialDateRange={selectedDateRanges.range2}
                  />
                </span>
              </DiffDateRangerWrap>
            </td>
          </tr>
          <tr>
            <th scope="row">제품 구분</th>
            <td>
              <div className="inner">
                <span className="btn_box">
                  <Button variant="gostSecondary">검색</Button>
                  <Button
                    className="btn_reset"
                    variant="transparent"
                    // onClick={resetParams}
                    LeadingIcon={<Sync />}
                  >
                    초기화
                  </Button>
                </span>
                <div className="list_select_item">
                  <Button variant="selectItem" TrailingIcon={<BtnDelete />}>
                    오리지널 페퍼로니 피자
                  </Button>
                  <Button variant="selectItem" TrailingIcon={<BtnDelete />}>
                    아메리칸 치즈 피자
                  </Button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">매장 구분</th>
            <td>
              <div className="inner">
                <span className="btn_box">
                  <Button variant="gostSecondary">검색</Button>
                  <Button
                    className="btn_reset"
                    variant="transparent"
                    // onClick={resetParams}
                    LeadingIcon={<Sync />}
                  >
                    초기화
                  </Button>
                </span>
                <div className="list_select_item" />
              </div>
            </td>
          </tr>
        </tbody>
      </FilterTable>
      <FilterTableBtnBox>
        <Button variant="gostSecondary">초기화</Button>
        <Button variant="primary" onClick={handleCheckDateRanges}>
          조회
        </Button>
      </FilterTableBtnBox>
    </>
  );
};

export default FilterTableForm;
