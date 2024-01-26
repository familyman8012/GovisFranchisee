import dayjs from 'dayjs';

type PageModeSettings = {
  title: string;
  firstButtonText: string;
  secondButtonText: string;
};

export const productAnalyzeTabData = [
  {
    title: '대시보드',
    url: '/product-analyze',
  },
  {
    title: '전체 현황',
    url: '/product-analyze/all',
  },
  {
    title: '카테고리별 현황',
    url: '/product-analyze/category',
  },
  {
    title: '주문방식별 현황',
    url: '/product-analyze/order',
  },
  {
    title: '주문채널별 현황',
    url: '/product-analyze/channel',
  },
  {
    title: '매장별 현황',
    url: '/product-analyze/store',
  },
  {
    title: '지역별 현황',
    url: '/product-analyze/region',
  },
  {
    title: '상권별 현황',
    url: '/product-analyze/area',
  },
];

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

const dayGeneration = (beforeDay: number) => {
  return dayjs().subtract(beforeDay, 'day').format('YYYY-MM-DD');
};

export const initialDay = {
  base_dt_start: dayGeneration(1),
  base_dt_finish: dayGeneration(1),
  comparison_dt_start: dayGeneration(2),
  comparison_dt_finish: dayGeneration(2),
};
