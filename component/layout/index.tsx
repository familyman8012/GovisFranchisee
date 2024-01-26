import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextProgress from 'next-progress';
import { ErrorBoundary } from 'react-error-boundary';
import { getUrlText } from '@UtilFarm/getUrlText';
import LeftMenu from './LeftMenu';
import { Content, LayoutWrap } from './styles';

interface ILayout {
  children: React.ReactNode;
}

const Fallback = ({ error }: { error: unknown }) => {
  console.log('error', error);
  useEffect(() => {
    if (error) {
      // alert(error);
      console.log(error);
    }
  }, [error]);

  return <p>THERE is some ERROR...</p>;
};

// const ErrorComponent = () => {
//   const [error, setError] = useState(false);
//   if (error) {
//     throw new Error('Error occured');
//   }
//   return (
//     <button type="button" onClick={() => setError(true)}>
//       Error Fire
//     </button>
//   );
// };

const Layout: React.FC<ILayout> = ({ children }) => {
  const router = useRouter();
  const depth1Text = getUrlText(router.asPath);
  return (
    <>
      <Head>
        <title>{`${depth1Text} | GOVIS`}</title>
      </Head>
      <NextProgress
        height={2}
        delay={600}
        disableSameRoute
        color="var(--color-orange60)"
        options={{ showSpinner: false }}
      />
      <LayoutWrap>
        <LeftMenu />
        <ErrorBoundary FallbackComponent={Fallback}>
          <Content>{children}</Content>
        </ErrorBoundary>
      </LayoutWrap>
    </>
  );
};

export default Layout;
