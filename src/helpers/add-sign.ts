export const addSign = (n: number) => {
  if (n === 0) return n;
  if (n > 0) return `+ ${n}`;
  return `- ${Math.abs(n)}`;
};
