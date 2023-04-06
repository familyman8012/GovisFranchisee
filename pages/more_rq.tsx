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
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import dayjs from "dayjs";

export default function Orders() {
  const queryClient = useQueryClient();
  const [orderTypeName, setOrderTypeName] = useState<any>(getOrderTypeName());
  const [channelTypeName, setChannelTypeName] = useState<any>(getChannelTypeByChannelKey());
  const [reqParam, setReqParam] = useState<IOrdersRequestDateRange>({
    start_date: String(dayjs(Date.now() - 60 * 60 * 24 * 1000 * 2).format("YYYY-MM-DD")),
    end_date: String(dayjs(Date.now() - 60 * 60 * 24 * 1000).format("YYYY-MM-DD")),
    current_page: 1,
    per_num: 10,
  });

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "orderData",
    async () => {
      const res = await fetchOrderList(reqParam);
      setReqParam({ ...reqParam, current_page: reqParam.current_page + 1 });
      return res;
    },
    {
      getNextPageParam() {
        return reqParam;
      },
    }
  );

  const handlerSearch = (startDate: string, endDate: string) => {
    queryClient.resetQueries("orderData", { exact: true });
    reqParam.current_page = 1;
    reqParam.start_date = startDate;
    reqParam.end_date = endDate;
  };

  return (
    <Layout>
      <div className={"contents-prefix-box"}>
        <Container className={"contents"}>
          <Row>
            <Col>
              <SearchDateRangeDefaultDatePicker handlerBtnSearch={handlerSearch} />
              <OrderSalesSummary
                total={data?.pages[0]?.total?.total_billable_amount}
                count={data?.pages[0]?.total?.total_order_count}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container className={"contents orders"}>
        <Row>
          <Col>
            <SummaryList>
              {data?.pages?.map((page) =>
                page?.orders?.map((item: any) => <SummaryItemForOrder key={item.order_number} data={item} />)
              )}
            </SummaryList>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            {data && data?.pages[0]?.total?.total_order_count > data?.pages?.length * data?.pages[0].order_number && (
              <ListMoreButton handler={fetchNextPage} />
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
