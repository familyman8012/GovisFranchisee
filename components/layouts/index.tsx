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
  const { loading, session } = authStore;
  const [sideMenuShow, setSideMenuShow] = useState(false);
  const [isLoginState, setIsLoginState] = useState(-1);
  const handlerSideMenuShow = useCallback(() => {
    setSideMenuShow((prev) => !prev);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("storeInfo") === null) {
      setIsLoginState(0);
      window.location.href = "/";
    } else {
      setIsLoginState(1);
    }
  }, [router]);

  return (
    <>
      {isLoginState === 1 ? (
        <LayoutWrap className={className}>
          {/* menuIcontype : 메뉴, 뒤로가기 등 구분, handlerMenuIcon : 메뉴아이콘 클릭시 이벤트 */}
          <Header
            handlerSideMenuShow={handlerSideMenuShow}
            title={title ? title : undefined}
            menuIconType={menuIconType ? menuIconType : undefined}
            handlerMenuIcon={handlerMenuIcon ? handlerMenuIcon : undefined}
          />
          <Left session={session} sideMenuShow={sideMenuShow} />
          <ContentsArea>{children}</ContentsArea>
          {sideMenuShow && (
            <div className="dimmed" onClick={handlerSideMenuShow} />
          )}
        </LayoutWrap>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Layout;
