export interface Supervisor {
  id: number;
  email: string;
  isStaff: boolean;
  name: string;
  stores: Array<number>;
}

export interface OpenDuration {
  open_date?: string;
  closeDate?: string;
  deliveryStartDate?: string;
  type?: string;
  storeId?: number;
  expiredDate?: string;
}

export interface Store {
  code: string;
  name: string;
  type: string;
  status: string;
  address: string;
  supervisor: Supervisor | null;
  owner: string | null;
  ownerPhoneNumber: string | null;
  manager: string | null;
  managerPhoneNumber: string | null;
  storePhoneNumber: string | null;
  email: string | null;
  businessType: string | null;
  openDurations: Array<OpenDuration>;
  businessTime: string | null;
  area_zone: string | null;
  operationType: string | null;
  govenType: string | null;
  space: number | null;
  seatsCount: number | null;
  interiorCompany: string | null;
  channelStores?: any | null;
}

export interface StoreTransferInterface extends Store {
  id: number;
}

export interface IStoreItem extends Store {
  id: number;
}

export interface StoreTableInterface {
  id: number;
  name: string;
  code: string;
  status: string;
  supervisor: string;
  owner: string;
  ownerPhoneNumber: string;
  manager: string;
  managerPhoneNumber: string;
  operationType: string;
  openDate?: string;
  closeDate?: string;
  deliveryDate?: string;
  tableActions: any;
}

export interface StoreChkType {
  id: string;
  name: string;
  active: boolean;
  operationType: string;
  year: number;
}

export type StoreChkTypeTest = StoreTransferInterface & {
  active: boolean;
  year: string;
};

export interface IStoreRelate {
  id: number;
  name: string;
}
