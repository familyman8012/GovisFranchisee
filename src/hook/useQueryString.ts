import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import { ISort } from "InterfaceFarm/Parameters";

interface useQueryStringOptions<T> {
  ignoreFields?: (keyof T)[];
}

const isEmpty = (val: any) => val === null || val === undefined;

/**
 * @desc
 * 제네릭 타입기반 데이터 객체 변경시 browser queryString 반영
 */
export const useQueryString = <T extends Object>(
  initialParams: T,
  options?: useQueryStringOptions<T>
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const { pathname, replace, asPath } = useRouter();
  const [params, setParams] = useState<T>(initialParams);

  useEffect(() => {
    const search = `?${(options?.ignoreFields
      ? Object.entries(params).filter(
          ([key]) => !options?.ignoreFields?.includes(key as keyof T)
        )
      : Object.entries(params)
    )
      .map(([key, value]) => (!isEmpty(value) ? `${key}=${value}` : ""))
      .filter((str) => !!str)
      .join("&")}`;

    if (`?${asPath.split("?")[1]}` !== search) {
      replace(
        {
          pathname: pathname,
          search,
        },
        undefined,
        {
          scroll: false,
          shallow: true,
        }
      );
    }
  }, [params]);

  return [params, setParams];
};

export const useQueryStringWithSort = <T extends ISort, F extends any>(
  initialParams: T,
  options?: useQueryStringOptions<T>
): [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  (sort_field: keyof F) => void
] => {
  const [params, setParams] = useQueryString<T>(initialParams, options);

  const handleSort = useCallback(
    (sort_field: keyof F) => {
      switch (true) {
        case sort_field !== params.sort_field:
          setParams({ ...params, sort_field, sort_type: "asc" });
          break;
        case sort_field === params.sort_field && params.sort_type === "asc":
          setParams({ ...params, sort_field, sort_type: "desc" });
          break;
        default:
          setParams({ ...params, sort_field: "", sort_type: "" });
      }
    },
    [params]
  );

  return [params, setParams, handleSort];
};
