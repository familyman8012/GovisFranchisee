import { QueryParams } from "HookFarm/useQueryParams";

// 날짜 관련 쿼리 파라미터를 추출합니다.
export const dateParams = (params: QueryParams) =>
  new URLSearchParams({
    base_dt_start: String(params.base_dt_start),
    base_dt_finish: String(params.base_dt_finish),
    comparison_dt_start: String(params.comparison_dt_start),
    comparison_dt_finish: String(params.comparison_dt_finish),
  }).toString();
