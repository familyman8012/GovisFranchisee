import React, { useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import layoutStyle from "StyleFarm/scss/modules/Layout.module.scss";
import style from "StyleFarm/scss/modules/Goair.module.scss";

import { toClasses } from "LibFarm/toClasses";

import * as GoAirService from "ApiFarm/goair";
import { IGoAirArea, IGoAirListResponse, IGoAirSensor } from "InterfaceFarm/Goair";

import useBack from "HookFarm/useBack";

import Layout from "ComponentsFarm/layouts";

import { SENSOR_TYPE_OPTIONS } from "ComponentsFarm/pageComp/goair/constants";
import { GoAirSensorDataChart } from "ComponentsFarm/pageComp/goair/GoAirDataChart";
import { ThumbnailLoading } from "ComponentsFarm/elements/Loading";

export default function GoAirDataPage() {
  const router = useRouter();
  const back = useBack();

  const goair_area_info_idx = useMemo(() => parseInt(router.query.goair_area_info_idx as string), [router.query]);
  const goair_module_info_idx = useMemo(() => parseInt(router.query.goair_module_info_idx as string), [router.query]);

  const [sensorType, setSensorType] = React.useState(0);

  const { data, isLoading } = useQuery<IGoAirListResponse<IGoAirSensor>>(
    ["goair-section", goair_area_info_idx, goair_module_info_idx],
    () =>
      GoAirService.fetchStoreModuleSensors({
        goair_area_info_idx,
        goair_module_info_idx,
      }),
    {
      enabled: router.isReady,
    }
  );

  const { data: modules } = useQuery<IGoAirArea>(
    ["goair-section-modules", goair_area_info_idx],
    () => GoAirService.fetchStoreModules(goair_area_info_idx),
    {
      enabled: router.isReady,
    }
  );

  const handleSensorSort = React.useCallback((a: IGoAirSensor, b: IGoAirSensor) => {
    const sensorA = SENSOR_TYPE_OPTIONS.find((opt) => opt.value === a.sensor_type) ?? {
      sort: 9999,
    };
    const sensorB = SENSOR_TYPE_OPTIONS.find((opt) => opt.value === b.sensor_type) ?? {
      sort: 9999,
    };

    return sensorA.sort - sensorB.sort;
  }, []);

  const moduleName = React.useMemo(
    () =>
      modules?.module_list.find((module) => module.goair_module_info_idx === goair_module_info_idx)?.module_name ?? "",
    [modules]
  );

  if (!router.isReady) {
    return (
      <Layout menuIconType="back" handlerMenuIcon={back}>
        <ThumbnailLoading full />
      </Layout>
    );
  }

  return (
    <Layout menuIconType="back" handlerMenuIcon={back}>
      <Head>
        <title>GoAir {moduleName} | GOVIS for Franchisee</title>
      </Head>
      <div className={`${layoutStyle["layout-default-page"]} ${style["goair-data-page"]}`}>
        <GoAirSensorDataChart
          sectionId={goair_area_info_idx}
          moduleId={goair_module_info_idx}
          sensorType={sensorType}
          moduleName={moduleName}
        />
        <ul className={style["goair-sensor-list"]}>
          {isLoading ? (
            <ThumbnailLoading />
          ) : (
            data?.list.sort(handleSensorSort).map((sensor) => {
              const type = SENSOR_TYPE_OPTIONS.find((type) => sensor.sensor_type === type.value);

              return (
                <li
                  key={sensor.sensor_type}
                  className={toClasses([
                    style["goair-sensor-list__item"],
                    sensorType === type?.value ? style["goair-sensor-list__item--active"] : "",
                    sensor.check_status ? style["goair-sensor-list__item--exception"] : "",
                  ])}
                  tabIndex={0}
                  onClick={() => setSensorType(sensor.sensor_type)}
                >
                  <span className={sensorType === type?.value ? "text-primary-3" : "text-typo-3"}>{type?.label}</span>
                  <span className={style["goair-sensor-list__value"]}>{`${sensor.data_value} ${type?.unit}`}</span>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </Layout>
  );
}
