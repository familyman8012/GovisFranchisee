// utils/convertObject.js

import { EnvStore } from "MobxFarm/store";

/**
 * 원본 데이터 타입
 */
export type SourceObj = {
  code: string | null;
  environment_variable_idx: string;
  name: string;
  value: string;
};

/**
 * 변환된 데이터 타입
 */
export type convertEnvObj = {
  label: string;
  value: string;
};

/**
 * 원본 데이터를 받아서 label, value 구조로 변환하는 함수
 * @param category 원하는 카테고리명
 * @param data 원본 데이터 배열
 * @returns 변환된 데이터 배열
 */
export function convertEnv(category: string): convertEnvObj[] {
  if (category === "boolean") {
    return [
      { label: "미사용", value: "0" },
      { label: "사용", value: "1" },
    ];
  }
  const data = EnvStore?.getData({
    name: category,
  })?.list;

  // 주어진 카테고리에 해당하는 데이터만 필터링
  const filteredData = data.filter((item) => item?.name === category);

  // 필터링된 데이터를 label, value 형태로 변환
  return filteredData.map((item) => ({
    label: item.value,
    value: item.environment_variable_idx,
  }));
}

/**
 * 주어진 카테고리-레이블 쌍 배열을 바탕으로 selectConfig 배열을 생성하는 함수
 * @param categoryPairs 카테고리-레이블 쌍 배열
 * @param dataList 원본 데이터 리스트
 * @returns 생성된 selectConfig 배열
 */

export type SelectConfig = {
  label: string;
  field: string;
  options: convertEnvObj[];
};

export const envConfigGeneration = (
  categoryPairs: [string, string, convertEnvObj[]?][]
): SelectConfig[] => {
  return categoryPairs.map(([label, category, customOptions]) => {
    const optionsFromData = customOptions || convertEnv(category);

    // {label: "전체", value: ""}를 각 options 배열의 시작 부분에 추가
    const options = [{ label: "전체", value: "" }, ...optionsFromData];

    const field = customOptions ? category : `evi_${category}`;

    return {
      label,
      field,
      options,
    };
  });
};
