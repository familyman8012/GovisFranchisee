/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { css } from '@emotion/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import SubTitleBox from './SubTitleBox';

const meta: Meta = {
  title: 'TEMPLATE/TitleBox',
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

const StoryCheckboxGroup: Story<Props> = args => {
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
      <SubTitleBox
        title="제조 품질 통계"
        desc="분류, 기간 유형별 통계를 확인할 수 있습니다."
      />
      <SubTitleBox
        title="제조 품질 현황"
        desc="오늘 기준으로 7일치 데이터 입니다."
        moreLink="/"
      />
    </StoryLayout>
  );
};
export const Default = StoryCheckboxGroup.bind({});
