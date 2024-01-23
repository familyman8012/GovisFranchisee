import { action, makeObservable, observable } from "mobx";
import { ILoginUserResponse } from "InterfaceFarm/auth";
import { toast } from "react-toastify";
import router from "next/router";
import {
  IEnvironmentRes,
  IEnvironmentResItem,
} from "InterfaceFarm/environment";

const TOKEN_STORAGE_KEY = "FC_AUTH_TOKEN";
const USER_STORAGE_KEY = "FC_USER_INFO";
const STORE_STORAGE_KEY = "FC_USER_STORE";

export const numberStore = observable({
  number: 0,
  name: "ddd",
  reset() {
    this.number = 0;
  },
});

interface IAuthStore {
  token: string | null;
  user_info: ILoginUserResponse["user_info"] | null;
  store_info: ILoginUserResponse["store"] | null;
  isLoggedIn: boolean;
  selected_store_idx: number | null;
  selected_store_name: string | null;
  init: () => void;
  login: (authData: ILoginUserResponse & { token: string }) => void;
  logOut: () => void;
}

export const authStore = observable<IAuthStore>({
  token: null,
  user_info: null,
  store_info: null,
  selected_store_idx: null,
  selected_store_name: null,
  get isLoggedIn() {
    return !!this.user_info && !!this.token;
  },
  init() {
    try {
      this.token = localStorage.getItem(TOKEN_STORAGE_KEY) ?? null;
      this.user_info = JSON.parse(
        String(localStorage.getItem(USER_STORAGE_KEY))
      );
      this.store_info = JSON.parse(
        localStorage.getItem(STORE_STORAGE_KEY) ?? "null"
      );
    } catch (e) {
      this.token = null;
      this.user_info = null;
      this.store_info = null;
    }
  },
  login(authData) {
    if (Object.keys(authData).length !== 0) {
      this.token = authData.token;
      this.user_info = authData.user_info;
      this.store_info = authData.store;
      this.selected_store_idx = authData.selected_store_idx;
      this.selected_store_name = authData.selected_store_name;

      localStorage.setItem(TOKEN_STORAGE_KEY, authData.token);
      localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(authData.user_info)
      );
      localStorage.setItem(STORE_STORAGE_KEY, JSON.stringify(authData.store));

      if (this.token !== "" && this.user_info.user_idx) {
        router.push(
          window.location.href.indexOf("store") > -1
            ? `${window.location.origin}/home` //home
            : `${window.location.origin}/coupon` //coupon
        );
      } else if (this.token === "" && !this.user_info.user_idx) {
        toast.error("본사 직원은 접속권한이 없습니다.");
      }
    }
  },
  logOut() {
    this.token = null;
    this.user_info = null;
    this.store_info = null;
    this.selected_store_idx = null;
    this.selected_store_name = null;

    if (
      localStorage.getItem("session") !== null ||
      localStorage.getItem("storeInfo") !== null
    ) {
      localStorage.clear();
    }

    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(STORE_STORAGE_KEY);
    location.replace("/");
  },
});

// {
//   token: null,
//   user_info: null,
//   store_info: null,
//   get isLoggedIn() {
//     return !!this.user_info && !!this.token;
//   },
//   newLogin() {
//     if (localStorage.getItem(TOKEN_STORAGE_KEY) !== null) {
//       const authData = {
//         auth_token: String(localStorage.getItem(TOKEN_STORAGE_KEY)),
//         info: { ...JSON.parse(String(localStorage.getItem(USER_STORAGE_KEY))) },
//         token: String(localStorage.getItem(STORE_STORAGE_KEY)),
//       };
//       this.login(authData);
//       // localStorage.removeItem("auth_token");
//       // localStorage.removeItem("info");
//       // localStorage.removeItem("store_token");
//     }
//   },
//   login(authData: ILoginUserResponse & { token: string }) {
//     if (Object.keys(authData).length !== 0) {
//       this.session = authData;
//       this.storeInfo = {
//         store_id: String(authData?.info.store_id),
//         store_name: String(authData?.info.store_name),
//         store_token: String(authData?.token),
//       };

//       localStorage.setItem("session", JSON.stringify(authData));
//       setAccountStoreInfo(String(authData?.info.store_id), String(authData?.info.store_name), String(authData?.token));
//       if (this.session.token !== "" && this.session.info.user_id) {
//         router.push(
//           window.location.href.indexOf("store") > -1
//             ? `${window.location.origin}/home` //home
//             : `${window.location.origin}/coupon` //coupon
//         );
//       } else if (this.session.token === "" && this.session.info.user_id !== "") {
//         toast.error("본사 직원은 접속권한이 없습니다.");
//       }
//       this.loading = false;
//     }
//   },
//   logOut() {
//     this.session = null;
//     this.storeInfo = { store_id: "", store_name: "", store_token: "" };
//     localStorage.removeItem("session");
//     localStorage.removeItem("storeInfo");
//     location.replace("/");
//     this.loading = true;
//   },
// getAuthToken() {
//   if(this.token === null) {
//     this.token = localStorage.getItem(TOKEN_STORAGE_KEY);
//   }

//   return this.token;
// },
// sessionGet() {
//   if (this.session === null) {
//     this.session = JSON.parse(String(localStorage.getItem("session")));
//     this.loading = false;
//     return this.session;
//   } else {
//     this.loading = false;
//     return this.session;
//   }
// },
// storeGet() {
//   if (this.storeInfo !== null && Object.values(this.storeInfo).every((x) => x === "")) {
//     this.storeInfo = JSON.parse(String(localStorage.getItem("storeInfo")));
//     return this.storeInfo;
//   } else {
//     return this.storeInfo;
//   }
// },
// storeChange(data: IStoreInfo) {
//   this.storeInfo = {
//     store_id: String(data.store_id),
//     store_name: String(data.store_name),
//     store_token: String(data.store_token),
//   };
//   setAccountStoreInfo(String(data.store_id), String(data.store_name), String(data.store_token));
// },
// }

class EnvironmentStore {
  data: {
    list: IEnvironmentResItem[];
  } | null = null;

  constructor() {
    makeObservable(this, {
      data: observable,
      init: action,
      getData: action,
    });
  }

  init(): void {
    if (typeof window !== "undefined" && window.sessionStorage) {
      if (!this.data) {
        this.data = JSON.parse(
          String(sessionStorage.getItem("environment") ?? "null")
        );
      }
    }
  }

  getData(reqData: { name: string }): IEnvironmentRes {
    const keys = reqData.name?.split(",");

    if (!this.data) {
      this.init();
    }

    const result = {
      list: keys.flatMap(
        (key) =>
          this.data?.list.filter(
            (item: IEnvironmentResItem) => item.name === key
          ) ?? []
      ),
    };

    // 결과 객체 반환
    return result;
  }
}

export const EnvStore = new EnvironmentStore();
