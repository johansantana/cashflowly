'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

const chartData = [
  { month: 'Enero', bills: 15, paid: 12 },
  { month: 'Febrero', bills: 18, paid: 15 },
  { month: 'Marzo', bills: 20, paid: 18 },
  { month: 'Abril', bills: 22, paid: 20 },
  { month: 'Mayo', bills: 25, paid: 22 },
  { month: 'Junio', bills: 23, paid: 21 },
  { month: 'Julio', bills: 21, paid: 19 },
  { month: 'Agosto', bills: 19, paid: 17 },
  { month: 'Septiembre', bills: 17, paid: 15 },
  { month: 'Octubre', bills: 20, paid: 18 },
  { month: 'Noviembre', bills: 22, paid: 20 },
  { month: 'Diciembre', bills: 25, paid: 23 }
]

const chartConfig = {
  bills: {
    label: 'Facturas',
    color: '#475569'
  },
  paid: {
    label: 'Pagadas',
    color: '#16a34a'
  }
} satisfies ChartConfig

export default function DashboardBarChart() {
  return (
    <ChartContainer config={chartConfig} className="h-60 w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="bills" fill="var(--color-bills)" radius={4} />
        <Bar dataKey="paid" fill="var(--color-paid)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
} 