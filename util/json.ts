export const toJSON = <T extends any>(jsonString: string) => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    return null;
  }
};
