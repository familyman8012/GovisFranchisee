import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { VideoListStyle } from './style';

const SkeletonVideoThumb = ({ count }: { count: number }) => {
  return (
    <VideoListStyle>
      {Array.from({ length: count }).map((_, i) => (
        <div className="item loading" key={i}>
          <div className="img-wrap">
            <Skeleton height="100%" style={{ position: 'absolute' }} />
          </div>
          <div className="info-wrap">
            <h3>
              <Skeleton width="40%" height="2rem" />
            </h3>
            <Skeleton className="score" width="20%" height="1.5rem" />
            <p>
              <Skeleton width="40%" height="2rem" />
            </p>
            <p>
              <Skeleton width="35%" height="1.5rem" />
            </p>
          </div>
        </div>
      ))}
    </VideoListStyle>
  );
};

export default SkeletonVideoThumb;
