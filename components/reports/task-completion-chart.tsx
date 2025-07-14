"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import clsx from "clsx";

export interface TaskCompletionPoint {
  label: string;
  value: number;
}

export default function TaskCompletionChart({
  data,
  className,
}: {
  data: { label: string; value: number }[];
  className?: string;
}) {
  return (
    <div className={clsx("h-[220px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="hsl(var(--secondary))"
            radius={[4, 4, 0, 0]}
            name="Completion Rate"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
