import { css } from "@emotion/react";
import { EnvironmentKeyMapping } from "HookFarm/useEnviroments";
import { tabGetQueryId } from "@UtilFarm/tabGetQueryId";

// index 페이지 - tab
export const tab_reportIndex = [
  {
    title: "레포트 목록",
  },
];

export const tab_reportDetail = [
  {
    title: "전체 매장",
  },
];

export type environmentConfigEntry =
  | [string, string]
  | [string, string, { label: string; value: string }[]];

export const selectConfigSet: environmentConfigEntry[] = [
  [
    "발송여부",
    "is_send",
    [
      { label: "발송됨", value: "1" },
      { label: "발송안됨", value: "2" },
    ],
  ],
];

export const dateConfig = [
  {
    field: "registration_start_dt",
    placeholder: "등록 시작일",
  },
  {
    field: "registration_end_dt",
    placeholder: "등록 종료일",
    minDate: "registration_start_dt",
  },
];

export const searchOption = [
  {
    label: "레포트 코드",
    value: "fqs_reports_code",
  },
  {
    label: "레포트 명",
    value: "fqs_reports_name",
  },
];

// 상세페이지 - 보기, 등록, 수정 ([...id].tsx 의 Form.tsx)
export const productStyles = css`
  .line1 {
    .field {
      display: block;
    }
    .box {
      display: flex;

      &:first-of-type {
        margin-bottom: 2.4rem;
      }
    }
  }
  .line1,
  .line3,
  .line5 {
    .field {
      width: 100%;
    }
  }
  .line1,
  .line2,
  .line4,
  .line6 {
    .field {
      width: 50%;
    }
  }
`;

export const envKeys: EnvironmentKeyMapping[] = [
  ["product_status", "STATUS"],
  ["product_group", "GROUP"],
  ["product_category", "CATEGORY"],
  ["sale_type", "SALETYPE"],
];

export type PageModeSettings = {
  title: string;
  firstButtonText: string;
  secondButtonText: string;
};

export const searchStatus = [
  {
    value: "",
    label: "전체",
  },
  {
    value: "0",
    label: "시행 전",
  },
  {
    value: "1",
    label: "시행 중",
  },
  {
    value: "2",
    label: "만료",
  },
];

// 상세페이지 - 탭
export interface Tab {
  title: string;
  url: string;
  query?: { id?: string | string[] };
}

export const settingsByMode: Record<string, PageModeSettings> = {
  add: {
    title: "제품 등록",
    firstButtonText: "취소",
    secondButtonText: "등록",
  },
  modify: {
    title: "제품 상세 정보 수정",
    firstButtonText: "취소",
    secondButtonText: "저장",
  },
  view: {
    title: "제품 상세 정보",
    firstButtonText: "이전",
    secondButtonText: "수정",
  },
};

export const tabDataFunc = (pageMode: string, query?: any) => {
  const getIdFromQuery = tabGetQueryId(query);
  const baseUrl = "/product";

  return pageMode === "add"
    ? [
        {
          title: "제품등록",
          url: `${baseUrl}/add`,
        },
      ]
    : pageMode === "modify"
    ? [
        {
          title: "제품수정",
          url: `${baseUrl}/modify`,
        },
      ]
    : [
        {
          title: "제품상세",
          url: `${baseUrl}/view/${getIdFromQuery}`,
        },
        {
          title: "채널별 이미지 정보",
          url: `${baseUrl}/channelimg`,
          query: { id: getIdFromQuery },
        },
        {
          title: "레시피 정보",
          url: `${baseUrl}/recipeinfo`,
          query: { id: getIdFromQuery },
        },
        {
          title: "원재료 정보",
          url: `${baseUrl}/materialinfo`,
          query: { id: getIdFromQuery },
        },
        {
          title: "변경내역",
          url: `${baseUrl}/history`,
          query: { id: getIdFromQuery },
        },
      ];
};
