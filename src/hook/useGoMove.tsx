// hooks/useHandleBack.js
import { useRouter } from 'next/router';

export const useGoMove = () => {
  const router = useRouter();
  const { pathname, query } = router;

  const onMove = (url: string) => {
    router.push({
      pathname: `/${url}`,
      query,
    });
  };

  const onBack = (depth = -1) => {
    const newPath = pathname.split('/').slice(0, depth).join('/');
    router.push({
      pathname: `/${newPath}`,
      query,
    });
  };

  return { onMove, onBack };
};
