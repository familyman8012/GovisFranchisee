/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { css } from '@emotion/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import { Badge } from '@ComponentFarm/atom/Badge/Badge';
import Arrow2Up from '@ComponentFarm/atom/icons/Arrow2Up';
import { getTableWidthPercentage } from '@UtilFarm/calcSize';
import { TableSty1, TableSty2, TableSty3, TableSty4 } from './TableSty';

const meta: Meta = {
  title: 'Table/Table',
  tags: ['autodocs'],
  args: {
    TotalProps: {
      props: ``,
    },
  },
  parameters: {
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: 'shown' }, // start with the source open
      source: { type: 'code' }, // forces the raw source code (rather than the rendered JSX).
    },
  },
};

export default meta;

interface Props {
  darkMode: boolean;
}

const StoryTableSty1: Story<Props> = args => {
  return (
    <StoryLayout
      {...args}
      customCss={css`
        /* display: flex; */
        & > div + div {
          margin-top: 1rem; /* Corresponds to space-y-5 in Tailwind CSS */
        }
      `}
    >
      <TableSty1>
        <colgroup>
          <col width="33%" />
          <col width="22%" />
          <col width="22%" />
          <col width="22%" />
        </colgroup>
        <thead>
          <tr>
            <th>시간</th>
            <th>기준일</th>
            <th>비교일</th>
            <th>증감율</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01:00</td>
            <td>113개</td>
            <td>113개</td>
            <td>
              <Badge
                type="square"
                color="green"
                LeadingIcon={
                  <Arrow2Up
                    customCss={css`
                      path {
                        fill: var(--bage-greenLabel);
                      }
                    `}
                  />
                }
              >
                10%
              </Badge>
            </td>
          </tr>
        </tbody>
      </TableSty1>
    </StoryLayout>
  );
};
export const TableSty1View = StoryTableSty1.bind({});

const StoryTableSty2: Story<Props> = args => {
  return (
    <StoryLayout
      {...args}
      customCss={css`
        /* display: flex; */
        & > div + div {
          margin-top: 1rem; /* Corresponds to space-y-5 in Tailwind CSS */
        }
      `}
    >
      <TableSty2>
        <colgroup>
          {[120, 390, 342, 342, 342].map((el, i) => (
            <col key={i} width={getTableWidthPercentage(el, 1536)} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2}>전체 3개</th>
            <th>447 개</th>
            <th>447개</th>
            <th>0개 (0%)</th>
          </tr>
          <tr>
            <th>
              <span className="hiddenZoneV">1</span>
            </th>
            <th>주문 방식</th>
            <th>기준일 판매</th>
            <th>비교일 판매</th>
            <th>증감율</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>내점</td>
            <td>204</td>
            <td>176</td>
            <td>28개 (+15.91%)</td>
          </tr>
        </tbody>
      </TableSty2>
    </StoryLayout>
  );
};
export const TableSty2View = StoryTableSty2.bind({});

const StoryTableSty3: Story<Props> = args => {
  return (
    <StoryLayout
      {...args}
      customCss={css`
        /* display: flex; */
        & > div + div {
          margin-top: 1rem; /* Corresponds to space-y-5 in Tailwind CSS */
        }
      `}
    >
      <TableSty3>
        <colgroup>
          {[120, 1416].map((el, i) => (
            <col key={i} width={getTableWidthPercentage(el)} />
          ))}
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">피자명</th>
            <td>오리지널 페퍼로니 피자</td>
          </tr>
          <tr>
            <th scope="row">매장 분류</th>
            <td>전체</td>
          </tr>
          <tr>
            <th scope="row">개선 필요</th>
            <td>총 85건</td>
          </tr>
        </tbody>
      </TableSty3>
    </StoryLayout>
  );
};
export const TableSty3View = StoryTableSty3.bind({});

const StoryTableSty4: Story<Props> = args => {
  return (
    <StoryLayout
      {...args}
      customCss={css`
        /* display: flex; */
        & > div + div {
          margin-top: 1rem; /* Corresponds to space-y-5 in Tailwind CSS */
        }
      `}
    >
      <TableSty4>
        <colgroup>
          {[155, 155, 198, 198, 198, 593].map((el, i) => (
            <col key={i} width={getTableWidthPercentage(el)} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2}>구분</th>
            <th colSpan={3}>평가 항목</th>
            <th rowSpan={2}>빈도</th>
          </tr>
          <tr>
            <th>제조 단계</th>
            <th>상세 항목</th>
            <th>제조 평균 점수</th>
            <th>분류</th>
            <th>요인</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={5}>소스</td>
            <td rowSpan={5}>고피자 토마토 소스</td>
            <td rowSpan={5}>83.23점</td>
            <td>우수</td>
            <td>제조 기준 우수</td>
            <td>3</td>
          </tr>
          <tr className="td_chk">
            <td>감점</td>
            <td>토핑 부족</td>
            <td>2</td>
          </tr>
          <tr>
            <td rowSpan={3}>개선(조치) 필요</td>
            <td>토핑 기준 미달</td>
            <td>1</td>
          </tr>
          <tr>
            <td>토핑 누락</td>
            <td>3</td>
          </tr>
          <tr>
            <td>토핑 순서 미준수</td>
            <td>2</td>
          </tr>
          <tr>
            <td rowSpan={5}>토핑</td>
            <td rowSpan={5}>모짜렐라 치즈</td>
            <td rowSpan={5}>83.23점</td>
            <td>우수</td>
            <td>제조 기준 우수</td>
            <td>3</td>
          </tr>
          <tr className="td_chk">
            <td>감점</td>
            <td>토핑 부족</td>
            <td>2</td>
          </tr>
          <tr>
            <td rowSpan={3}>개선(조치) 필요</td>
            <td>토핑 기준 미달</td>
            <td>1</td>
          </tr>
          <tr>
            <td>토핑 누락</td>
            <td>3</td>
          </tr>
          <tr>
            <td>토핑 순서 미준수</td>
            <td>2</td>
          </tr>
        </tbody>
      </TableSty4>
    </StoryLayout>
  );
};
export const TableSty4View = StoryTableSty4.bind({});
