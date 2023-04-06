import AxiosUtil from "./index";
import { IScheduleFetchParams } from "InterfaceFarm/Calendar";

export const fetchScheduleList = async (params: IScheduleFetchParams) => {
  const response = await AxiosUtil.get("/store/board/calendar", {
    params,
  });

  return response.data.data;
};

export const fetchSchedule = async (id: number | string) => {
  const response = await AxiosUtil.get(`/store/board/calendar/${id}`);

  return response.data.data;
};
