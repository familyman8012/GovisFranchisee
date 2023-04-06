import { fetchSalesList } from "ApiFarm/sale";
import ListMoreButton from "ComponentsFarm/elements/ListMoreButton";
import Layout from "ComponentsFarm/layouts";
import { Col, Container, Row } from "ComponentsFarm/layouts/styles";
import SearchDateRangeDefaultDatePicker from "ComponentsFarm/module/SearchDateRangeDefaultDatePicker";
import OrderSalesSummary from "ComponentsFarm/pageComp/salesOrders/OrderSalesSummary";
import { SummaryItemForSale, SummaryList } from "ComponentsFarm/pageComp/salesOrders/SummaryList";
import { IDaliyList, IDaliyListRow, ISalesRequestDateRange, ITotal } from "InterfaceFarm/Sale";
import { useState } from "react";

export default function Sales() {
  const [list, setList] = useState<IDaliyList<IDaliyListRow>>({});
  const [total, setTotal] = useState<ITotal>({
    total_billable_amount: "",
    total_order_count: 0,
    total_date: 0,
  });

  const [reqParam, setReqParam] = useState<ISalesRequestDateRange>({
    start_date: "",
    end_date: "",
    current_page: 1,
    per_num: 10,
  });

  const getSales = async (isInit: boolean) => {
    let listView = {};

    const infoSales = await fetchSalesList(reqParam);
    const listDaily = getDataDailyProc(infoSales.daily);
    if (isInit === true) {
      listView = { ...{}, ...listDaily };
    } else {
      listView = { ...list, ...listDaily };
    }

    setTotal(infoSales.total as ITotal);
    setList(listView);
  };

  const getDataDailyProc = (listDaily: IDaliyList<IDaliyListRow>) => {
    let reVal = {} as IDaliyList<IDaliyListRow>;

    for (let key in listDaily) {
      let row: IDaliyListRow = listDaily[key];
      let procRow = {} as IDaliyListRow;

      if (row.order_date === null) {
        procRow.order_date = key;
        procRow.billable_amount = "0";
        procRow.unit_price = "0";
        procRow.order_count = 0;
        procRow.weather = "-";
        reVal[key] = procRow;
      } else {
        reVal[key] = row;
      }
    }

    return reVal;
  };

  const handlerBtnMore = () => {
    reqParam.current_page = reqParam.current_page + 1;
    getSales(false);
  };

  const handlerSearch = (startDate: string, endDate: string) => {
    reqParam.current_page = 1;
    reqParam.start_date = startDate;
    reqParam.end_date = endDate;

    getSales(true);
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
      <Container className={"contents sales"}>
        <Row>
          <Col>
            <SummaryList>
              {list && Object.entries(list).map(([key, data]) => <SummaryItemForSale key={key} data={data} />)}
            </SummaryList>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>{total?.total_date > Object.keys(list).length && <ListMoreButton handler={handlerBtnMore} />}</Col>
        </Row>
      </Container>
    </Layout>
  );
}
