export const removeQuotes = (value: string): string =>
  value.replace(/['"]+/g, "");
