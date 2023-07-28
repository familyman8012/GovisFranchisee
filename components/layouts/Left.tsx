import React, { useCallback, useMemo } from "react";
import {
  LnbBottom,
  MenuListBox,
  MenuSection,
  SideMenu,
  UserInfoBox,
} from "./styles";
import { manageMenu, newsMenu } from "./menu";
import Link from "next/link";
import { MenuList } from ".";
import { BoxArrowRight } from "@emotion-icons/bootstrap/BoxArrowRight";
import { BoxArrowUpRight } from "@emotion-icons/bootstrap/BoxArrowUpRight";
import dayjs from "dayjs";
import { authStore } from "src/mobx/store";
import { ILoginUserResponse } from "InterfaceFarm/auth";

function Left({
  session,
  sideMenuShow,
}: {
  session: ILoginUserResponse["user_info"] | null;
  sideMenuShow: boolean;
}) {
  const year = useMemo(() => dayjs().year(), []);

  const handlerBtnLogout = useCallback(() => {
    authStore.logOut();
  }, []);

  return (
    <SideMenu className={sideMenuShow ? "on" : ""}>
      <MenuSection>
        <UserInfoBox>
          <p className="name">
            {session?.user_name}
            {/* <a className="btn_welfare" href="/redirect-welfare" target="_blank">
              복지몰 이동
              <BoxArrowUpRight />
            </a> */}
          </p>
          <p className="email">{session?.user_email}</p>
        </UserInfoBox>

        <MenuListItem title="매장 관리" menuData={manageMenu} />
        <MenuListItem title="본사 소식" menuData={newsMenu} />
      </MenuSection>
      <LnbBottom>
        <button className="btn_logout" onClick={handlerBtnLogout}>
          <BoxArrowRight width={20} height={20} /> 로그아웃
        </button>

        <div className="copyright">
          Copyright {year}. GOPIZZA inc. all rights reserved.
        </div>
      </LnbBottom>
    </SideMenu>
  );
}

const MenuListItem = ({
  title,
  menuData,
}: {
  title: string;
  menuData: MenuList[];
}) => {
  return (
    <MenuListBox>
      <h2>{title}</h2>
      <ul className="list">
        {menuData.map((el, i) => (
          <React.Fragment key={i}>
            {el.title !== "대시보드" && (
              <li key={`menuList${i}`}>
                <Link href={el.path}>
                  <a>{el.title}</a>
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </MenuListBox>
  );
};

export default Left;
