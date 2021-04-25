export const stringToNumberBase10 = (value: string): number => parseInt(value, 10);

export const isNumeric = (value: string) => /^\d+$/.test(value);
