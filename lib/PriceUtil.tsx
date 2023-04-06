export const toNumber = (n: string | number): number =>
  typeof n === "number" ? (isNaN(n) ? 0 : n) : isNaN(parseFloat(n)) ? 0 : parseFloat(n);

export default function setComma(value: string | number) {
  return Math.ceil(toNumber(value))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
