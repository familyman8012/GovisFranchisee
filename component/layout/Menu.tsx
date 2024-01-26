import React from "react";
import { observer } from "mobx-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PermissionList, menuStore } from "MobxFarm/store";
import { Goivs2Menu } from "./MenuData";

const Menu = ({ permissionList }: { permissionList: PermissionList }) => {
  const router = useRouter();
  const urlArr = router.asPath.split("/");
  const currentUrl = `/${urlArr[urlArr.length - 1]?.split("?")[0]}`;

  const isPathActive = (path: string) => {
    const pathArr = path.split("/");
    return pathArr.length > 2
      ? `/${urlArr[urlArr.length - 2]}${currentUrl}` ===
          `/${pathArr[pathArr.length - 2]}/${pathArr[pathArr.length - 1]}`
      : currentUrl === `/${pathArr[pathArr.length - 1]}` ||
          `/${urlArr[1]}/` === `/${pathArr[1]}/`;
  };

  const host = window.location.host.includes("dev")
    ? "https://dev.govis.gopizza.kr"
    : window.location.host.includes("localhost")
    ? "http://localhost:3000"
    : "https://govis.gopizza.kr";

  return (
    <>
      <h2>{menuStore.groupMap[menuStore.currentGroup].menuName}</h2>
      <ul>
        {permissionList?.menus
          ?.filter(
            (menu) =>
              menuStore.currentGroup === "Home" ||
              menu.group === menuStore.currentGroup
          )
          .map((menu) => {
            const { depth1, depth2, path } = menu;

            const isActive =
              isPathActive(String(path)) ||
              (depth2 && depth2.some((subMenu) => isPathActive(subMenu.path)));

            return (
              <li key={depth1}>
                {isPathActive(String(path)) && urlArr.length === 2 ? (
                  <span
                    className={`link_depth1 ${isActive ? "on" : ""} ${
                      path ? "depth1Only" : ""
                    }`}
                  >
                    <span className="txt">
                      {depth1 === "홈" ? "대시보드" : depth1}
                    </span>
                  </span>
                ) : (
                  <Link
                    href={
                      path
                        ? Goivs2Menu.some((el) => el === path)
                          ? String(path)
                          : `${host}${path}`
                        : Goivs2Menu.some((el) => el === depth2?.[0]?.path)
                        ? String(depth2?.[0]?.path)
                        : `${host}${depth2?.[0]?.path}`
                    }
                    className={`link_depth1 ${isActive ? "on" : ""} ${
                      path ? "depth1Only" : ""
                    }`}
                  >
                    <span className="txt">
                      {depth1 === "홈" ? "대시보드" : depth1}
                    </span>
                  </Link>
                )}

                {depth2 && (
                  <ul className={`depth2 ${isActive ? "on" : ""}`}>
                    {depth2.map((subMenu) => {
                      return (
                        <li key={subMenu.name}>
                          <Link
                            href={
                              Goivs2Menu.some(
                                (el) =>
                                  el === currentUrl || currentUrl.startsWith(el)
                              )
                                ? subMenu.path
                                : `${host}${subMenu.path}`
                            }
                            className={`link_depth2 ${
                              isPathActive(subMenu.path) ? "on" : ""
                            }`}
                          >
                            {subMenu.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default observer(Menu);
