import React, { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { List, ChevronLeft, BoxArrowRight, ChevronDown } from "@emotion-icons/bootstrap";
import { LayoutHead, StoreList } from "./styles";
import { fqs, manageMenu, newsMenu } from "./menu";
import { MenuList } from ".";
import Modal, { ModalBody, ModalHeader } from "ComponentsFarm/elements/Modal";
import { getStoreSwitchStoerListApi, getStoreSwitchStoreInfoApi, iStoreSwitchStoreListItem } from "src/api/store";
import { reloadSession } from "LibFarm/.";
import Spinner from "ComponentsFarm/elements/Spinner";
import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { authStore } from "src/mobx/store";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Head from "next/head";

interface IHeader {
  handlerSideMenuShow: () => void;
  title?: string;
  menuIconType?: string | undefined;
  handlerMenuIcon: MouseEventHandler | undefined;
}

function Header({ handlerSideMenuShow, title, menuIconType, handlerMenuIcon }: IHeader) {
  const router = useRouter();
  // 현재 url 에 따른 메뉴명 나타내기
  const [headUrl, setheadUrl] = useState<undefined | MenuList>();
  useEffect(() => {
    if (!title) {
      const menu: undefined | MenuList = [...manageMenu, ...newsMenu, ...fqs].find((el) =>
        window?.location?.pathname.includes(el.path)
      );
      setheadUrl(menu);
    }
  }, []);

  // store 팝업
  const [open, setOpen] = useState(false);

  // useQuery
  const { data: storeListData, refetch } = useQuery<AxiosResponse<any>, AxiosError>(
    ["storeList"],
    getStoreSwitchStoerListApi
  );

  const openStoreModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handlerSelectStore = useCallback(async (mus_idx: number) => {
    const selStoreData = await getStoreSwitchStoreInfoApi(mus_idx);
    console.log("selStoreData selStoreData", selStoreData);
    authStore.storeChange(selStoreData);
    //reloadSession();
    router.reload();
    setOpen(false);
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
            <List style={{ cursor: "pointer" }} width={"24px"} height={"24px"} />
          </button>
        ) : // 뒤로가기 버튼
        menuIconType === "back" ? (
          <button className="btn_menu_list" onClick={handlerMenuIcon ? handlerMenuIcon : () => {}}>
            <ChevronLeft style={{ cursor: "pointer" }} width={"24px"} height={"24px"} />
          </button>
        ) : (
          ``
        )}
        <h1>{title ? title : headUrl?.title}</h1>
        <button className="btn_store_select" onClick={openStoreModal}>
          <span className="txt">{authStore?.storeInfo?.store_name ? authStore?.storeInfo?.store_name : ""}</span>
          <ChevronDown width={"10px"} />
        </button>
      </LayoutHead>
      <Modal open={open} onClose={close}>
        <ModalHeader closeButton={close}>매장을 선택해 주세요.</ModalHeader>
        <ModalBody>
          {storeListData !== undefined && storeListData?.data.store_list.length > 0 ? (
            <StoreList>
              {storeListData?.data.store_list.map((row: iStoreSwitchStoreListItem) => {
                return (
                  <li
                    key={row.mus_idx}
                    onClick={() => {
                      handlerSelectStore(row.mus_idx);
                    }}
                  >
                    <span>{row.store_name}</span>
                  </li>
                );
              })}
            </StoreList>
          ) : (
            <Spinner />
          )}
        </ModalBody>
      </Modal>
    </>
  );
}

export default observer(Header);
