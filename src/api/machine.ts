import AxiosUtil from "ApiFarm/index";

import {
  iMachineListRequest,
  iMachineApplyRequest,
  iMachineApplyModifyRequest,
  iMachineViewInfoRequest,
  iMachineBoardReplyPostRequest,
  iMachineBoardReplyDeleteRequest,
} from "InterfaceFarm/MachineBoard";

export const MachineBoardList = async (params: iMachineListRequest) => {
  const response = await AxiosUtil.get(`/fc/v1/board/machine`, {
    params,
  });

  return response.data.data;
};

export const MachineApplyPost = async (data: iMachineApplyRequest) => {
  const response = await AxiosUtil.post(`/fc/v1/board/machine`, data);

  return response.data.data;
};

export const MachineApplyImgPost = async (data: FormData) => {
  const response = await AxiosUtil.post(
    `/fc/v1/board/machine/attached_image`,
    data
  );

  return response.data.data;
};

export const MachineApplyViewinfo = async (sbm_idx: string) => {
  const response = await AxiosUtil.get(`/fc/v1/board/machine/${sbm_idx}`);

  return response.data.data;
};

export const MachineApplyModifyinfo = async (
  data: iMachineApplyModifyRequest
) => {
  const response = await AxiosUtil.put(`/fc/v1/board/machine`, data);

  return response.data.data;
};

export const MachineBoardViewinfo = async (data: iMachineViewInfoRequest) => {
  const response = await AxiosUtil.get(
    `/fc/v1/board/machine_content?sbm_idx=${data.sbm_idx}`
  );

  return response.data.data;
};

export const MachineBoardReplyPost = async (
  data: iMachineBoardReplyPostRequest
) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, typeof value === "number" ? value.toString() : value);
  }

  const response = await AxiosUtil.post(
    "/fc/v1/board/machine_content",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.data;
};

export const MachineBoardReplyDelete = async (
  data: iMachineBoardReplyDeleteRequest
) => {
  const response = await AxiosUtil.delete(`fc/v1/board/machine_content`, {
    data,
  });

  return response.data.data;
};
