import {
  FqsStoreInfoParams,
  IFqsInspectionInfo,
  IFqsInspectionListResponse,
  IFqsMonitoringMakeHistory,
  IFqsMonitoringVideoInfo,
  IFqsStoreCameraInfo,
  IFqsStoreCameraVideoList,
  IFqsStoreDeviceInfo,
  IFqsStoreDeviceListResponse,
  IFqsStoreInfoResponse,
  IFqsStoreStatus,
} from "InterfaceFarm/ai-fqs";
import {
  IAisttStateReq,
  IDetailStateRes,
  IManufacturingListReq,
  IManufacturingListRes,
  IManufacturingQualityRes,
  IManufacturingTimeRes,
  IPizzaStatusRes,
  IReportAnalysisModifyReq,
  IReportDetailAnalysModifyisRes,
  IReportInfoRes,
  IReportListReq,
  IReportListRes,
  IReportMailHistoryReq,
  IReportMailHistoryRes,
  IReportMailSendReq,
  IReportMailSendRes,
  IReportManufacturingStatusRes,
  IReportScoreAverageDetailRes,
  IReportScoreAverageRes,
  IStoreManufacturingStateRes,
  IimprovementStatusRes,
} from "InterfaceFarm/aistt";
import { QueryParams } from "HookFarm/useQueryParams";
import AxiosUtil, { BoV2Request } from ".";

// 제품 분석
export const fetchInspectionList = (params: QueryParams) => {
  return BoV2Request.get<IResponse<IFqsInspectionListResponse>>(
    "/aifqs/inspection/list",
    { params }
  ).then((res) => res.data.data);
};

export const fetchInspectionInfo = (inspection_info_idx: number) => {
  return BoV2Request.get<IResponse<IFqsInspectionInfo>>(
    `/aifqs/inspection/info/${inspection_info_idx}`
  ).then((res) => res.data.data);
};

export const requestInspection = (inspection_info_idx: number) => {
  return BoV2Request.put(
    `/aifqs/inspection/info/${inspection_info_idx}/re-request`
  );
};

// 기기관리
export const fetchAiFqsDeviceStatus = () => {
  return BoV2Request.get<IResponse<IFqsStoreStatus>>(
    `/aifqs/stt/devices/statuses`
  ).then((res) => res.data.data);
};

export const fetchAisttStoreList = (params: QueryParams) => {
  return BoV2Request.get<IResponse<IFqsStoreDeviceListResponse>>(
    `/aifqs/stt/devices/list`,
    { params }
  ).then((res) => res.data.data);
};

export const fetchAisttStoreInfo = (store_idx: number) => {
  return BoV2Request.get<IResponse<IFqsStoreInfoResponse>>(
    `/aifqs/stt/info/${store_idx}`
  ).then((res) => res.data.data);
};

export const fetchAisttDeviceInfo = (store_idx: number) => {
  return BoV2Request.get<IResponse<IFqsStoreDeviceInfo>>(
    `/aifqs/stt/device/${store_idx}`
  ).then((res) => res.data.data);
};

export const fetchAisttDeviceCameraInfo = (params: {
  store_idx: number;
  store_stt_camera_idx: number;
}) => {
  return BoV2Request.get<IResponse<IFqsStoreCameraInfo>>(
    `/aifqs/stt/device/camera/${params.store_idx}/${params.store_stt_camera_idx}/info`
  ).then((res) => res.data.data);
};

export const fetchAisttDeviceCameraVideoList = (params: {
  store_idx: number;
  store_stt_camera_idx: number;
  recode_date: string;
}) => {
  return BoV2Request.get<IResponse<IFqsStoreCameraVideoList>>(
    `/aifqs/stt/device/camera/${params.store_idx}/${params.store_stt_camera_idx}/list/${params.recode_date}`
  ).then((res) => res.data.data);
};

export const updateUpdateAisttInfo = ({
  store_idx,
  ...data
}: FqsStoreInfoParams) => {
  return BoV2Request.put(`/aifqs/stt/info/${store_idx}`, data);
};

// 현황, 보고서
export const fetchImprovementStatus = async (params?: IAisttStateReq) => {
  const response = await BoV2Request.get<IResponse<IimprovementStatusRes>>(
    `/aifqs/overview/pizzas/improvement/needed`,
    {
      params,
    }
  );
  return response.data.data;
};

export const fetchManufacturingQuality = async (params?: IAisttStateReq) => {
  const response = await BoV2Request.get<IResponse<IManufacturingQualityRes>>(
    `/aifqs/overview/manufacturing/quality`,
    {
      params,
    }
  );
  return response.data.data;
};

export const fetchManufacturingTime = async (params?: IAisttStateReq) => {
  const response = await BoV2Request.get<IResponse<IManufacturingTimeRes>>(
    `/aifqs/overview/manufacturing/average-production-time`,
    {
      params,
    }
  );
  return response.data.data;
};

export const fetchStoreManufacturingState = async (params?: IAisttStateReq) => {
  const response = await BoV2Request.get<
    IResponse<IStoreManufacturingStateRes>
  >(`/aifqs/overview/stores/manufacturing-status`, {
    params,
  });
  return response.data.data;
};

export const fetchPizzaStatus = async (params?: IAisttStateReq) => {
  const response = await BoV2Request.get<IResponse<IPizzaStatusRes>>(
    `/aifqs/quality/pizza-status`,
    {
      params,
    }
  );
  return response.data.data;
};

export const fetchDetailState = async (params?: IAisttStateReq) => {
  const response = await BoV2Request.get<IResponse<IDetailStateRes>>(
    `/aifqs/overview/details/reports`,
    {
      params,
    }
  );
  return response.data.data;
};

export const fetchManufacturingList = async (params: IManufacturingListReq) => {
  const { search_start_dt, search_end_dt, ...rest } = params;

  const response = await BoV2Request.get<IResponse<IManufacturingListRes>>(
    `/aifqs/overview/production/list`,
    {
      params: {
        ...rest,
        manufacture_dt_start: search_start_dt,
        manufacture_dt_finish: search_end_dt,
      },
    }
  );
  return response.data.data;
};

export const fetchManufacturingInfo = async (inspection_info_idx?: number) => {
  const response = await BoV2Request.get<IResponse<IFqsInspectionInfo>>(
    `/aifqs/overview/production/detail/${inspection_info_idx}`
  );
  return response.data.data;
};

// 레포트
export const fetchReportList = async (params: IReportListReq) => {
  const response = await BoV2Request.get<IResponse<IReportListRes>>(
    `/aifqs/reports/list`,
    {
      params,
    }
  );
  return response.data.data;
};

export const fetchReportInfo = async (fqs_reports_idx: number) => {
  const response = await BoV2Request.get<IResponse<IReportInfoRes>>(
    `/aifqs/reports/details/${fqs_reports_idx}`
  );
  return response.data.data;
};

export const fetchAnalysisResult = async ({
  fqs_reports_idx,
  number,
  contents,
}: IReportAnalysisModifyReq) => {
  const response = await BoV2Request.put<
    IResponse<IReportDetailAnalysModifyisRes>
  >(`/aifqs/reports/details/${fqs_reports_idx}/analysis-result/${number}`, {
    contents,
  });

  return response.data.data;
};

export const fetchReportManufacturingStatus = async ({
  fqs_reports_idx,
  store_idx,
}: {
  fqs_reports_idx: string;
  store_idx?: string;
}) => {
  const response = await BoV2Request.get<
    IResponse<IReportManufacturingStatusRes>
  >(
    `/aifqs/reports/details/${fqs_reports_idx}/manufacturing-status`,
    store_idx !== "undefined"
      ? {
          params: { store_idx },
        }
      : {}
  );
  return response.data.data;
};

export const fetchScoreResult = async ({
  fqs_reports_idx,
  store_idx,
  sort_target,
  sort_type,
}: {
  fqs_reports_idx: string;
  store_idx?: string;
  sort_target?: string;
  sort_type: string;
}) => {
  const response = await BoV2Request.get<IResponse<IReportScoreAverageRes>>(
    `/aifqs/reports/details/${fqs_reports_idx}/ratings-sorted-results`,
    store_idx !== "undefined"
      ? {
          params: { store_idx, sort_target, sort_type },
        }
      : { params: { sort_target, sort_type } }
  );

  return response.data.data;
};

export const fetchScoreResultDetail = async ({
  fqs_reports_idx,
  product_info_idx,
  store_idx,
}: {
  fqs_reports_idx: string;
  product_info_idx: string;
  store_idx?: string;
}) => {
  const response = await BoV2Request.get<
    IResponse<IReportScoreAverageDetailRes>
  >(
    `/aifqs/reports/details/${fqs_reports_idx}/ratings-sorted-results/${product_info_idx}`,
    store_idx !== "undefined"
      ? {
          params: { store_idx },
        }
      : {}
  );

  return response.data.data;
};

export const fetchReportMailSend = async ({
  fqs_reports_idx,
  body,
}: {
  fqs_reports_idx: string;
  body: IReportMailSendReq;
}) => {
  const response = await BoV2Request.post<IResponse<IReportMailSendRes>>(
    `/aifqs/reports/details/${fqs_reports_idx}/mail-send`,
    { ...body }
  );
  return response.data.data;
};

export const fetchReportMailSendList = async ({
  fqs_reports_idx,
  params,
}: {
  fqs_reports_idx: string;
  params: IReportMailHistoryReq;
}) => {
  const response = await BoV2Request.get<IResponse<IReportMailHistoryRes>>(
    `/aifqs/reports/details/${fqs_reports_idx}/mail-send`,
    {
      params,
    }
  );
  return response.data.data;
};

// 매장 모니터링
export const fetchMonitoringInspectionInfo = (inspection_info_idx: number) => {
  return BoV2Request.get<IResponse<IFqsInspectionInfo>>(
    `/aifqs/monitoring/product/manufacturing/info/${inspection_info_idx}`
  ).then((res) => res.data.data);
};

export const fetchMonitoringStoreRecordList = () => {
  return AxiosUtil.get<
    IResponse<{
      list: {
        record_date: string;
        record_count: number;
        video_length_sum: number;
      }[];
    }>
  >(`/fc/v2/aifqs/monitoring/table/record`).then((res) => res.data.data);
};

export const fetchMonitoringStoreVideoList = ({
  record_date,
}: {
  record_date: string;
}) => {
  return AxiosUtil.get<
    IResponse<{
      list: IFqsMonitoringVideoInfo[];
    }>
  >(`/fc/v2/aifqs/monitoring/table/record/list/${record_date}`).then(
    (res) => res.data.data
  );
};

export const fetchMonitoringStoreProductList = ({
  store_stt_cctv_idx,
  record_date,
}: {
  store_stt_cctv_idx: number;
  record_date: string;
}) => {
  return AxiosUtil.get<
    IResponse<{
      total_count: number;
      list: IFqsMonitoringMakeHistory[];
    }>
  >(
    `/fc/v2/aifqs/monitoring/table/record/list/${record_date}/${store_stt_cctv_idx}/inspection`,
    {
      params: {
        current_num: 1,
        per_num: 9999,
      },
    }
  ).then((res) => res.data.data);
};
