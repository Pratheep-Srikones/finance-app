export const sumOf = (data: { type: string; total: number }[]) => {
  let totalSum = 0;
  for (let i = 0; i < data.length; i++) {
    totalSum += data[i].total;
  }
  return totalSum;
};
