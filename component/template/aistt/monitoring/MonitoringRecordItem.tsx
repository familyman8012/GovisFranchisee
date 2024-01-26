import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import Up from '@ComponentFarm/atom/icons/Up';
import { MenuOptionGroupStyle } from '@ComponentFarm/template/menu/style';

interface MonitoringRecordItemProps {
  recordDate: string;
  active?: boolean;
  itemLoading?: boolean;
  onClickItem: (date: string) => void;
}

const MonitoringRecordItem = ({
  recordDate,
  active,
  itemLoading,
  onClickItem,
  children,
}: React.PropsWithChildren<MonitoringRecordItemProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && !itemLoading) {
      const { current } = ref;
      current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  }, [active, itemLoading]);
  return (
    <MenuOptionGroupStyle
      ref={ref}
      className={`option ${active ? 'active' : ''}`}
    >
      <div
        role="button"
        tabIndex={0}
        className="header"
        onClick={() => onClickItem(recordDate)}
        onKeyDown={e => e.key === 'Enter' && onClickItem(recordDate)}
      >
        <span className="title">
          {dayjs(recordDate).format('YY년 MM월 DD일')}
        </span>
        <button
          type="button"
          className={`icon-btn ${active ? 'expanded' : ''}`}
        >
          <Up />
        </button>
      </div>
      {active && children}
    </MenuOptionGroupStyle>
  );
};

export default MonitoringRecordItem;
