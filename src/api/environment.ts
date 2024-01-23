import { IEnvironmentReq, IEnvironmentRes } from "InterfaceFarm/environment";
import { CommonRequest } from ".";

export const fetchEnvironment = async (params?: IEnvironmentReq) => {
  const response = await CommonRequest.get<IResponse<IEnvironmentRes>>(
    "/environment_variable/list",
    {
      params,
    }
  );

  return response.data.data;
};
