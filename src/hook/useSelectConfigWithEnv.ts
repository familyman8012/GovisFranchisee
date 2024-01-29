import { EnvStore } from "MobxFarm/store";
import React from "react";

const useSelectConfigWithEnv = (config: any) => {
  const { list: envs } = EnvStore.getData({
    name: (config ?? [])
      .map((cfg: any) => cfg.field?.replace("evi_", ""))
      .join(","),
  });

  return React.useMemo(
    () =>
      config.map((select: any) => {
        const matchEnvs = envs.filter((env) => select.field.endsWith(env.name));

        return {
          ...select,
          options: [
            ...select.options,
            ...matchEnvs.map((env) => ({
              label: env.value,
              value: env.environment_variable_idx,
            })),
          ],
        };
      }),
    [config, envs]
  );
};

export default useSelectConfigWithEnv;
