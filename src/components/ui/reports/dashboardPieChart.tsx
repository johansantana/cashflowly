'use client'

import { Pie, PieChart } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

const randomKey = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const chartData = [
  { category: 'Alimentación', total: randomKey(50, 300), fill: '#e5e7eb' },
  { category: 'Transporte', total: randomKey(50, 300), fill: '#bbf7d0' },
  { category: 'Vivienda', total: randomKey(50, 300), fill: '#bfdbfe' },
  { category: 'Servicios Básicos', total: randomKey(50, 300), fill: '#fde68a' },
  { category: 'Salud y Bienestar', total: randomKey(50, 300), fill: '#fbcfe8' }
]

const chartConfig = {
  total: {
    label: 'Total'
  },
  food: {
    label: 'Alimentos',
    color: 'hsl(var(--chart-1))'
  },
  transport: {
    label: 'Transporte',
    color: 'hsl(var(--chart-2))'
  },
  housing: {
    label: 'Vivienda',
    color: 'hsl(var(--chart-3))'
  },
  basic_services: {
    label: 'Servicios Basicos',
    color: 'hsl(var(--chart-4))'
  },
  health: {
    label: 'Salud y Bienestar',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

export default function dashboardPieChart() {
  return (
    <Card className="flex flex-col shadow-none bg-transparent border-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribucion de gastos por categoría</CardTitle>
        <CardDescription>Enero - Febrero 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="total" label nameKey="category" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
