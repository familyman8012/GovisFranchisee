import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { IMenuListItem } from "InterfaceFarm/menu";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import { Table } from "@ComponentFarm/common";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

interface InfiniteTableProps {
  list: IMenuListItem[];
  loading?: boolean;
  render: (item: IMenuListItem) => React.ReactNode;
  onBottomScroll?: () => void;
}
const InfiniteTableWrap = styled.div`
  overflow-y: auto;
  max-height: 29.2rem;

  /* border-radius: 0.6rem; */
  /* border: 1px solid var(--color-neutral90); */

  & > div {
    width: 100%;
    border-radius: 0;
    border: 0;
  }

  table.basic tr:hover {
    /* cursor: default !important; */
  }

  thead {
    tr td,
    tr th {
      position: sticky;
      top: 0;
    }
  }
`;
const InfiniteTable = ({
  list,
  loading,
  render,
  onBottomScroll,
}: InfiniteTableProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return () => {};
    const onScroll = () => {
      if (
        scrollEl.scrollTop + scrollEl.clientHeight >=
        scrollEl.scrollHeight - 200
      ) {
        onBottomScroll?.();
      }
    };
    scrollEl.addEventListener("scroll", onScroll);
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [scrollRef, onBottomScroll]);

  return (
    <InfiniteTableWrap ref={scrollRef}>
      <Table className="basic">
        <colgroup>
          <col width={getTableWidthPercentage(46, 900)} />
          <col width={getTableWidthPercentage(120, 900)} />
          <col width={getTableWidthPercentage(120, 900)} />
          <col width={getTableWidthPercentage(120, 900)} />
          <col width={getTableWidthPercentage(120, 900)} />
          <col width={getTableWidthPercentage(120, 900)} />
          <col width={getTableWidthPercentage(205, 900)} />
        </colgroup>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>그룹별</th>
            <th>종류별</th>
            <th>메뉴 구분</th>
            <th>카테고리</th>
            <th>메뉴 상태</th>
            <th>메뉴명</th>
          </tr>
        </thead>
        <tbody>
          {!loading && list.length === 0 ? (
            <tr className="empty">
              <td colSpan={7}>
                <Empty>데이터가 없습니다.</Empty>
              </td>
            </tr>
          ) : (
            list.map((item, i) => render(item))
          )}
          {loading && (
            <tr className="empty">
              <td colSpan={7}>
                <Empty>불러오는중 입니다.</Empty>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </InfiniteTableWrap>
  );
};

export default InfiniteTable;
