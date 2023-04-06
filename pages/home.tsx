import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import style from "StyleFarm/scss/modules/Home.module.scss";

import {
  iHomeTimeList,
  iHomeWeekList,
  iHomeYearResponse,
  iHomeYesterdayInfo,
  iHomeYesterdayInfoObjectData,
} from "InterfaceFarm/Home";
import HomeDefaultAreaChart, { iHomeDefaultAreaChartData } from "ComponentsFarm/pageComp/home/HomeDefualtAreaChart";
import { HomeTimeApi, HomeWeekApi, HomeYearApi, HomeYesterdayApi } from "ApiFarm/home";
import OrderTypePieChart, { iOrderTypePieChartData } from "ComponentsFarm/pageComp/home/OrderTypePieChart";
import OrderChannelBarChart, { iOrderChannelBarChart } from "ComponentsFarm/pageComp/home/OrderChannelBarChart";
import SalesYearTotal from "ComponentsFarm/pageComp/home/SalesYearTotal";

import Layout from "ComponentsFarm/layouts";
import { Col, Container, Row } from "ComponentsFarm/layouts/styles";
import SalesYesterday from "ComponentsFarm/pageComp/home/SalesYesterday";
import { HomeContents } from "ComponentsFarm/pageComp/home/style";
import { ChannelType } from "ComponentsFarm/pageComp/home/Constants";
import { CheckPopupNotice } from "ComponentsFarm/pageComp/notice/CheckPopupNotice";
import axios from "axios";

//import usePopupNotice from "ModulesFarm/hook/usePopupNotice";
//import { Col, Container, Row } from "react-bootstrap";

const HomeSubTitle = ({ title, date, dateEnd }: { title: string; date: string; dateEnd?: string }) => (
  <h3 className={"home__sub-title weight-500"}>
    {title}
    <span className="home__sub-title-date weight-normal">
      {dateEnd ? `${dayjs(date).format("YYYY-MM-DD")} ~ ${dayjs(dateEnd).format("MM-DD")}` : date}
    </span>
  </h3>
);

const HomeCard = ({ title, content }: { title: string; content?: React.ReactNode }) => (
  <div className={"home__contents-box contents-box"}>
    <h5 className={"weight-500"}>{title}</h5>
    {content}
  </div>
);

export default function Home() {
  const [year, setYear] = useState<iHomeYearResponse>({
    order_count: 0,
    search_date_start: "",
    search_date_end: "",
    sum_total_billable_amount: "",
  });

  const [yesterday, setYesterday] = useState<iHomeYesterdayInfo>({
    before_1: { date: "", data: {} },
    before_2: { date: "", data: {} },
  });

  const [week, setWeek] = useState<Array<iHomeWeekList>>();
  const [time, setTime] = useState({
    list: [] as Array<iHomeDefaultAreaChartData>,
    dataKey_1: "",
    dataKey_2: "",
  });
  const [weekInfo, setWeekInfo] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    //popupNotice.check();
    getHomeYear();
    getHomeWeek();
    getHomeYeasterday();
    getHomeTimeday();
  }, []);

  const getHomeYear = async () => {
    const data = await HomeYearApi();
    setYear(data);
  };

  const getHomeWeek = async () => {
    const data = await HomeWeekApi();

    const weekInfoStart = data.list[0].this.date;
    let weekInfoEnd = data.list[0].this.date;

    let dataWeekly: Array<iHomeWeekList> = [];
    data.list.map((row: iHomeWeekList) => {
      if (row.this.date !== "") {
        weekInfoEnd = row.this.date;
      }

      dataWeekly.push(row);
    });

    setWeekInfo({
      start: weekInfoStart,
      end: weekInfoEnd,
    });

    setWeek(dataWeekly);
  };

  const getHomeYeasterday = async () => {
    const data = await HomeYesterdayApi();
    setYesterday(data.list);
  };

  const getHomeTimeday = async () => {
    const data = await HomeTimeApi();
    getAreaChatTime(data.list);
  };

  const getUnitPrice = (price: string | undefined, count: number | undefined) => {
    const intPrice = price === undefined ? 0 : parseInt(price);
    const intCount = count === undefined ? 0 : count;

    let reVal = "0";
    if (intCount > 0 && intPrice > 0) {
      reVal = (intPrice / intCount).toString();
    }
    return reVal;
  };

  const getOrderTypePieChart = (): Array<iOrderTypePieChartData> => {
    const takeout =
      yesterday?.before_1.data.sum_takeout === undefined ? 0 : parseInt(yesterday?.before_1.data.sum_takeout);
    const visit = yesterday?.before_1.data.sum_visit === undefined ? 0 : parseInt(yesterday?.before_1.data.sum_visit);
    const delivery =
      yesterday?.before_1.data.sum_delivery === undefined ? 0 : parseInt(yesterday?.before_1.data.sum_delivery);

    return [
      { name: "배달", value: delivery },
      { name: "내점", value: visit },
      { name: "포장", value: takeout },
    ];
  };

  const getOrderChannelBarChartDataProc = (data: iHomeYesterdayInfoObjectData, keys: string[]) => {
    let reVal = 0;
    for (let idx in keys) {
      let key = keys[idx];
      let tmpValue = "";
      if (data?.hasOwnProperty(key)) {
        tmpValue = (data[key] ?? 0).toString();
        reVal += parseInt(tmpValue);
      }
    }

    return reVal;
  };

  const getOrderChannelBarChart = () => {
    let arrayKeys = ChannelType;

    let reVal = [] as iOrderChannelBarChart[];
    arrayKeys.map((row: { keyPrice: string[]; name: string }) => {
      const reValRow: iOrderChannelBarChart = {
        name: "",
      };

      const key_1 = yesterday?.before_1.date === undefined ? "" : yesterday?.before_1.date;
      const key_2 = yesterday?.before_2.date === undefined ? "" : yesterday?.before_2.date;
      const value_1 = getOrderChannelBarChartDataProc(yesterday?.before_1.data, row.keyPrice);
      const value_2 = getOrderChannelBarChartDataProc(yesterday?.before_2.data, row.keyPrice);

      reValRow["name"] = row.name;
      reValRow[key_1] = value_1;
      reValRow[key_2] = value_2;

      reVal.push(reValRow);
    });

    return reVal;
  };

  const getAreaChatTime = (data: iHomeTimeList) => {
    let reValList: Array<iHomeDefaultAreaChartData> = [];
    let dataKey_1 = "";
    let dataKey_2 = "";

    if (data?.before_1?.date !== undefined && data?.before_2?.date !== undefined) {
      dataKey_1 = data.before_1.date;
      dataKey_2 = data.before_2.date;

      for (let idx = 0; idx <= data.before_1.data.length; idx++) {
        const dataRow_1 = data.before_1.data[idx];
        const dataRow_2 = data.before_2.data[idx];

        if (dataRow_1?.time !== undefined && dataRow_1?.time !== null) {
          let reValRow: iHomeDefaultAreaChartData = {
            name: dataRow_1.time,
          };

          reValRow[dataKey_1] = parseInt(dataRow_1.sum_total);
          reValRow[dataKey_2] = parseInt(dataRow_2.sum_total);

          reValList.push(reValRow);
        }
      }
    }

    setTime({
      list: reValList,
      dataKey_1: dataKey_1,
      dataKey_2: dataKey_2,
    });
  };

  const getAreaChatSales = () => {
    let reVal: Array<iHomeDefaultAreaChartData> = [];
    week?.map((row) => {
      const thisSumTotal = row.this.data?.sum_total === undefined ? 0 : parseInt(row.this.data?.sum_total);
      const beforeSumTotal = row.before.data?.sum_total === undefined ? 0 : parseInt(row.before.data?.sum_total);

      let reValRow: iHomeDefaultAreaChartData = {
        name: row.week_str,
        이번주: thisSumTotal,
        지난주: beforeSumTotal,
      };

      reVal.push(reValRow);
    });
    return reVal;
  };

  const getAreaChatOrders = () => {
    let reVal: Array<iHomeDefaultAreaChartData> = [];
    week?.map((row) => {
      const thisOrderCount = row.this.data?.order_count === undefined ? 0 : row.this.data?.order_count;
      const beforeOrderCount = row.before.data?.order_count === undefined ? 0 : row.before.data?.order_count;

      let reValRow: iHomeDefaultAreaChartData = {
        name: row.week_str,
        이번주: thisOrderCount,
        지난주: beforeOrderCount,
      };

      reVal.push(reValRow);
    });
    return reVal;
  };

  return (
    <Layout>
      <HomeContents>
        <Row>
          <Col>
            <SalesYearTotal
              startDate={year.search_date_start}
              endDate={year.search_date_end}
              currentYearSales={year.sum_total_billable_amount}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <HomeSubTitle
              title="전일 현황"
              date={yesterday?.before_1.date === undefined ? "" : yesterday?.before_1.date}
            />
            <SalesYesterday
              sales={yesterday?.before_1.data.sum_total_billable_amount ?? ""}
              count={yesterday?.before_1.data.order_count ?? ""}
              aov={getUnitPrice(
                yesterday?.before_1.data.sum_total_billable_amount,
                yesterday?.before_1.data.order_count
              )}
            />
            <HomeCard
              title="시간대별 매출 현황"
              content={
                <HomeDefaultAreaChart
                  data={time.list}
                  labelPrefix={"시간대별 매출"}
                  labelSuffix={"시"}
                  valueUnit={"원"}
                  xAxisDataKey_1={time.dataKey_1}
                  xAxisDataKey_2={time.dataKey_2}
                />
              }
            />
            <HomeCard title="주문 유형" content={<OrderTypePieChart data={getOrderTypePieChart()} />} />
            <HomeCard
              title="주문 채널"
              content={
                <OrderChannelBarChart
                  data={getOrderChannelBarChart()}
                  date_1={yesterday?.before_1.date === undefined ? "" : yesterday?.before_1.date}
                  date_2={yesterday?.before_2.date === undefined ? "" : yesterday?.before_2.date}
                />
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <HomeSubTitle title="주간 현황" date={weekInfo.start} dateEnd={weekInfo.end} />
            <HomeCard
              title="매출"
              content={
                <HomeDefaultAreaChart
                  data={getAreaChatSales()}
                  labelPrefix={"매출"}
                  labelSuffix={"요일"}
                  valueUnit={"원"}
                  xAxisDataKey_1={"이번주"}
                  xAxisDataKey_2={"지난주"}
                />
              }
            />
            <HomeCard
              title="주간 주문수"
              content={
                <HomeDefaultAreaChart
                  data={getAreaChatOrders()}
                  labelPrefix={"주문수"}
                  labelSuffix={"요일"}
                  valueUnit={"회"}
                  xAxisDataKey_1={"이번주"}
                  xAxisDataKey_2={"지난주"}
                />
              }
            />
          </Col>
        </Row>
      </HomeContents>
      <CheckPopupNotice />
    </Layout>
  );
}
