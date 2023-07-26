import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { authStore } from "src/mobx/store";
import Header from "./Header";
import Left from "./Left";
import { Container, ContentsArea, LayoutWrap } from "./styles";

interface Props {
  className?: string;
  children: React.ReactNode;
  title?: string;
  menuIconType?: string;
  handlerMenuIcon?: () => void;
}

export interface MenuList {
  title: string;
  path: string;
}

function Layout({
  className,
  children,
  title,
  menuIconType,
  handlerMenuIcon,
}: Props) {
  const router = useRouter();
  const [sideMenuShow, setSideMenuShow] = useState(false);
  const handlerSideMenuShow = useCallback(() => {
    setSideMenuShow((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      router.push("/");
    }
  }, [router, authStore.isLoggedIn]);

  return (
    <LayoutWrap className={className}>
      {/* menuIcontype : 메뉴, 뒤로가기 등 구분, handlerMenuIcon : 메뉴아이콘 클릭시 이벤트 */}
      <Header
        handlerSideMenuShow={handlerSideMenuShow}
        title={title ? title : undefined}
        menuIconType={menuIconType ? menuIconType : undefined}
        handlerMenuIcon={handlerMenuIcon ? handlerMenuIcon : undefined}
      />
      <Left session={authStore.user_info} sideMenuShow={sideMenuShow} />
      <ContentsArea>{children}</ContentsArea>
      {sideMenuShow && <div className="dimmed" onClick={handlerSideMenuShow} />}
    </LayoutWrap>
  );
}

export default Layout;
