import React, { ReactElement, useEffect } from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { authStore } from "src/mobx/store";
import { useRouter } from "next/router";

import { DotSpinner } from "ComponentsFarm/elements/Loading";

const RedirectWelfare = () => {
  const router = useRouter();
  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      router.replace("/");
    }

    const timer = setTimeout(() => {
      formRef.current?.submit();
    }, 2000);

    return () => clearTimeout(timer);
  }, [authStore.isLoggedIn]);

  return (
    <Container>
      <DotSpinner />
      <p>복지몰로 이동합니다.</p>
      <form
        ref={formRef}
        action="https://cert.benecafe.co.kr/sso/loginSsoGate"
        method="post"
      >
        <input
          type="hidden"
          name="memID"
          value={`GOPIZZA_${authStore.user_info?.user_idx}`}
        />{" "}
        {/* 회원 인사정보 고유 키(사번) 또는 교차인증용 회원 인증키 / 고피자에서 생성 후 전송 */}
        <input type="hidden" name="cmpyNo" value="BIX" />
        {/* 회원 고객사 코드 / 이제너두에서 제공 */}
        <input
          type="hidden"
          name="mbrNm"
          value={authStore.user_info?.user_name ?? ""}
        />
        <input
          type="hidden"
          name="email"
          value={authStore.user_info?.user_email ?? ""}
        />
      </form>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin-top: 12px;
    font-weight: 500;
    font-size: 14px;
    color: #333;
  }

  form {
    overflow: hidden;
    position: absolute;
    width: 0;
    height: 0;
    line-height: 0;
    text-indent: -9999px;
  }
`;

RedirectWelfare.getLayout = (page: ReactElement) => page;

export default observer(RedirectWelfare);
