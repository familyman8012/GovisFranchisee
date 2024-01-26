import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import { fetchAisttStoreInfo } from "ApiFarm/aistt";
import { IFqsStoreInfoResponse } from "InterfaceFarm/ai-fqs";
import RadioGroup from "@ComponentFarm/modules/RadioGroup/RadioGroup";
import { FormWrap } from "@ComponentFarm/common";
import TimeHourInput from "@ComponentFarm/molecule/TimeInput/TimeHourInput";
import CameraForm from "./CameraForm";

export const StoreFormStyle = css`
  .line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  h2 {
    display: flex;
    align-items: center;
    margin-bottom: 0;

    .sub-text {
      margin-left: 1.6rem;
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.4;
      color: var(--color-neutral30);
    }
  }

  .first-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .border-none {
    border: 0 !important;
  }

  // half width
  .field {
    display: inline-flex;
    align-items: center;
    width: calc(50% - 3.3rem);
    padding: 0;

    &:first-of-type {
      margin-right: 6.6rem;
    }
  }

  label:not(.label_radio):not(.label_check) {
    width: 40%;
    color: var(--color-gray500);
  }
`;

export type FormFields = IFqsStoreInfoResponse & {
  store_idx: string;
};

interface Props {
  storeId: string;
  onSubmit: (data: FormFields) => void;
}
const DeviceManage = React.forwardRef<HTMLFormElement, Props>(
  ({ storeId, onSubmit }, ref) => {
    const methods = useForm<FormFields>();
    const { register, handleSubmit, reset, control } = methods;

    useQuery(["aistt-store-info"], () => fetchAisttStoreInfo(Number(storeId)), {
      onSuccess: (data) => reset(data),
    });

    return (
      <FormProvider {...methods}>
        <FormWrap css={StoreFormStyle}>
          <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
            <input {...register("store_idx")} type="hidden" value={storeId} />
            <section className="first-section">
              <h2 className="border-none">Smart Topping Table 기본 정보</h2>
            </section>
            <div className="line">
              <div className="field">
                <label htmlFor="name">매장명</label>
                <div className="box_inp">
                  <input
                    {...register("info.store_name")}
                    disabled
                    className="inp"
                    type="text"
                  />
                </div>
              </div>
              <div />
              <div />
            </div>
            <div className="line">
              <div className="field">
                <label htmlFor="name">구동 시작 시간</label>
                <div className="box_inp">
                  <Controller
                    name="info.opening_time"
                    defaultValue="00:00"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TimeHourInput value={value} onChange={onChange} />
                    )}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="name">구동 종료 시간</label>
                <div className="box_inp">
                  <Controller
                    name="info.closing_time"
                    defaultValue="00:00"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TimeHourInput value={value} onChange={onChange} />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="line">
              <div className="field">
                <label htmlFor="name">Wi-fi SSID</label>
                <div className="box_inp">
                  <input
                    {...register("info.wifi_ssid")}
                    className="inp"
                    type="text"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="name">Wi-fi Password</label>
                <div className="box_inp">
                  <input
                    {...register("info.wifi_pwd")}
                    className="inp"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="line">
              <div className="field">
                <label htmlFor="name">Host IP</label>
                <div className="box_inp">
                  <input
                    {...register("info.host_ip")}
                    className="inp"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="line">
              <div className="field">
                <label htmlFor="name">사용 여부</label>
                <div className="box_inp">
                  <Controller
                    control={control}
                    name="info.is_use_stt"
                    defaultValue="0"
                    render={({ field: { value, onChange } }) => (
                      <RadioGroup
                        defaultValue={`${value ?? 0}`}
                        options={[
                          { label: "사용", value: "1" },
                          { label: "사용 안함", value: "0" },
                        ]}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <h2>
              테이블 카메라
              <span className="sub-text">Table Camera</span>
            </h2>
            <div className="line">
              <div className="field">
                <label htmlFor="name">노출 시간 설정 (Exptime)</label>
                <div className="box_inp">
                  <input
                    {...register("camera_table.shutter_speed")}
                    className="inp"
                    type="text"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="name">ISO 대비 민감도 (Sensiso)</label>
                <div className="box_inp">
                  <input
                    {...register("camera_table.iso")}
                    className="inp"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="line">
              <div className="field">
                <label htmlFor="name">영상 프레임 (FPS)</label>
                <div className="box_inp">
                  <input
                    {...register("camera_table.fps")}
                    className="inp"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="line">
              <div className="field">
                <label htmlFor="name">카메라 사용</label>
                <div className="box_inp">
                  <Controller
                    control={control}
                    name="camera_table.is_use"
                    render={({ field: { value, onChange } }) => (
                      <RadioGroup
                        defaultValue={`${value}`}
                        options={[
                          { label: "사용", value: "1" },
                          { label: "사용 안함", value: "0" },
                        ]}
                        onChange={(val) => onChange(Number(val))}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <CameraForm
              type="camera_face"
              title="얼굴 카메라"
              subTitle="Face camera"
            />
            <CameraForm
              type="camera_vat_left"
              title="왼쪽 바트 카메라"
              subTitle="Vat Camera-Left"
            />
            <CameraForm
              type="camera_vat_right"
              title="오른쪽 바트 카메라"
              subTitle="Vat Camera-Right"
            />
          </form>
        </FormWrap>
      </FormProvider>
    );
  }
);

DeviceManage.displayName = "DeviceManage";

export default DeviceManage;
