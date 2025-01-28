export const sumOf = (data: { type: string; total: number }[]) => {
  let totalSum = 0;
  for (let i = 0; i < data.length; i++) {
    totalSum += data[i].total;
  }
  return totalSum;
};

export const getDaysInCurrentMonth = (): number => {
  const now = new Date(); // Current date
  const year = now.getFullYear(); // Current year
  const month = now.getMonth(); // Current month (0-indexed)
  return new Date(year, month + 1, 0).getDate(); // Last day of the current month
};
