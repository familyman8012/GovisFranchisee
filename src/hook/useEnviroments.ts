// useEnvironments.ts
import { useMemo } from 'react';
import { SourceObj, convertEnv } from '@UtilFarm/convertEnvironment';

export type EnvironmentKeyMapping = [string, string];
type EnvironmentsReturn = {
  [key: string]: ReturnType<typeof convertEnv>;
};

const useEnvironments = (
  environmentList: SourceObj[],
  envKeys: EnvironmentKeyMapping[]
): EnvironmentsReturn => {
  return envKeys.reduce<EnvironmentsReturn>((acc, [key, name]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    acc[name] = useMemo(() => convertEnv(key), [environmentList]);
    return acc;
  }, {});
};

export default useEnvironments;
