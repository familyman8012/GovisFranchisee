import { useState } from "react";
import { IMenuLinkHistoryItem } from "InterfaceFarm/menu";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import { Table, TableWrap } from "@ComponentFarm/common";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { MoreViewModal } from "./MoreViewModal";

interface MenuLinkHistoryTableProps {
  loading?: boolean;
  list: IMenuLinkHistoryItem[];
  onRequestUnLink: (item: IMenuLinkHistoryItem) => void;
}

const MenuLinkHistoryTable = ({
  list,
  loading,
  onRequestUnLink,
}: MenuLinkHistoryTableProps) => {
  const [viewChannel, setViewChannel] = useState<IMenuLinkHistoryItem | null>(
    null
  );
  const [viewStore, setViewStore] = useState<IMenuLinkHistoryItem | null>(null);

  return (
    <TableWrap className="overflow-visible">
      <Table className="basic">
        <colgroup>
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(250)} />
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(200)} />
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(160)} />
        </colgroup>
        <thead>
          <tr>
            <th>NO.</th>
            <th>미확인 메뉴명</th>
            <th>주문 채널 수</th>
            <th>주문 매장 수</th>
            <th>연결 메뉴명</th>
            <th>처리자</th>
            <th>연결일자</th>
            <th>연결 해제</th>
          </tr>
        </thead>
        <tbody>
          {loading && <SkeletonTh colLength={8} rowLength={20} />}
          {!loading && list.length === 0 ? (
            <tr className="empty">
              <td colSpan={8}>
                <Empty>데이터가 없습니다.</Empty>
              </td>
            </tr>
          ) : (
            list.map((item) => (
              <tr key={item.sequence_number}>
                <td className="code">{item.sequence_number}</td>
                <td>{item.unidentified_menu_name}</td>
                <td>
                  <button
                    type="button"
                    className="link_popup"
                    onClick={() =>
                      item.order_channel_count && setViewChannel(item)
                    }
                  >
                    {item.order_channel_count}개
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="link_popup"
                    onClick={() => item.order_store_count && setViewStore(item)}
                  >
                    {item.order_store_count}개
                  </button>
                </td>
                <td>{`${item.linked_menu_name} (${item.linked_menu_classification})`}</td>
                <td>{item.processed_user_name}</td>
                <td>{item.processed_date}</td>
                <td>
                  <Button
                    variant="gostPrimary"
                    type="button"
                    onClick={() => onRequestUnLink(item)}
                  >
                    연결 해제
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <MoreViewModal
        open={!!viewChannel}
        title="주문 채널 목록"
        data={viewChannel?.order_channel_list}
        onClose={() => setViewChannel(null)}
      />
      <MoreViewModal
        open={!!viewStore}
        title="주문 매장 목록"
        data={viewStore?.order_store_list}
        onClose={() => setViewStore(null)}
      />
    </TableWrap>
  );
};

export default MenuLinkHistoryTable;
