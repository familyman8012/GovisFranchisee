export const toNumberOrOtherValue = (str: string | string[] | undefined, defaultValue?: number) => {
  const int = parseInt(String(str) ?? "");

  return defaultValue === undefined ? null : isNaN(int) && typeof defaultValue !== "undefined" ? defaultValue : int;
};

export const toNumber = (str: string | null | undefined) => {
  const int = parseInt(str ?? "");
  return isNaN(int) ? undefined : int;
};

export const setComma = (value: string | number) =>
  Math.ceil(Number(toNumber(String(value))))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
