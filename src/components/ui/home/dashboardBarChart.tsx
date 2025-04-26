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
  { month: 'Enero', income: 45000, expenses: 30000 },
  { month: 'Febrero', income: 50000, expenses: 35000 },
  { month: 'Marzo', income: 48000, expenses: 32000 },
  { month: 'Abril', income: 52000, expenses: 38000 },
  { month: 'Mayo', income: 55000, expenses: 40000 },
  { month: 'Junio', income: 53000, expenses: 37000 },
  { month: 'Julio', income: 51000, expenses: 35000 },
  { month: 'Agosto', income: 49000, expenses: 33000 },
  { month: 'Septiembre', income: 47000, expenses: 31000 },
  { month: 'Octubre', income: 50000, expenses: 34000 },
  { month: 'Noviembre', income: 52000, expenses: 36000 },
  { month: 'Diciembre', income: 55000, expenses: 39000 }
]

const chartConfig = {
  income: {
    label: 'Ingresos',
    color: '#059669'
  },
  expenses: {
    label: 'Gastos',
    color: '#475569'
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
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
} 