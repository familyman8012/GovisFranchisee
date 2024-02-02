import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import Head from "next/head";
import { useMutation, useQuery } from "react-query";

import { CheckCircleFill } from "@emotion-icons/bootstrap/CheckCircleFill";
import { List } from "@emotion-icons/bootstrap/List";
import { ChevronLeft } from "@emotion-icons/bootstrap/ChevronLeft";
import { ChevronDown } from "@emotion-icons/bootstrap/ChevronDown";

import { LayoutHead, StoreList } from "./styles";
import { fqs, manageMenu, newsMenu } from "./menu";
import { MenuList } from ".";
import Modal, { ModalBody, ModalHeader } from "ComponentsFarm/elements/Modal";
import { changeStore, fetchSwitchStores } from "src/api/store";

import { authStore } from "src/mobx/store";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Spinner from "ComponentsFarm/elements/Spinner";

import { fetchMyStore } from "ApiFarm/auth";
import { runInAction } from "mobx";

interface IHeader {
  handlerSideMenuShow: () => void;
  title?: string;
  menuIconType?: string | undefined;
  handlerMenuIcon: MouseEventHandler | undefined;
}

const setAuthStoreInfo = ({
  selected_store_idx,
  selected_store_name,
}: {
  selected_store_idx: number;
  selected_store_name: string;
}) =>
  runInAction(() => {
    authStore.selected_store_idx = selected_store_idx;
    authStore.selected_store_name = selected_store_name;
  });

function Header({
  handlerSideMenuShow,
  title,
  menuIconType,
  handlerMenuIcon,
}: IHeader) {
  const router = useRouter();
  // 현재 url 에 따른 메뉴명 나타내기
  const [headUrl, setheadUrl] = useState<undefined | MenuList>();
  useEffect(() => {
    if (!title) {
      const menu: undefined | MenuList = [
        ...manageMenu,
        ...newsMenu,
        ...fqs,
      ].find((el) => window?.location?.pathname.includes(el.path));
      setheadUrl(menu);
    }
  }, []);

  // store 팝업
  const [open, setOpen] = useState(false);

  useQuery(["selected-store"], fetchMyStore, {
    enabled: authStore.isLoggedIn,
    onSuccess: setAuthStoreInfo,
  });

  // useQuery
  const storeListQuery = useQuery(["switch-stores"], fetchSwitchStores, {
    enabled: authStore.isLoggedIn && open,
  });

  const changeStoreMutate = useMutation(changeStore, {
    onSuccess: (res) => {
      setAuthStoreInfo(res);
      setOpen(false);
      router.reload();
    },
  });

  const openStoreModal = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Head>
        <title>{title ? title : headUrl?.title} | GOVIS For Franchisee</title>
      </Head>
      <LayoutHead>
        {menuIconType === undefined ? (
          // 사이드 메뉴보기
          <button className="btn_menu_list" onClick={handlerSideMenuShow}>
            <List
              style={{ cursor: "pointer" }}
              width={"24px"}
              height={"24px"}
            />
          </button>
        ) : // 뒤로가기 버튼
        menuIconType === "back" ? (
          <button
            className="btn_menu_list"
            onClick={handlerMenuIcon ? handlerMenuIcon : () => {}}
          >
            <ChevronLeft
              style={{ cursor: "pointer" }}
              width={"24px"}
              height={"24px"}
            />
          </button>
        ) : (
          ``
        )}
        <h1>{title ? title : headUrl?.title}</h1>
        <button className="btn_store_select" onClick={openStoreModal}>
          <span className="txt">{authStore.selected_store_name ?? ""}</span>
          <ChevronDown width={"10px"} />
        </button>
      </LayoutHead>
      <Modal open={open} onClose={close}>
        <ModalHeader closeButton={close}>매장을 선택해 주세요.</ModalHeader>
        <ModalBody>
          {storeListQuery.isLoading ? (
            <Spinner />
          ) : (
            <StoreList>
              {(storeListQuery.data?.store_list ?? []).map((row) => {
                const selected = authStore.selected_store_idx === row.store_idx;
                return (
                  <li
                    key={row.mus_idx}
                    onClick={() =>
                      !changeStoreMutate.isLoading &&
                      changeStoreMutate.mutate(row.mus_idx)
                    }
                    className={selected ? "selected" : ""}
                  >
                    <span className="store-name">{row.store_name}</span>
                    {selected && <CheckCircleFill className="icon" />}
                  </li>
                );
              })}
            </StoreList>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}

export default observer(Header);
