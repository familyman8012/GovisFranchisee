import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { TRACKING_ID } from "LibFarm/gtag";

function MyDocument() {
  return (
    <Html lang="ko">
      <Head>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`} strategy="afterInteractive" />
        <script
          id="gtag-script"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${TRACKING_ID}');`,
          }}
        />
      </Head>
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/* 
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-D8C029W0G1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-D8C029W0G1');
</script>

*/
export default MyDocument;
