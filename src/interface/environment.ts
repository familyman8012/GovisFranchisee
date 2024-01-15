export interface IEnvironmentReq {
  name?: string;
  environment_variable_idx?: string;
  code?: string;
  value?: string;
}

export interface IEnvironmentResItem {
  environment_variable_idx: string;
  name: string;
  code: string;
  value: string;
  is_hidden: number;
}

export interface IEnvironmentRes {
  list: IEnvironmentResItem[];
}
