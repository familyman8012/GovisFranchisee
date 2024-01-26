/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import FqsCard from './FqsCard';

const meta: Meta = {
  title: 'TEMPLATE/FqsCard',
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
      <FqsCard
        label="제공 가능 수준"
        title="메뉴 제조 수"
        value="204"
        unit="건"
        placeholder="+4"
        variant="success"
      />
      <FqsCard
        label="제공 가능 수준"
        title="메뉴 제조 수"
        value="204"
        unit="건"
        placeholder="+4"
        variant="error"
      />
      <FqsCard
        label="매장 구분"
        title="AI-FQS 도입 매장"
        value="5"
        unit="/100"
      />
      <FqsCard label="기기 상태" title="기기 ON" value="4" unit="/5" />
      <FqsCard label="프로그램 상태" title="프로그램 ON" value="3" unit="/5" />
      <FqsCard
        label="현황"
        title="AI-FQS 정상 수집 수"
        value="15,021"
        unit="/16,212"
        placeholder="97.0%"
      />
    </StoryLayout>
  );
};
