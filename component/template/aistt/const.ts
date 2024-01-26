// type PageModeSettings = {
//   title: string;
//   firstButtonText: string;
//   secondButtonText: string;
// };

export const aisttStateListTabData = [
  {
    title: '전체 현황',
    url: '/aistt-state',
  },
  {
    title: '제조 품질 현황',
    url: '/aistt-state/quality',
  },
];

export const aisttDetailInfo = [
  {
    title: '상세정보',
    url: '/aistt-state/detail',
  },
];

export const aisttList = [
  {
    title: '제품 제조 목록',
    url: '/aistt-state/list',
  },
];

export const inspectionOptions = [
  { label: '검수 완료', value: 'complete' },
  { label: '판단 불가', value: 'indeterminate' },
  { label: '영상 불량', value: 'bad' },
];

// export const settingsByMode: Record<string, PageModeSettings> = {
//   add: {
//     title: '원재료 등록',
//     firstButtonText: '취소',
//     secondButtonText: '다음',
//   },
//   modify: {
//     title: '원재료 수정',
//     firstButtonText: '취소',
//     secondButtonText: '저장',
//   },
//   view: {
//     title: '원재료 상세 정보',
//     firstButtonText: '이전',
//     secondButtonText: '수정',
//   },
// };

// export const searchStatus = [
//   {
//     value: '',
//     label: '전체',
//   },
//   {
//     value: '0',
//     label: '시행 전',
//   },
//   {
//     value: '1',
//     label: '시행 중',
//   },
//   {
//     value: '2',
//     label: '만료',
//   },
// ];

// export const searchOption = [
//   {
//     label: '원재료 코드',
//     value: 'material_code',
//   },
//   {
//     label: '원재료 명',
//     value: 'material_name_ko',
//   },
// ];

// export const dateConfig = [
//   {
//     field: 'created_date',
//     placeholder: '등록일',
//   },
//   {
//     field: 'updated_date',
//     placeholder: '수정일',
//   },
// ];

// export const tabDataFunc = (
//   currentNav: string,
//   pageMode: string,
//   query?: any
// ) => {
//   const getIdFromQuery = tabGetQueryId(query);
//   const baseUrl = '/material';

//   return pageMode === 'add'
//     ? currentNav !== 'shipping'
//       ? [
//           {
//             title: '원재료 상세 정보',
//             url: `${baseUrl}/add`,
//           },
//         ]
//       : [
//           {
//             title: '원재료 배송 정보',
//             url: `${baseUrl}/shipping/add`,
//           },
//         ]
//     : pageMode === 'modify'
//     ? [
//         {
//           title: '원재료 상세 정보',
//           url: `${baseUrl}/modify/${getIdFromQuery}`,
//         },
//         {
//           title: '원재료 배송 정보',
//           url: `${baseUrl}/shipping/modify/${getIdFromQuery}`,
//         },
//       ]
//     : [
//         {
//           title: '원재료 상세 정보',
//           url: `${baseUrl}/view/${getIdFromQuery}`,
//         },
//         {
//           title: '원재료 배송 정보',
//           url: `${baseUrl}/shipping/view/${getIdFromQuery}`,
//         },
//         {
//           title: '변경내역',
//           url: `${baseUrl}/history`,
//           query: { id: getIdFromQuery },
//         },
//       ];
// };
