import { IUpdateUserPassword } from "InterfaceFarm/user";
import { BoRequest } from ".";

export const patchUserPassword = async (params: IUpdateUserPassword) => {
  return BoRequest.put("/user/password", params);
};
