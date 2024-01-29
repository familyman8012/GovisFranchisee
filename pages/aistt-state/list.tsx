/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchManufacturingList } from "ApiFarm/aistt";
import { IManufacturingListReq } from "InterfaceFarm/aistt";
import Pagination from "@ComponentFarm/modules/Paginate/Pagination";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { Tabs } from "@ComponentFarm/atom/Tab/Tab";
import TitleArea from "@ComponentFarm/layout/TitleArea";
import { aisttList } from "@ComponentFarm/template/aistt/const";
import AisttListTable from "@ComponentFarm/template/aistt/state/list/AisttListTable";
import SubTitleBox from "@ComponentFarm/template/common/SubTitleBox";

import useQueryParams from "HookFarm/useQueryParams";
import Layout from "ComponentsFarm/layouts";
import { css } from "@emotion/react";
import { ContentArea } from "@ComponentFarm/common";

const Manage = () => {
  const router = useRouter();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [params, updateParams] = useQueryParams({
    current_num: 1,
    per_num: 10,
  });

  const { isLoading, data } = useQuery(["aisttState-ListSearch", params], () =>
    fetchManufacturingList(params as IManufacturingListReq)
  );

  const handlePageChange = (pageNumber: number) => {
    updateParams({ current_num: pageNumber });
  };

  const hanldeTabMove = (index: number) => {
    setActiveTabIndex(index);
    // router.push(materialListTabData[index].url);
  };

  const {
    current_num,
    per_num,
    sort_target,
    sort_type,
    product_info_idx,
    ...rest
  } = params;

  return (
    <Layout
      css={css`
        @media (min-width: 768px) and (max-width: 1200px) {
          max-width: 100%;
        }
      `}
    >
      <ContentArea>
        <Tabs
          id="material"
          tabs={aisttList}
          activeTabIndex={activeTabIndex}
          onTabChange={(index) => hanldeTabMove(index)}
        />
        <SubTitleBox type="fst" title="전체 항목" hideUnderline />
        <AisttListTable
          isLoading={isLoading}
          data={data}
          params={params}
          updateParams={updateParams}
        />
        <Pagination
          pageInfo={[Number(params.current_num), Number(params.per_num)]}
          totalCount={Number(data?.total_count)}
          handlePageChange={handlePageChange}
        />
      </ContentArea>
    </Layout>
  );
};

export default Manage;
