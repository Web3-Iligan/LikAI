<script lang="ts">
  import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
  import { ChartContainer, ChartTooltip, ChartTooltipContent } from "$lib/components/ui/chart";
  import { getContext } from "svelte";

  let { data, onfoo } = $props(); // Updated to use Svelte 5 syntax for component props
  const { foo } = getContext('parent'); // Adjust this based on your actual context
</script>

<ChartContainer
  config={{
    value: {
      label: "Completion Rate",
      color: "hsl(var(--chart-2))",
    },
  }}
  class="h-[200px] w-full"
  onfoo={onfoo} // Example of using the callback prop
>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip content={ChartTooltipContent} />
      <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} name="Completion Rate" />
    </BarChart>
  </ResponsiveContainer>
</ChartContainer>
