/* eslint-disable react/destructuring-assignment */
// @ts-nocheck
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { css } from '@emotion/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import Sort from './Sort';

const meta: Meta = {
  title: 'Atoms/Sort',
  tags: ['autodocs'],
  args: {
    TotalProps: {
      props: `variant(필수값), size(기본값,md)`,
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

const StoryBadge: Story<Props> = args => {
  return (
    <StoryLayout
      {...args}
      customCss={css`
        display: inline-flex;
        flex-direction: column;
        & > div + div {
          margin-top: 1.25rem; /* Corresponds to space-y-5 in Tailwind CSS */
        }
      `}
    >
      <Sort />
    </StoryLayout>
  );
};
export const Default = StoryBadge.bind({});
