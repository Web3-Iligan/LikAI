<script lang="ts">
  import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
  import { ChartContainer, ChartTooltip, ChartTooltipContent } from "$lib/components/ui/chart";
  import { props } from "svelte/compiler";

  let { data } = props<{ data: { date: string; value: number }[] }>();
</script>

<ChartContainer
  config={{
    value: {
      label: "Risk Level",
      color: "hsl(var(--chart-1))",
    },
  }}
  class="h-[200px] w-full"
>
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        minTickGap={32}
        tickFormatter={(value) => value.slice(0, 3)}
      />
      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip content={ChartTooltipContent} />
      <Line type="monotone" dataKey="value" stroke="var(--color-value)" name="Risk Level" />
    </LineChart>
  </ResponsiveContainer>
</ChartContainer>
