export const tabGetQueryId = (query: any) => {
  // id 가 string 인 경우
  if (typeof query?.id === 'string') {
    return query.id;
  }
  // id 가 array 인 경우
  if (Array.isArray(query?.id)) {
    return query.id[query.id.length - 1]; // 배열의 마지막 요소 참조
  }
  return null; // id가 문자열이나 배열이 아닌 경우 null 반환
};
