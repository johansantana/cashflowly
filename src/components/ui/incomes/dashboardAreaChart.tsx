'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
  { month: 'Febrero', incomes: randomKey(25000, 60000) },
  { month: 'Enero', incomes: randomKey(25000, 60000) },
  { month: 'Diciembre', incomes: 90000 },
  { month: 'Noviembre', incomes: randomKey(25000, 60000) },
  { month: 'Octubre', incomes: randomKey(25000, 60000) },
  { month: 'Septiembre', incomes: randomKey(25000, 60000) }
]

const chartConfig = {
  incomes: {
    label: 'Ingresos',
    color: '#7dd3fc'
  }
} satisfies ChartConfig

export default function DashboardAreaChart() {
  return (
    <Card className="h-60 w-full">
      <CardHeader>
        <CardTitle>Ingresos</CardTitle>
        <CardDescription>Ingresos en los últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-20 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="incomes"
              type="natural"
              fill="#A43534"
              fillOpacity={0.4}
              stroke="#A43534"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Aumento de 5.2% este mes <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
