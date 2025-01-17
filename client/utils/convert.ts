import { months } from "@/data/data";

export const convertMonthData = (
  monthData: { month: number; total: number }[]
) => {
  const data = [];
  for (let i = 0; i < monthData.length; i++) {
    const month = monthData[i].month;
    const total = monthData[i].total;
    data.push({ month: months[month - 1], total });
  }
  return data;
};
export const formatToReadableDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Ensures 12-hour format with AM/PM
  };

  return date.toLocaleString("en-US", options);
};
