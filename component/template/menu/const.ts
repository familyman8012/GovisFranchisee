export const categoryDateConfig = [
  {
    field: 'created_date',
    placeholder: '등록일',
  },
];

export const menuSelectConfig = [
  {
    label: '메뉴 그룹',
    field: 'evi_menu_group',
    options: [{ value: '', label: '전체' }],
  },
  {
    label: '메뉴 상태',
    field: 'evi_menu_status',
    options: [{ value: '', label: '전체' }],
  },
  {
    label: '메뉴 종류',
    field: 'evi_menu_type',
    options: [{ value: '', label: '전체' }],
  },
  {
    label: '메뉴 구분',
    field: 'evi_menu_classification',
    options: [{ value: '', label: '전체' }],
  },
];

export const menuListLayoutConfig = {
  id: 'menuListLayout',
  title: '메뉴 관리',
  tabs: [
    {
      title: '카테고리 목록',
      path: '/menu/categories',
    },
    {
      title: '메뉴 목록',
      path: '/menu',
    },
    {
      title: '미확인 메뉴 목록',
      path: '/menu/link',
    },
    {
      title: '미확인 메뉴 연결 내역',
      path: '/menu/link-history',
    },
  ],
};

export const menuDetailLayoutConfig = {
  id: 'menuDetailLayout',
  title: '메뉴 관리',
  tabs: [
    {
      title: '메뉴 상세 정보',
      path: '/menu/[menu_info_idx]',
    },
    {
      title: '변경 내역',
      path: '/menu/[menu_info_idx]/history',
    },
  ],
};

export const linkMenuSelectConfig = [
  {
    label: '주문 채널',
    field: 'order_channel',
    options: [
      { value: '', label: '전체' },
      { value: 'OKPOS', label: 'OK POS' },
      { value: 'FOODTECH', label: '푸드테크 POS' },
      { value: 'IMU', label: '아임유 POS' },
      { value: 'KIOSK', label: 'OTO 키오스크' },
      { value: 'FOODTECH_K', label: '오더퀸 키오스크' },
      { value: 'UNOSPAY_K', label: '우노스 키오스크' },
      { value: 'BAEMIN', label: '배달의민족' },
      { value: 'YOGIYO', label: '요기요' },
      { value: 'COUPANG', label: '쿠팡이츠' },
      { value: 'DDANGYO', label: '땡겨요' },
    ],
  },
];
