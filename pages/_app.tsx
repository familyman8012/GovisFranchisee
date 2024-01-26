import React, { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  Hydrate,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import useErrorHandler from "HookFarm/useErrorHandler";
import { Global } from "@emotion/react";
import reset from "ComponentsFarm/pageComp/gomarket/reset";
import { EnvStore, authStore } from "src/mobx/store";
import { fetchEnvironment } from "ApiFarm/environment";
import useIsomorphicLayoutEffect from "HookFarm/useIsomorphicLayoutEffect";
import common from "@ComponentFarm/common";
import "StyleFarm/index.scss";
import "StyleFarm/icon.css";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
/** @tui-calendar css */
import "tui-calendar/dist/tui-calendar.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loadedStore, setLoadedStore] = React.useState(false);
  const { errorHandler } = useErrorHandler();

  const { current: queryClient } = React.useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
      queryCache: new QueryCache({
        onError: (e: any) => {
          if (e.code === "ECONNABORTED") {
            return router.push("/timeout");
          }

          errorHandler(e);
        },
      }),
      mutationCache: new MutationCache({
        onError: (e: any) => {
          if (e.code === "ECONNABORTED") {
            return router.push("/timeout");
          }

          errorHandler(e);
        },
      }),
    })
  );

  // useIsomorphicLayoutEffect(() => {
  //   const loadStyle = async () => {
  //     if (!router.asPath.includes("test")) {
  //       //@ts-ignore
  //       await import("StyleFarm/index.scss");
  //     }
  //   };

  //   loadStyle();
  // }, [router.asPath]);

  useEffect(() => {
    registerLocale("ko", ko);
    authStore.init();
    setLoadedStore(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const saveSessionEnvironment = async () => {
      const environment = await fetchEnvironment();
      sessionStorage.setItem("environment", JSON.stringify(environment));
    };
    if (!sessionStorage.getItem("environment")) {
      saveSessionEnvironment();
    }

    EnvStore.init();
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        {/* {router.asPath.includes("gomarket") && <Global styles={reset} />} */}
        {router.asPath.includes("aistt") && <Global styles={common} />}
        <Hydrate state={pageProps.dehydratedState}>
          <ToastContainer
            position="top-right"
            pauseOnFocusLoss={false}
            pauseOnHover={false}
          />
          {loadedStore && <Component {...pageProps} />}
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
