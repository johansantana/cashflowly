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

const randomKey = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const chartData = [
  { month: 'Enero', budget: randomKey(8, 25), spent: randomKey(8, 25) },
  { month: 'Febrero', budget: randomKey(8, 25), spent: randomKey(8, 25) },
  { month: 'Marzo', budget: randomKey(8, 25), spent: randomKey(8, 25) },
  { month: 'Abril', budget: randomKey(8, 25), spent: randomKey(8, 25) },
  { month: 'Mayo', budget: randomKey(8, 25), spent: randomKey(8, 25) },
  { month: 'Junio', budget: randomKey(8, 25), spent: randomKey(8, 25) },
  { month: 'Julio', budget: randomKey(8, 25), spent: randomKey(8, 25) },
  { month: 'Agosto', budget: randomKey(8, 25), spent: randomKey(8, 25) },
  { month: 'Septiembre', budget: randomKey(8, 25), spent: randomKey(8, 25) },
  { month: 'Octubre', budget: randomKey(8, 25), spent: randomKey(8, 25) },
  { month: 'Noviembre', budget: randomKey(8, 25), spent: randomKey(8, 25) },
  { month: 'Diciembre', budget: randomKey(8, 25), spent: randomKey(8, 25) }
]

const chartConfig = {
  budget: {
    label: 'Presupuesto',
    color: '#006045'
  },
  spent: {
    label: 'Gastado',
    color: '#059669'
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
        <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
        <Bar dataKey="spent" fill="var(--color-spent)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
