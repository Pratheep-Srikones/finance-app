"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { type: "food", total: 275, fill: "var(--color-food)" },
  { type: "travel", total: 200, fill: "var(--color-travel)" },
  { type: "bills", total: 287, fill: "var(--color-bills)" },
  { type: "rent", total: 173, fill: "var(--color-rent)" },
  { type: "entertainment", total: 173, fill: "var(--color-entertainment)" },
  { type: "other", total: 190, fill: "var(--color-other)" },
];
const chartConfig = {
  total: {
    label: "Total",
  },
  food: {
    label: "Food",
    color: "hsl(var(--chart-1))",
  },
  travel: {
    label: "Travel",
    color: "hsl(var(--chart-2))",
  },
  bills: {
    label: "Bills",
    color: "hsl(var(--chart-3))",
  },
  rent: {
    label: "Rent",
    color: "hsl(var(--chart-4))",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-5))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function ExpensePieChart({
  year,
  month,
}: {
  year: number;
  month: string;
}) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total, 0);
  }, []);

  return (
    <Card className="flex flex-col  bg-gray-950/60">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-white font-bold">
          Expenses This Month
        </CardTitle>
        <CardDescription>
          {month} - {year}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0  ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto  aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl text-white font-bold"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-white text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total Expense for this month
        </div>
      </CardFooter>
    </Card>
  );
}
