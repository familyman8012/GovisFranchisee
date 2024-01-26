export const searchStatus = [
  {
    value: '',
    label: '상태 전체',
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

export const searchCouponType = [
  {
    value: '',
    label: '쿠폰 유형 전체',
  },
  {
    value: '0',
    label: '상품',
  },
  {
    value: '1',
    label: '할인율',
  },
  {
    value: '2',
    label: '할인액',
  },
];

export const searchNotificationType = [
  {
    value: '',
    label: '알림 유형 전체',
  },
  {
    value: '0',
    label: '일반',
  },
  {
    value: '1',
    label: '알림톡',
  },
];

export const searchOption = [
  {
    label: '쿠폰명',
    value: '0',
  },
  {
    label: '태그',
    value: '1',
  },
];

export const selectConfig = [
  { label: '제품 분류', field: 'search_status', options: searchStatus },
  {
    label: '판매 분류',
    field: 'search_coupon_type',
    options: searchCouponType,
  },
  {
    label: '제품 상태',
    field: 'search_notification_type',
    options: searchNotificationType,
  },
];

export const dateConfig = [
  {
    field: 'search_use_dt',
    placeholder: '시행기간',
  },
  {
    field: 'search_end_dt',
    placeholder: '종료기간',
  },
];
