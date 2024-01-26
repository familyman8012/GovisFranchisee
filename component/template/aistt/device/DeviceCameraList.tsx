import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchAisttDeviceCameraInfo } from "ApiFarm/aistt";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import DeviceCameraRecordView from "./DeviceCameraRecordView";
import { MenuOptionGroupStyle, MenuOptionListStyle } from "../../menu/style";
import { SectionStyle } from "../style";

interface Props {
  storeId: number;
  cameraList: {
    key: string;
    store_stt_camera_idx: number;
    is_use: number;
    status: number;
  }[];
}

const labels = {
  camera_table: "테이블 카메라",
  camera_face: "얼굴 카메라",
  camera_vat_left: "왼쪽 바트 카메라",
  camera_vat_right: "오른쪽 바트 카메라",
} as const;

const DeviceCameraList = ({ storeId, cameraList }: Props) => {
  const [activeCamera, setActiveCamera] = useState("");

  const currentCameraInfo = useMemo(
    () => cameraList.find((camera) => camera.key === activeCamera),
    [cameraList, activeCamera]
  );

  const { data } = useQuery(
    ["aistt-camera-info", storeId, currentCameraInfo?.store_stt_camera_idx],
    () =>
      fetchAisttDeviceCameraInfo({
        store_idx: Number(storeId),
        store_stt_camera_idx: currentCameraInfo?.store_stt_camera_idx ?? 0,
      }),
    {
      enabled: !!currentCameraInfo,
    }
  );

  useEffect(() => {
    if (cameraList.length > 0 && activeCamera === "") {
      setActiveCamera(cameraList[0].key);
    }
  }, [cameraList]);

  return (
    <>
      <SectionStyle>
        <h3 className="title">카메라 정보</h3>
      </SectionStyle>
      <MenuOptionListStyle>
        <div className="wrap">
          <div className="side">
            <div className="list">
              <MenuOptionGroupStyle className="camera-group">
                <div className="header">카메라 목록</div>
                {cameraList.map((camera) => (
                  <button
                    key={camera.key}
                    type="button"
                    className={`option ${
                      camera.status === 1
                        ? "on"
                        : camera.status === 2
                        ? "off"
                        : "none"
                    } ${activeCamera === camera.key ? "active" : ""}`}
                    onClick={() => setActiveCamera(camera.key)}
                  >
                    {labels?.[camera.key as keyof typeof labels] ?? ""}
                  </button>
                ))}
              </MenuOptionGroupStyle>
            </div>
          </div>

          <div className="view">
            {!currentCameraInfo ? (
              <Empty>카메라를 선택해 주세요.</Empty>
            ) : (
              data && (
                <DeviceCameraRecordView
                  key={`${storeId}_${currentCameraInfo.store_stt_camera_idx}`}
                  storeId={storeId}
                  cameraId={currentCameraInfo.store_stt_camera_idx}
                  cameraType={activeCamera}
                  cameraInfo={data}
                />
              )
            )}
          </div>
        </div>
      </MenuOptionListStyle>
    </>
  );
};

export default DeviceCameraList;
