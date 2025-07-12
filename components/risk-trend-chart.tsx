"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import clsx from "clsx"

export default function RiskTrendChart({
  data,
  className,
}: {
  data: { date: string; value: number }[]
  className?: string
}) {
  return (
    <div className={clsx("h-[220px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" dot={{ r: 3 }} name="Risk Level" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
