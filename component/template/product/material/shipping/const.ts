type PageModeSettings = {
  title: string;
  firstButtonText: string;
  secondButtonText: string;
};

export const settingsByMode: Record<string, PageModeSettings> = {
  add: {
    title: '원재료 등록',
    firstButtonText: '취소',
    secondButtonText: '등록',
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
