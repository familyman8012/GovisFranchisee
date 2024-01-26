import React, {
  useState,
  useMemo,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useQuery } from "react-query";
import { fetchFindAllStore } from "ApiFarm/store";
import { StoreTransferInterface } from "InterfaceFarm/store";
import { StoreStatus, StoreType } from "./const";
import { StorePopupWrap } from "./style";
import Modal from "../Modal/Modal";

type SortOrder = "asc" | "desc";
type SortKey = "name" | "type" | "status" | "area_zone" | "open_date";

type SortState = {
  order: SortOrder;
  key: SortKey;
};
export type StorePopupProps = {
  listStore: { id: number; name: string }[];
  setListStore: Dispatch<SetStateAction<{ id: number; name: string }[]>>;
  status?: string;
  singleSelect?: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const StorePopup = ({
  listStore,
  setListStore,
  status = "OPEN,PLANNED",
  singleSelect,
  isOpen,
  onClose,
}: StorePopupProps) => {
  // 데이터 불러오기
  const { data } = useQuery<StoreTransferInterface[], AxiosError>(
    ["store-list", status],
    () => fetchFindAllStore({ status }),
    { enabled: isOpen }
  );

  // 매장선택관리
  const [selectStore, setSelectStore] = useState<
    { id: number; name: string }[]
  >([]);

  // 매장 초기값
  useEffect(() => {
    setSelectStore(listStore);
  }, [listStore]);

  // 검색기능
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // sort 기능
  const [sortState, setSortState] = useState<SortState>({
    order: "asc",
    key: "name",
  });

  const handleSort = (key: SortKey) => {
    if (key === sortState.key) {
      setSortState({
        ...sortState,
        order: sortState.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortState({ key, order: "asc" });
    }
  };

  // 필터된 데이터
  const filteredData = useMemo(() => {
    const filtered =
      data?.filter((store) => store.name.includes(searchText)) || [];

    if (sortState.key === "open_date") {
      return orderBy(
        filtered,
        [(store) => dayjs(store.openDurations[0]?.open_date).toDate()],
        [sortState.order]
      );
    }

    const sorted = filtered.sort((a: any, b: any) =>
      sortState.order === "asc"
        ? String(a[sortState.key]).localeCompare(String(b[sortState.key]))
        : String(b[sortState.key]).localeCompare(String(a[sortState.key]))
    );
    return sorted;
  }, [data, searchText, sortState.key, sortState.order]);

  // 매장선택 - 체크박스
  const handleStoreCheck = (checked: boolean, id: number, name: string) => {
    if (checked) {
      setSelectStore((prev) => [...prev, { id, name }]);
    } else {
      setSelectStore(selectStore.filter((store) => store.id !== id));
    }
  };

  const handleStoreAllCheck = (checked: boolean) => {
    if (checked) {
      const stores = filteredData.map((store) => ({
        id: store.id,
        name: store.name,
      }));
      setSelectStore(stores);
    } else {
      setSelectStore([]);
    }
  };

  // 매장 선택 - 라디오
  const handleStoreRadio = (id: number, name: string) => {
    setSelectStore([{ id, name }]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectStore(listStore);
      }}
    >
      <StorePopupWrap>
        <h2>매장 선택</h2>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="매장명 검색..."
        />
        {filteredData && (
          <table>
            <thead>
              <tr>
                <th>
                  {!singleSelect && (
                    <input
                      type="checkbox"
                      name="select-all"
                      onChange={(e) => handleStoreAllCheck(e.target.checked)}
                      // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                      checked={selectStore.length === filteredData.length}
                    />
                  )}
                </th>
                <th>
                  매장명
                  <button type="button" onClick={() => handleSort("name")}>
                    sort
                  </button>
                </th>
                <th>
                  구분
                  <button type="button" onClick={() => handleSort("type")}>
                    sort
                  </button>
                </th>
                <th>
                  상태
                  <button type="button" onClick={() => handleSort("status")}>
                    sort
                  </button>
                </th>
                <th>
                  상권
                  <button type="button" onClick={() => handleSort("area_zone")}>
                    sort
                  </button>
                </th>
                <th>
                  개점년도
                  <button type="button" onClick={() => handleSort("open_date")}>
                    sort
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((store) => (
                <tr key={store.id}>
                  <td>
                    <input
                      type={!singleSelect ? "checkbox" : "radio"}
                      name={
                        !singleSelect ? `select-${store.id}` : "select-store"
                      }
                      onChange={(e) =>
                        !singleSelect
                          ? handleStoreCheck(
                              e.target.checked,
                              store.id,
                              store.name
                            )
                          : handleStoreRadio(store.id, store.name)
                      }
                      // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                      checked={
                        !!selectStore.find(
                          (selStore) => selStore.id === store.id
                        )
                      }
                    />
                  </td>
                  <td>{store.name}</td>
                  <td>{StoreType[store.type]}</td>
                  <td>{StoreStatus[store.status]}</td>
                  <td>{store.area_zone}</td>
                  <td>
                    {store.openDurations[0]?.open_date &&
                    dayjs(store.openDurations[0]?.open_date).isValid()
                      ? dayjs(store.openDurations[0]?.open_date).format("YYYY")
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          type="button"
          onClick={() => {
            onClose();
            setListStore(selectStore);
          }}
        >
          완료
        </button>
      </StorePopupWrap>
    </Modal>
  );
};

export default StorePopup;
