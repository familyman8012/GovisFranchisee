/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { css } from '@emotion/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import StateInfoBox from './StateInfoBox';

const meta: Meta = {
  title: 'TEMPLATE/StateInfoBox',
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
  const StateItems = [
    { title: '전체 매장 수', txt1: '5', txt2: '개', txt3: '( +4 )' },
    { title: '제품 제조 수', txt1: '1,425', txt2: '개', txt3: '( +4 )' },
  ];

  const StateItems2 = [
    { title: '카메라 ID', txt1: 'ca_123112' },
    { title: '카메라 해상도', txt1: '1024', txt2: 'px' },
    { title: '카메라 해상도 높이', txt1: '720', txt2: 'px' },
    { title: '카메라 FPS', txt1: '60', txt2: 'fps' },
  ];

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
      <StateInfoBox items={StateItems} />
      <StateInfoBox items={StateItems2} />
    </StoryLayout>
  );
};
export const Default = StoryCheckboxGroup.bind({});
