/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { css } from '@emotion/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import { AreaBox } from './AreaBox';

const meta: Meta = {
  title: 'TEMPLATE/AreaBox',
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
      <AreaBox title="전체 제품판매 현황">
        <br />
      </AreaBox>
      <AreaBox title="전체 제품판매 현황" moreLink="/">
        <br />
      </AreaBox>
      <AreaBox title="카테고리별 제품 판매 현황" moreLink="/">
        <br />
      </AreaBox>

      <AreaBox title="전체 제품판매 현황" moreLink="/">
        <br />
      </AreaBox>
    </StoryLayout>
  );
};
export const Default = StoryCheckboxGroup.bind({});
