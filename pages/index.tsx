import { useState, useEffect, useMemo, SyntheticEvent } from "react";
import Head from "next/head";
import Image from "ComponentsFarm/elements/Image";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import { QuestionCircle } from "@emotion-icons/bootstrap";
import {
  Copyright,
  LoginGuide,
  LoginInput,
  LoginInputLabel,
  LoginInputWrap,
  LoginLogo,
  LoginMain,
  LoginWrap,
} from "ComponentsFarm/pageComp/login/style";
import { Button } from "ComponentsFarm/elements/Button";

import { toast } from "react-toastify";
import { observer } from "mobx-react";

import { PALLETES } from "LibFarm/color";
import { runInAction } from "mobx";
import { authStore } from "src/mobx/store";
import { LoginGuideModal } from "ComponentsFarm/pageComp/login/LoginGuideModal";
import { fetchMyInfo, login } from "ApiFarm/auth";
import useErrorHandler from "HookFarm/useErrorHandler";

function Login() {
  const router = useRouter();
  const { errorHandler } = useErrorHandler();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [isLoginState, setIsLoginState] = useState(-1);

  const now = useMemo(() => dayjs(), []);

  useEffect(() => {
    if (authStore.isLoggedIn) {
      setIsLoginState(1);
      router.push(
        window.location.href.indexOf("store") > -1
          ? `${window.location.origin}/home` //home
          : `${window.location.origin}/coupon` //coupon
      );
    } else {
      setIsLoginState(0);
    }
  }, [router]);

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const tokenResponse = await login({
        email,
        password,
      });
      const user = await fetchMyInfo(tokenResponse["GO-AUTH"]);

      runInAction(() => {
        authStore.login({
          token: tokenResponse["GO-AUTH"],
          ...user,
        });
      });
    } catch (e: any) {
      if (e.code === "9001") {
        toast.error("아이디 또는 이메일과 비밀번호를 확인해 주세요.");
      } else {
        errorHandler(e);
      }
    }
  };

  if (isLoginState === -1) {
    return <div></div>;
  }

  return (
    <>
      {isLoginState === 0 ? (
        <LoginWrap>
          <Head>
            <title>Login | GOVIS Franchisee</title>
          </Head>
          <LoginMain>
            <LoginLogo>
              <h1 title="GOViS For Franchisee">
                <Image
                  src="/img/govis_fc_logo.png"
                  layout="fill"
                  alt="GOViS For Franchisee"
                />
              </h1>
            </LoginLogo>
            <form onSubmit={(e) => handleLogin(e)}>
              <LoginInputWrap>
                <LoginInputLabel htmlFor="loginEmail">이메일</LoginInputLabel>
                <LoginInput
                  id="loginEmail"
                  type="email"
                  placeholder="발급받은 이메일을 입력해주세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </LoginInputWrap>
              <LoginInputWrap>
                <LoginInputLabel htmlFor="inputPassword">
                  비밀번호
                </LoginInputLabel>
                <LoginInput
                  id="inputPassword"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </LoginInputWrap>
              <LoginGuide>
                <Button
                  leftIcon={<QuestionCircle />}
                  type="button"
                  color={PALLETES["success-1"]}
                  outline
                  size="sm"
                  clear
                  onClick={() => setShowGuideModal(true)}
                >
                  이용안내
                </Button>
              </LoginGuide>
              <Button type="submit" block color={PALLETES["primary-3"]}>
                로그인
              </Button>
              <Copyright id="copyright" className="text-typo-3 gv-text-center">
                <span className="gv-typo-caption-1 gv-font-kr">{`© ${now.year()}. GOPIZZA. All rights reserved.`}</span>
              </Copyright>
            </form>
          </LoginMain>
          <LoginGuideModal
            show={showGuideModal}
            onClose={() => setShowGuideModal(false)}
          />
        </LoginWrap>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default observer(Login);
