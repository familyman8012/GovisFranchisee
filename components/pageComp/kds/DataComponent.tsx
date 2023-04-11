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
    <div>
      {data.list.map((item) => (
        <div className="box">
          <div className="item_receipt">
            <div className="box_status_info">
              <div className="txt_info">
                <div className="kind">
                  <span className="txt_kind">배달 : </span>
                  <span className="txt_date">{item.ordered_at}</span>
                </div>
                <div className="current_status">
                  {getStatusText(item.process_status)}
                </div>
              </div>
              <div className="num_order">{item.receipt_number}</div>
            </div>
          </div>
          <table>
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
                        <span>- {option.product_name}</span>
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
      ))}
    </div>
  );
};

export default DataComponent;
