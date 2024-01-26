import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { css } from '@emotion/react';

const CardContainer = css`
  max-width: 345px;
  margin: 2rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const CardHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const CardContent = css`
  padding: 1rem;
`;

const Card = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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

export default Card;
