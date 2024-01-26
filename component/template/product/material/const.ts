import { tabGetQueryId } from '@UtilFarm/tabGetQueryId';

type PageModeSettings = {
  title: string;
  firstButtonText: string;
  secondButtonText: string;
};

export const settingsByMode: Record<string, PageModeSettings> = {
  add: {
    title: '원재료 등록',
    firstButtonText: '취소',
    secondButtonText: '다음',
  },
  modify: {
    title: '원재료 수정',
    firstButtonText: '취소',
    secondButtonText: '저장',
  },
  view: {
    title: '원재료 상세 정보',
    firstButtonText: '이전',
    secondButtonText: '수정',
  },
};

export const searchStatus = [
  {
    value: '',
    label: '전체',
  },
  {
    value: '0',
    label: '시행 전',
  },
  {
    value: '1',
    label: '시행 중',
  },
  {
    value: '2',
    label: '만료',
  },
];

export const searchOption = [
  {
    label: '원재료 코드',
    value: 'material_code',
  },
  {
    label: '원재료 명',
    value: 'material_name_ko',
  },
];

export const dateConfig = [
  {
    field: 'created_date',
    placeholder: '등록일',
  },
  {
    field: 'updated_date',
    placeholder: '수정일',
  },
];

export const materialListTabData = [
  {
    title: '원재료 목록',
    url: '/material',
  },
  {
    title: '거래처 목록',
    url: '/material/partner?category=pct_manufacturer&current_num=1&per_num=10',
  },
  {
    title: '물류사 목록',
    url: '/material/partner?category=pct_shipping_company&current_num=1&per_num=10',
  },
  {
    title: '원산지 목록',
    url: '/material/country?current_num=1&per_num=10',
  },
  // {
  //   title: '통계',
  //   url: '',
  // },
  // { title: '부서정보', url: '' },
];

export const tabDataFunc = (
  currentNav: string,
  pageMode: string,
  query?: any
) => {
  const getIdFromQuery = tabGetQueryId(query);
  const baseUrl = '/material';

  return pageMode === 'add'
    ? currentNav !== 'shipping'
      ? [
          {
            title: '원재료 상세 정보',
            url: `${baseUrl}/add`,
          },
        ]
      : [
          {
            title: '원재료 배송 정보',
            url: `${baseUrl}/shipping/add`,
          },
        ]
    : pageMode === 'modify'
    ? [
        {
          title: '원재료 상세 정보',
          url: `${baseUrl}/modify/${getIdFromQuery}`,
        },
        {
          title: '원재료 배송 정보',
          url: `${baseUrl}/shipping/modify/${getIdFromQuery}`,
        },
      ]
    : [
        {
          title: '원재료 상세 정보',
          url: `${baseUrl}/view/${getIdFromQuery}`,
        },
        {
          title: '원재료 배송 정보',
          url: `${baseUrl}/shipping/view/${getIdFromQuery}`,
        },
        {
          title: '변경내역',
          url: `${baseUrl}/history`,
          query: { id: getIdFromQuery },
        },
      ];
};
