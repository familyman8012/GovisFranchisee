import { useEffect, useState } from "react";
import Layout from "ComponentsFarm/layouts";
import { Col, Container, Row } from "ComponentsFarm/layouts/styles";
import SearchDateRangeDefaultDatePicker from "ComponentsFarm/module/SearchDateRangeDefaultDatePicker";
import ListMoreButton from "ComponentsFarm/elements/ListMoreButton";
import OrderSalesSummary from "ComponentsFarm/pageComp/salesOrders/OrderSalesSummary";
import { SummaryItemForOrder, SummaryList } from "ComponentsFarm/pageComp/salesOrders/SummaryList";
import { getOrderTypeName } from "ComponentsFarm/pageComp/salesOrders/OrderTypeDefine";
import { IOrdersListRow, IOrdersRequestDateRange, ITotal } from "InterfaceFarm/Order";
import { getChannelTypeByChannelKey } from "ComponentsFarm/pageComp/home/Constants";
import { fetchOrderList } from "ApiFarm/order";

export default function Orders() {
  const [orderTypeName, setOrderTypeName] = useState<any>(getOrderTypeName());
  const [channelTypeName, setChannelTypeName] = useState<any>(getChannelTypeByChannelKey());
  const [list, setList] = useState<Array<IOrdersListRow>>([]);
  const [total, setTotal] = useState<ITotal>({
    total_billable_amount: "",
    total_order_count: 0,
  });
  const [reqParam, setReqParam] = useState<IOrdersRequestDateRange>({
    start_date: "",
    end_date: "",
    current_page: 1,
    per_num: 10,
  });

  const getOrders = async (isInit: boolean) => {
    let listView: Array<IOrdersListRow> | undefined = [] as Array<IOrdersListRow>;
    const dataOrders = await fetchOrderList(reqParam);
    const listOrders = dataOrders.orders as Array<IOrdersListRow>;

    listOrders.map((row) => {
      row.delivery_type = orderTypeName[row.delivery_type.toString()];
      row.channel = channelTypeName[row.channel];
    });

    if (isInit === true) {
      listView = listOrders;
    } else {
      listView = [...list, ...listOrders];
    }

    setTotal(dataOrders.total as ITotal);
    setList(listView as Array<IOrdersListRow>);
  };

  const handlerBtnMore = () => {
    reqParam.current_page = reqParam.current_page + 1;
    getOrders(false);
  };

  const handlerSearch = (startDate: string, endDate: string) => {
    reqParam.current_page = 1;
    reqParam.start_date = startDate;
    reqParam.end_date = endDate;

    getOrders(true);
  };

  return (
    <Layout className="fullWidth">
      <div className={"contents-prefix-box"}>
        <Container className={"contents"}>
          <Row>
            <Col>
              <SearchDateRangeDefaultDatePicker handlerBtnSearch={handlerSearch} />
              <OrderSalesSummary total={total.total_billable_amount} count={total.total_order_count.toString()} />
            </Col>
          </Row>
        </Container>
      </div>
      <Container className={"contents orders"}>
        <Row>
          <Col>
            <SummaryList>
              {list && list.map((data) => <SummaryItemForOrder key={data.order_number} data={data} />)}
            </SummaryList>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>{total.total_order_count > list.length && <ListMoreButton handler={handlerBtnMore} />}</Col>
        </Row>
      </Container>
    </Layout>
  );
}
