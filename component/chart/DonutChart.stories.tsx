/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { css } from '@emotion/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import RingChart from './RingChart';
import ScoreLabel from './ScoreLabel';

const meta: Meta = {
  title: 'CHART/DonutChart',
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

const StoryDonutChart: Story<Props> = args => {
  // const data = [
  //   { name: '배달', value: 3054, increase: 34, percent: 34, fill: '#0088FE' },
  //   { name: '내점', value: 1654, increase: 26, percent: 26, fill: '#00C49F' },
  //   { name: '포장', value: 80, increase: -8, percent: -8, fill: '#FFBB28' },
  // ];

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
      <div style={{ height: '40rem' }}>
        {/* <DonutChart chartData={data} /> */}
        asd
      </div>
    </StoryLayout>
  );
};
export const Default = StoryDonutChart.bind({});

const StoryDonutChart2: Story<Props> = args => {
  const data = [
    { name: 'Score', value: 40 },
    { name: 'Remaining', value: 100 - 40 },
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
      <RingChart
        chartData={data}
        size="12rem"
        gradient={['#ffa4a4', '#f24768']}
        labelComponent={<ScoreLabel />}
      />
    </StoryLayout>
  );
};
export const RingChartStory = StoryDonutChart2.bind({});
