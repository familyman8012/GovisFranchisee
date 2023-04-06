export const PALLETES = {
  white: "#fff",
  black: "#000",
  disable: "#e0e0e0",
  "primary-1": "#ff6d00",
  "primary-2": "#061138",
  "primary-3": "#ff862c",
  "success-1": "#2f80ed",
  "success-2": "#e3f5ff",
  "error-1": "#ef4747",
  "error-2": "#ffefef",
  "warning-1": "#ffd34d",
  "warning-2": "#fff7dd",
  "download-1": "#27ae60",
  "download-2": "#6fcf97",
  "download-3": "#e4fbf0",
  "typo-1": "#333",
  "typo-2": "#4f4f4f",
  "typo-3": "#828282",
  "typo-4": "#bdbdbd",
  "typo-5": "#e0e0e0",
  "typo-6": "#f2f2f2",
  "typo-7": "#f8f8f8",
  "p-blue-1": "#7da9ff",
  "p-blue-2": "#84b5ff",
  "p-blue-3": "#78cee9",
  "p-purple-1": "#a485ff",
  "p-purple-2": "#978eff",
  "p-green-1": "#90cca0",
  "p-green-2": "#98e6a9",
  "p-green-3": "#d6f5dd",
  "p-green-4": "#9dd764",
  "p-green-5": "#5bcbb7",
  "p-red-1": "#ff766d",
  "p-pink-1": "#ff92a5",
  "p-pink-2": "#ffcfec",
  "p-yellow-1": "#fde047",
  "p-yellow-2": "#ffd98e",
  "p-yellow-3": "#ffd34d",
  "p-brown-1": "#d3a064",
  "p-orange-1": "#ffab6c",
  "p-orange-2": "#ffd5b5",
  "other-1": "#5d5fef",
  "other-2": "#e5e6ff",
};

export type TPALLETES = typeof PALLETES[keyof typeof PALLETES];

export type TColor = TPALLETES | string;

export type AppColor =
  | "primary"
  | "primary-2"
  | "secondary"
  | "accent"
  | "warning"
  | "error"
  | "black"
  | "white"
  | "grey"
  | "add"
  | "yellow"
  | "download";

export type StatusColor = "new" | "progress" | "secondary" | "primary" | "black";

export type AppTheme = "delete" | "add" | "update" | "default" | "warning";

export const COLORS = ["#FFAB6C", "#7DA9FF", "#A585FF", "#FF92A5", "#6FCF97", "#FFD98E", "#ACE2D5"];

export const findColorByTheme = (theme?: AppTheme): AppColor => {
  switch (theme) {
    case "delete":
      return "error";
    case "warning":
      return "warning";
    case "add":
      return "add";
    case "update":
      return "add";
    case "default":
      return "primary";
    default:
      return "" as AppColor;
  }
};
