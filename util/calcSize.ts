export const getTableWidthPercentage = (
  width: number,
  baseWidth: number = 1536
) => {
  return `${Math.round((width / baseWidth) * 100)}%`;
};
