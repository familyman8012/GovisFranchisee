export const selectConfig = [
  {
    label: '지역별',
    field: 'region',
    options: [
      { label: '전체', value: '' },
      { label: '강원', value: '강원' },
      { label: '경기', value: '경기' },
      { label: '경남', value: '경남' },
      { label: '경북', value: '경북' },
      { label: '광주', value: '광주' },
      { label: '대구', value: '대구' },
      { label: '대전', value: '대전' },
      { label: '부산', value: '부산' },
      { label: '서울', value: '서울' },
      { label: '세종', value: '세종' },
      { label: '울산', value: '울산' },
      { label: '인천', value: '인천' },
      { label: '전남', value: '전남' },
      { label: '전북', value: '전북' },
      { label: '제주', value: '제주' },
      { label: '충남', value: '충남' },
      { label: '충북', value: '충북' },
    ],
  },
  {
    label: '상권별',
    field: 'commercial_area',
    options: [
      { label: '전체', value: '' },
      { label: '대학가', value: '대학가' },
      { label: '쇼핑', value: '쇼핑' },
      { label: '시가지', value: '시가지' },
      { label: '위락지', value: '위락지' },
      { label: '주거지', value: '주거지' },
      { label: '학원가', value: '학원가' },
    ],
  },
  {
    label: '매장 유형',
    field: 'store_type',
    options: [
      { label: '전체', value: '' },
      { label: '직영', value: 'DIRECT' },
      { label: '가맹', value: 'FRANCHISEE' },
      { label: 'XGOPIZZA', value: 'XGO' },
      { label: '테스트매장', value: 'TEST' },
    ],
  },
  {
    label: '매장 상태',
    field: 'store_status',
    options: [
      { label: '전체', value: '' },
      { label: '운영중', value: 'OPEN' },
      { label: '폐업', value: 'CLOSED' },
      { label: '운영예정', value: 'PLANNED' },
    ],
  },
];

export interface Str {
  [key: string]: string;
}

export const StoreStr: Str = {
  DIRECT: '직영',
  FRANCHISEE: '가맹',
  XGO: 'XGOPIZZA',
  TEST: '테스트매장',
};

export const StatusStr: Str = {
  OPEN: '운영중',
  CLOSED: '폐업',
  PLANNED: '운영예정',
};
