import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchAisttDeviceInfo, fetchAisttStoreInfo } from "ApiFarm/aistt";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import { useGoMove } from "HookFarm/useGoMove";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import DeviceCameraList from "./DeviceCameraList";
import { DevicePageStyle } from "./style";
import { FqsInfoTable, SectionStyle } from "../style";

const DeviceView = () => {
  const { onBack } = useGoMove();
  const router = useRouter();
  const id = useMemo(
    () => Number(router.query.id?.[1] ?? ""),
    [router.isReady]
  );

  const { data: storeInfoData, isError } = useQuery(
    ["aistt-store-info", id],
    () => fetchAisttStoreInfo(Number(id))
  );

  useEffect(() => {
    if (isError) {
      onBack();
    }
  }, [isError]);

  const { data: deviceInfoData } = useQuery(["aistt-device-info"], () =>
    fetchAisttDeviceInfo(id)
  );

  const cameraList = useMemo(
    () =>
      deviceInfoData
        ? Object.entries(deviceInfoData)
            .filter(
              ([key, value]) => key.includes("camera") && value.is_use === 1
            )
            .map(([key, value]) => ({ key, ...value }))
        : [],
    [deviceInfoData]
  );

  return (
    <DevicePageStyle>
      <SectionStyle>
        <h3 className="title">Smart Topping Table 기본 정보</h3>
      </SectionStyle>
      <FqsInfoTable bordered>
        <colgroup>
          <col width={getTableWidthPercentage(120)} />
          <col width={getTableWidthPercentage(1384)} />
        </colgroup>
        <tbody>
          <tr>
            <th>매장명</th>
            <td>{storeInfoData?.info.store_name}</td>
          </tr>
          <tr>
            <th>Wi-fi</th>
            <td>
              <span className="info-text">
                SSID : {storeInfoData?.info.wifi_ssid ?? "-"} / Host IP :
                {storeInfoData?.info.host_ip ?? "-"}
              </span>
            </td>
          </tr>
          <tr>
            <th>전원 상태</th>
            <td>
              <Badge
                dot
                color={storeInfoData?.info.is_use_stt === 1 ? "green" : "red"}
                size="sm"
              >
                {storeInfoData?.info.is_use_stt === 1 ? "ON" : "OFF"}
              </Badge>
            </td>
          </tr>
        </tbody>
      </FqsInfoTable>

      {cameraList.length > 0 && (
        <DeviceCameraList storeId={id} cameraList={cameraList} />
      )}
    </DevicePageStyle>
  );
};

export default DeviceView;
