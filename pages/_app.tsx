import React, { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, MutationCache, QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";

import useErrorHandler from "HookFarm/useErrorHandler";

import "react-toastify/dist/ReactToastify.css";
/** @tui-calendar css */
import "tui-calendar/dist/tui-calendar.css";
import "StyleFarm/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
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

  useEffect(() => {
    registerLocale("ko", ko);
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
        <Hydrate state={pageProps.dehydratedState}>
          <ToastContainer position="top-right" pauseOnFocusLoss={false} pauseOnHover={false} />
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;