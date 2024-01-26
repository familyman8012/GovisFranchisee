/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import SecondBadges from './SecondBadges';

const meta: Meta = {
  title: 'TEMPLATE/SecondBadges',
  tags: ['autodocs'],
  args: {
    beforeSecond: 0,
    afterSecond: 0,
    onClickSecond: (beforeSecond: number, afterSecond: number) =>
      console.log('beforeSecond, afterSecond : ', beforeSecond, afterSecond),
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
  beforeSecond: number;
  afterSecond: number;
}

export const Default: Story<Props> = props => {
  return (
    <StoryLayout darkMode={false}>
      <SecondBadges
        beforeSecond={props.beforeSecond}
        afterSecond={props.afterSecond}
        onClickSecond={(beforeSecond, afterSecond) =>
          console.log('onClickSecond', beforeSecond, afterSecond)
        }
      />
    </StoryLayout>
  );
};
