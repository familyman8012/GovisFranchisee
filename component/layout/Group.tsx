import React, { useEffect, useRef, useState } from "react";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Modal from "@ComponentFarm/modules/Modal/Modal";
import Tooltip from "@ComponentFarm/atom/Tooltip/Tooltip";
import { IconViewArea } from "@ComponentFarm/common";
import { PermissionList, authStore, menuStore } from "MobxFarm/store";
import ChangePasswordModal from "./ChangePasswordModal";
import { Goivs2Menu } from "./MenuData";

const Group = ({ permissionList }: { permissionList: PermissionList }) => {
  const router = useRouter();
  const [layerAccountShow, setLayerAccountShow] = useState(false);
  const layerRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const host = window.location.host.includes("dev")
    ? "https://dev.govis.gopizza.kr"
    : window.location.host.includes("localhost")
    ? "http://localhost:3000/"
    : "https://govis.gopizza.kr";

  // url 에 따라 적절한 그룹탭을 보여준다.
  useEffect(() => {
    const currentPath = router.asPath;
    // url 이 어느 그룹에 있는지 찾기
    const currentGroup = permissionList?.menus?.find((menu) => {
      return (
        menu.path === currentPath ||
        menu.depth2?.some((subMenu) => subMenu.path === currentPath)
      );
    })?.group;

    // mobx 에 전달
    if (currentGroup) {
      runInAction(() => {
        menuStore.currentGroup = currentGroup;
      });
    }
  }, [router.asPath, permissionList]);

  const handleGroupClick = (group: string) => {
    runInAction(() => {
      // 필터링
      menuStore.currentGroup = group;
      // 첫번째 메뉴로 이동
      const firstMenu = permissionList.menus.find(
        (menu) => menu.group === group
      );
      if (firstMenu) {
        const path = Goivs2Menu.some((el) => el === firstMenu.path)
          ? firstMenu.path
          : !firstMenu.depth2
          ? `${host}/${firstMenu.path}`
          : Goivs2Menu.some(
              (el) => el === (firstMenu.depth2 && firstMenu.depth2[0].path)
            )
          ? firstMenu.depth2 && firstMenu.depth2[0].path
          : firstMenu.depth2 && `${host}${firstMenu.depth2[0].path}`;
        if (path) {
          router.push(path);
        }
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        layerAccountShow &&
        layerRef.current &&
        !layerRef.current.contains(event.target as Node)
      ) {
        setLayerAccountShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // 컴포넌트 언마운트 시, 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [layerAccountShow]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);
  const handlerClose = () => {
    setIsOpen(false);
  };

  const handlePasswordChanged = React.useCallback(() => {
    toast.success("비밀번호가 변경되었습니다. 다시 로그인해 주세요.");
    authStore.logOut();
  }, []);

  const handlePasswordCancel = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <h1>
        <span className="hiddenZoneV">GOPIZZA</span>
      </h1>
      <ul>
        {permissionList?.iconMenus?.map((el) => {
          const { component: Icon, menuName } = menuStore.groupMap[el];
          return (
            <li key={el} className={menuStore.currentGroup === el ? "on" : ""}>
              <button type="button" onClick={() => handleGroupClick(el)}>
                <span className="box_svg">
                  <IconViewArea size={24}>
                    <Icon size={24} />
                  </IconViewArea>
                </span>
                <span className="hiddenZoneV">{menuName}</span>
                <Tooltip eventType="hover" direction="right">
                  {menuName}
                </Tooltip>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="area_user_setting">
        <button
          type="button"
          onClick={() => setLayerAccountShow((prev) => !prev)}
        >
          {authStore.user_info?.user_name?.[0]}
        </button>
        {layerAccountShow && (
          <ul className="layer_set_account" ref={layerRef}>
            <li>
              <button type="button" onClick={() => setIsOpen(true)}>
                비밀번호 변경
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  runInAction(() => {
                    authStore.logOut();
                  });
                }}
              >
                로그아웃
              </button>
            </li>
          </ul>
        )}
      </div>
      <Modal
        title="비밀번호 변경"
        isOpen={isOpen}
        onClose={handlerClose}
        showCloseButton
        showButtons={false}
      >
        <ChangePasswordModal
          show={isOpen}
          userId={Number(authStore?.user_info?.user_idx)}
          onComplete={handlePasswordChanged}
          onClose={handlePasswordCancel}
        />
      </Modal>
    </>
  );
};

export default observer(Group);
