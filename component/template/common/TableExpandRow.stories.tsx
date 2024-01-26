/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import { Badge } from '@ComponentFarm/atom/Badge/Badge';
import DataFilled from '@ComponentFarm/atom/icons/DataFilled';
import Pic from '@ComponentFarm/atom/icons/Pic';
import { Table, TableWrap } from '@ComponentFarm/common';
import { getTableWidthPercentage } from '@UtilFarm/calcSize';
import TableExpandRow from './TableExpandRow';
import { FqsAnalysisDataStyle } from '../aistt/style';

const meta: Meta = {
  title: 'TEMPLATE/TableExpandRow',
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

export const Default: Story<Props> = args => {
  return (
    <StoryLayout {...args}>
      <TableWrap className="content">
        <Table className="basic">
          <colgroup>
            <col width={getTableWidthPercentage(50)} />
            <col width={getTableWidthPercentage(185)} />
            <col width={getTableWidthPercentage(150)} />
            <col width={getTableWidthPercentage(278)} />
            <col width={getTableWidthPercentage(256)} />
            <col width={getTableWidthPercentage(278)} />
            <col width={getTableWidthPercentage(96)} />
            <col width={getTableWidthPercentage(140)} />
          </colgroup>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>구간 종류</th>
              <th className="center">구간 이미지</th>
              <th>구간 시작 및 종료</th>
              <th>감점 요인</th>
              <th>심각 요인</th>
              <th>구간 점수</th>
              <th>변환 점수</th>
            </tr>
          </thead>
          <tbody>
            <TableExpandRow
              content={
                <FqsAnalysisDataStyle>
                  <ul>
                    <li>
                      <span className="ico">
                        <Pic />
                      </span>
                      <div className="cont">
                        <div className="inspection-img">
                          <h3>제조 이미지</h3>
                          <img src="" alt="" />
                        </div>

                        <div className="inspection-img">
                          <h3>제조 이미지 컬러맵</h3>
                          <img src="" alt="" />
                        </div>
                      </div>
                    </li>
                    <li className="hide-line">
                      <span className="ico">
                        <DataFilled />
                      </span>
                      <div className="cont">
                        <div className="inspection">
                          <h3>감점 및 심각 요인</h3>
                          <div className="effect">
                            <Badge color="yellow" size="sm">
                              감점 요인
                            </Badge>
                            <p>감점 내역이 없습니다.</p>
                          </div>
                          <div className="effect">
                            <Badge color="red" size="sm">
                              심각 요인
                            </Badge>
                            <p>심각 내역이 없습니다.</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </FqsAnalysisDataStyle>
              }
            >
              <td>도우</td>
              <td>
                <img src="" alt="" />
              </td>
              <td>
                <Badge color="gray">00:00</Badge>
                <span className="gt" />
                <Badge color="gray">00:30</Badge>
              </td>
              <td>
                <Badge color="yellow">소스 부족</Badge>
              </td>
              <td>
                <Badge color="red">소스 부족</Badge>
              </td>
              <td>10/10</td>
              <td>25/25</td>
            </TableExpandRow>
          </tbody>
        </Table>
      </TableWrap>
    </StoryLayout>
  );
};
