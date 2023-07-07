import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import layoutStyle from "StyleFarm/scss/modules/Layout.module.scss";
import style from "StyleFarm/scss/modules/Goair.module.scss";

import * as GoAirService from "ApiFarm/goair";

import { IGoAirArea, IGoAirListResponse } from "InterfaceFarm/Goair";
import { toClasses } from "LibFarm/toClasses";

import Layout from "ComponentsFarm/layouts";
import { GoAirTag } from "ComponentsFarm/pageComp/goair/GoAirTag";

import { ThumbnailLoading } from "ComponentsFarm/elements/Loading";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";

export default function GoAirPage() {
  const { push } = useRouter();
  const { data, isLoading } = useQuery<IGoAirListResponse<IGoAirArea>>(
    ["goair-section"],
    GoAirService.fetchStore
  );
  const notUsedGoAir = !isLoading && data?.list.length === 0;
  return (
    <Layout>
      <Head>
        <title>GoAir | GOVIS for Franchisee</title>
      </Head>
      <div className={layoutStyle["layout-default-page"]}>
        <div className={style["goair-section"]}>
          {!notUsedGoAir && (
            <ul className={style["goair-status-guide"]}>
              <li
                className={toClasses([
                  style["goair-status-guide__symbol"],
                  style["goair-status-guide__symbol--error"],
                ])}
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
              <li
                className={toClasses([
                  style["goair-status-guide__symbol"],
                  style["goair-status-guide__symbol--normal"],
                ])}
              >
                정상
              </li>
            </ul>
          )}
          <ul className={style["goair-section__list"]}>
            {isLoading ? (
              <li>
                <ThumbnailLoading />
              </li>
            ) : data?.list.length === 0 ? (
              <li className="mt-3">
                <EmptyView>GoAir 서비스를 사용하지 않는 매장입니다.</EmptyView>
              </li>
            ) : (
              data?.list.map((section) => (
                <li
                  key={section.goair_area_info_idx}
                  tabIndex={0}
                  className={toClasses([
                    style["goair-section__item"],
                    style["goair-section__item--active"],
                  ])}
                  onClick={() => push(`/goair/${section.goair_area_info_idx}`)}
                >
                  <div className={`${style["goair-section__title"]}`}>
                    <span>{section.area_name ?? "-"}</span>
                  </div>
                  <div className={style["goair-section-tags"]}>
                    {section.module_list.map((item) => (
                      <GoAirTag
                        key={item.goair_module_info_idx}
                        value={item}
                        onChange={() => {}}
                        label={item.module_name}
                        color={
                          item.module_state === 0
                            ? "normal"
                            : item.module_state === 1
                            ? "warning"
                            : item.module_state === 2
                            ? "error"
                            : "normal"
                        }
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
