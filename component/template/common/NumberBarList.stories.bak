/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { css } from '@emotion/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import { NumberBarList } from './NumberBarList';

const meta: Meta = {
  title: 'TEMPLATE/NumberBarList',
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

const data = [
  {
    id: 1,
    imgUrl: '',
    product_name: '오리지널 페페로니 피자',
    category: '피자',
    time: '01분 23초',
    descTime: '+4초',
  },
  {
    id: 2,
    imgUrl: '',
    product_name: '오리지널 불고기 피자',
    category: '피자',
    time: '02분 23초',
    descTime: '+3초',
  },
];

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
      <NumberBarList data={data} />
    </StoryLayout>
  );
};
export const Default = StoryCheckboxGroup.bind({});
