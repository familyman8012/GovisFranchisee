import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CardContainer, CardContent, CardHeader } from './style';

const meta: Meta = {
  title: 'Atoms/Skelton',
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
      description: {
        component: 'description',
      },
    },
  },
};

export default meta;

interface Props {
  darkMode: boolean;
}

const StorySkelton: Story<Props> = args => {
  const [loading] = useState(true);

  return (
    <div css={CardContainer}>
      <div css={CardHeader}>
        {loading ? (
          <Skeleton circle height={40} width={40} />
        ) : (
          // Replace with your avatar component
          <img
            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            alt="Ted talk"
          />
        )}
        <div>
          {loading ? <Skeleton height={10} width="80%" /> : 'Ted'}
          {loading ? <Skeleton height={10} width="40%" /> : '5 hours ago'}
        </div>
        {loading ? null : (
          // Replace with your icon button component
          <button type="button">...</button>
        )}
      </div>
      {loading ? (
        <Skeleton height={190} />
      ) : (
        <img
          src="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
          alt="Nicola Sturgeon on a TED talk stage"
        />
      )}
      <div css={CardContent}>
        {loading ? (
          <Skeleton count={3} />
        ) : (
          "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
        )}
      </div>
    </div>
  );
};
export const Loading = StorySkelton.bind({});

const StorySkelton2: Story<Props> = args => {
  const [loading] = useState(false);

  return (
    <div css={CardContainer}>
      <div css={CardHeader}>
        {loading ? (
          <Skeleton circle height={40} width={40} />
        ) : (
          // Replace with your avatar component
          <img
            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            alt="Ted talk"
          />
        )}
        <div>
          {loading ? <Skeleton height={10} width="80%" /> : 'Ted'}
          {loading ? <Skeleton height={10} width="40%" /> : '5 hours ago'}
        </div>
        {loading ? null : (
          // Replace with your icon button component
          <button type="button">...</button>
        )}
      </div>
      {loading ? (
        <Skeleton height={190} />
      ) : (
        <img
          src="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
          alt="Nicola Sturgeon on a TED talk stage"
        />
      )}
      <div css={CardContent}>
        {loading ? (
          <Skeleton count={3} />
        ) : (
          "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
        )}
      </div>
    </div>
  );
};
export const Loaded = StorySkelton2.bind({});
