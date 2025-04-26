'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

const chartData = [
  { date: '1 Feb', income: 5000, expenses: 3000 },
  { date: '2 Feb', income: 8000, expenses: 4000 },
  { date: '3 Feb', income: 12000, expenses: 6000 },
  { date: '4 Feb', income: 15000, expenses: 8000 },
  { date: '5 Feb', income: 20000, expenses: 10000 },
  { date: '6 Feb', income: 25000, expenses: 12000 },
  { date: '7 Feb', income: 30000, expenses: 15000 },
  { date: '8 Feb', income: 35000, expenses: 18000 },
  { date: '9 Feb', income: 40000, expenses: 20000 },
  { date: '10 Feb', income: 45000, expenses: 22000 },
  { date: '11 Feb', income: 50000, expenses: 25000 },
  { date: '12 Feb', income: 55000, expenses: 28000 }
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

export default function DashboardAreaChart() {
  return (
    <ChartContainer config={chartConfig} className="h-60 w-full">
      <AreaChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.split(' ')[0]}
        />
        <YAxis
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => `RD$ ${value / 1000}k`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          type="monotone"
          dataKey="income"
          fill="var(--color-income)"
          stroke="var(--color-income)"
          fillOpacity={0.2}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          fill="var(--color-expenses)"
          stroke="var(--color-expenses)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ChartContainer>
  )
} 