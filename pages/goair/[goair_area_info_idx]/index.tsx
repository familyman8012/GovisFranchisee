import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useQuery } from "react-query";

import layoutStyle from "StyleFarm/scss/modules/Layout.module.scss";
import style from "StyleFarm/scss/modules/Goair.module.scss";

import { IGoAirArea } from "InterfaceFarm/Goair";
import * as GoAirService from "ApiFarm/goair";
import { toClasses } from "LibFarm/toClasses";
import useBack from "HookFarm/useBack";

import { Button } from "ComponentsFarm/elements/Button";
import Layout from "ComponentsFarm/layouts";

import { GoAirAlert } from "ComponentsFarm/pageComp/goair/GoAirAlert";
import { GoAirImageSectionImage } from "ComponentsFarm/pageComp/goair/GoAirSectionImage";
import { ThumbnailLoading } from "ComponentsFarm/elements/Loading";
import { PALLETES } from "LibFarm/color";

export default function GoAirSectionPage() {
  const back = useBack();
  const router = useRouter();

  const goair_area_info_idx = useMemo(() => parseInt(router.query.goair_area_info_idx as string), [router.query]);

  const { data, isLoading, isError } = useQuery<IGoAirArea>(
    ["goair-section-modules", goair_area_info_idx],
    () => GoAirService.fetchStoreModules(goair_area_info_idx),
    {
      onError: () => back(),
      enabled: router.isReady,
    }
  );

  if (isError) {
    return <div></div>;
  }

  return (
    <Layout menuIconType="back" title={data?.area_name} handlerMenuIcon={() => back()}>
      <Head>
        <title>GoAir - {data?.area_name} | GOVIS for Franchisee</title>
      </Head>
      <div className={`${layoutStyle["layout-default-page"]} p-0`}>
        <div className={style["goair-section"]}>
          <GoAirImageSectionImage src={data?.area_image ?? ""} />
          <div className={style["goair-section__requirement"]}>
            <h3 className="weight-500 gv-typo-body-1">대응 필요 사항</h3>
            <ul className={style["goair-status-guide"]}>
              <li
                className={toClasses([style["goair-status-guide__symbol"], style["goair-status-guide__symbol--error"]])}
              >
                심각
              </li>
              <li
                className={toClasses([
                  style["goair-status-guide__symbol"],
                  style["goair-status-guide__symbol--warning"],
                ])}
              >
                주의
              </li>
            </ul>
          </div>

          <ul className={style["goair-section-modules"]}>
            {isLoading ? (
              <li>
                <ThumbnailLoading />
              </li>
            ) : (
              data?.module_list.map((module) => (
                <li className={style["goair-section-modules__item"]} key={module.goair_module_info_idx}>
                  <div className={style["goair-section-modules__header"]}>
                    <h4 className="weight-500 gv-typo-body-1">{module.module_name}</h4>
                    <Button
                      className="weight-normal gv-typo-body-1"
                      clear
                      color={PALLETES["success-1"]}
                      size="sm"
                      onClick={() => {
                        router.push({
                          pathname: `/goair/${goair_area_info_idx}/${module.goair_module_info_idx}`,
                        });
                      }}
                    >
                      {"자세히 >"}
                    </Button>
                  </div>
                  <div className={style["goair-section-modules__content"]}>
                    {module.notice_list
                      .filter((noti) => noti.notice_state !== 0)
                      .map((noti, i) => (
                        <GoAirAlert
                          key={i}
                          color={
                            noti.notice_state === 0
                              ? "normal"
                              : noti.notice_state === 1
                              ? "warning"
                              : noti.notice_state === 2
                              ? "error"
                              : "normal"
                          }
                          text={noti.notice_massage}
                        />
                      ))}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
