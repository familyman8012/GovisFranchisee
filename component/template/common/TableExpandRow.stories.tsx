/* eslint-disable react/destructuring-assignment */
import React from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "@ComponentFarm/modules/story_layout/StoryLayout";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import DataFilled from "@ComponentFarm/atom/icons/DataFilled";
import Pic from "@ComponentFarm/atom/icons/Pic";
import { Table, TableWrap } from "@ComponentFarm/common";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import TableExpandRow from "./TableExpandRow";
import InspectionStepDescription from "../aistt/analysis/InspectionStepDescription";

const meta: Meta = {
  title: "TEMPLATE/TableExpandRow",
  tags: ["autodocs"],
  args: {
    TotalProps: {
      props: ``,
    },
  },
  parameters: {
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: "shown" }, // start with the source open
      source: { type: "code" }, // forces the raw source code (rather than the rendered JSX).
    },
  },
};

export default meta;

interface Props {
  darkMode: boolean;
}

export const Default: Story<Props> = (args) => {
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
                <InspectionStepDescription
                  inspectionStep={{
                    // Mockup data
                    inspection_step_idx: 1,
                    step_variable_name: "도우",
                    step_image_url: "",
                    step_color_image_url: "",
                    ground_truth_image_url: "",
                    step_variable_idx: 1,
                    section_dt_finish: 30,
                    section_score: 10,
                    section_score_std: 10,
                    section_description: "",
                    section_dt_start: 0,
                    rating_scale_idx_1: 2,
                    rating_scale_idx_2: 3,
                    rating_scale_idx_3: 1,
                    rating_scale_name_1: "소스 부족",
                    rating_scale_name_2: "소스 부족",
                    rating_scale_name_3: "소스 부족",
                    conversion_score: 25,
                  }}
                />
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
