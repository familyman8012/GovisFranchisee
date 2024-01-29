import React from "react";
import { EnvStore } from "MobxFarm/store";

const useFormOptionsWithEnvs = <T extends string>(names: readonly T[]) => {
  const { list: envs } = EnvStore.getData({
    name: names.join(","),
  });

  const initialObject = names.reduce((obj, name) => {
    obj[name] = [];

    return obj;
  }, {} as Record<T, { label: string; value: string; code: string }[]>);

  return React.useMemo(
    () =>
      envs
        ?.filter((env) => env.is_hidden !== 1)
        ?.reduce((acc, cur) => {
          const name = cur.name as T;
          if (names.includes(name)) {
            acc[name].push({
              label: `${cur.value}`,
              value: `${cur.environment_variable_idx}`,
              code: cur.code,
            });
          }
          return acc;
        }, initialObject) ?? initialObject,
    [envs]
  );
};

export default useFormOptionsWithEnvs;
