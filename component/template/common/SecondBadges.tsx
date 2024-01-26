import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { Badge } from '@ComponentFarm/atom/Badge/Badge';
import Tooltip from '@ComponentFarm/atom/Tooltip/Tooltip';

interface Props {
  beforeSecond: number; // 1 = 1second
  afterSecond: number; // 1 = 1second
  onClickSecond?: (beforeSecond: number, afterSecond: number) => void;
  onClickbeforeSecond?: (beforeSecond: number) => void;
  onClickAfterSecond?: (afterSecond: number) => void;
}

const SecondBadgeStyle = styled.div`
  display: inline-flex;
  align-items: center;

  .gt {
    display: inline-flex;
    margin: 0 0.7rem;
    width: 1.6rem;
    height: 1.6rem;
    align-items: center;
    justify-content: center;
    color: #868fa0;
    vertical-align: middle;
    &:before {
      content: '~';
    }
  }

  > .badge {
    position: relative;
  }

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.4rem !important;
  }
`;

const SecondBadges = ({
  beforeSecond,
  afterSecond,
  onClickSecond,
  onClickAfterSecond,
  onClickbeforeSecond,
}: Props) => {
  return (
    <SecondBadgeStyle
      role="button"
      tabIndex={0}
      className="video-second-tags"
      onClick={e => {
        e.stopPropagation();
        onClickSecond?.(beforeSecond, afterSecond);
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          onClickSecond?.(beforeSecond, afterSecond);
        }
      }}
    >
      <Badge
        color="gray"
        size="sm"
        onClick={e => {
          if (onClickbeforeSecond) {
            e.stopPropagation();
            onClickbeforeSecond(beforeSecond);
          }
        }}
      >
        {onClickbeforeSecond && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
        {dayjs.unix(beforeSecond).format('mm:ss')}
        {onClickbeforeSecond && (
          <Tooltip direction="top" size="sm">
            영상 {dayjs.unix(beforeSecond).format('mm:ss')}초 이동
          </Tooltip>
        )}
      </Badge>
      <span className="gt" />
      <Badge
        color="gray"
        size="sm"
        onClick={e => {
          if (onClickAfterSecond) {
            e.stopPropagation();
            onClickAfterSecond(afterSecond);
          }
        }}
      >
        {onClickAfterSecond && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
        {dayjs.unix(afterSecond).format('mm:ss')}
        {onClickAfterSecond && (
          <Tooltip direction="top" size="sm">
            영상 {dayjs.unix(afterSecond).format('mm:ss')}초 이동
          </Tooltip>
        )}
      </Badge>
    </SecondBadgeStyle>
  );
};

export default SecondBadges;
