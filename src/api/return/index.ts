import AxiosUtil from "..";
import { iReturnApplyRequest } from "../../interface/ReturnBoard";

export const returnBoardListApi = async () => {
  const result = await AxiosUtil.get("/fc/v1/board/return");
  return result.data;
};

export const returApplyPostApi = async (data: iReturnApplyRequest) => {
  const result = await AxiosUtil.post("/fc/v1/board/return", data);
  return result.data;
};
