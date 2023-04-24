import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import { IOrderListRes } from "InterfaceFarm/Kds";
import React from "react";

const getStatusText = (status: number): string => {
  switch (status) {
    case 0:
      return "대기";
    case 1:
      return "처리";
    case 2:
      return "완료";
    case 9:
      return "취소";
    default:
      return "알 수 없음";
  }
};

const DataComponent = ({ data }: { data: IOrderListRes }) => {
  console.log("data", data);
  return (
    <div className="wrap_real_order">
      <h3>실시간 주문 현황</h3>
      {data.list.length === 0 ? (
        <div className="box" style={{ position: "relative", minHeight: 130 }}>
          <EmptyView full>조회된 데이터가 없습니다.</EmptyView>
        </div>
      ) : (
        data.list.map((item) => (
          <div className="box">
            <div className="head_item">
              <div className="item_receipt">
                <div className="box_status_info">
                  <div className="num_order">
                    {item.receipt_number}
                    <span className="current_status">
                      {" "}
                      (배달 / {getStatusText(item.process_status)})
                    </span>{" "}
                  </div>
                  <div className="txt_info">
                    <div className="kind">
                      <span className="txt_date">
                        {item.ordered_at.slice(0, -3)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cont_item">
              <table>
                <colgroup>
                  <col width="70%" />
                  <col width="15%" />
                  <col width="15%" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">메뉴이름</th>
                    <th scope="col">수량</th>
                    <th scope="col">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {item.item_list
                    .map((itemList) => [
                      <tr key={itemList.receipt_item_idx}>
                        <td>
                          <span>{itemList.product_name}</span>
                        </td>
                        <td>
                          <span>{itemList.quantity}</span>
                        </td>
                        <td>
                          <span>{getStatusText(itemList.process_status)}</span>
                        </td>
                      </tr>,
                      itemList.option_list.map((option) => (
                        <tr key={option.receipt_item_idx}>
                          <td style={{ paddingLeft: "30px" }}>
                            <span>· {option.product_name}</span>
                          </td>
                          <td>
                            <span>{option.quantity}</span>
                          </td>
                          <td>
                            <span>{getStatusText(option.process_status)}</span>
                          </td>
                        </tr>
                      )),
                    ])
                    .reduce((acc, curr) => acc.concat(curr), [])}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DataComponent;
