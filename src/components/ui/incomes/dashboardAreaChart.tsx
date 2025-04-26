'use client'

import { useEffect, useState } from 'react'
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

// Definir las interfaces para los datos
interface Ingreso {
  fecha: string
  monto: number
}

interface FormattedData {
  month: string
  incomes: number
}

// Función para calcular el cambio porcentual
const calculatePercentageChange = (previous: number, current: number): number => {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export default function DashboardAreaChart() {
  const [chartData, setChartData] = useState<FormattedData[]>([])
  const [percentageChange, setPercentageChange] = useState(0)

  useEffect(() => {
    const fetchIngresos = async () => {
      const token = localStorage.getItem("token")
      const response = await fetch('https://cashflowly-service-858222718338.us-east1.run.app/api/Ingresos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*',
        }
      })
      const data: Ingreso[] = await response.json() // Usar el tipo Ingreso

      // Agrupar ingresos por mes y calcular el total
      const monthlyIncome: Record<string, number> = {}

      data.forEach((ingreso) => {
        const date = new Date(ingreso.fecha)
        const month = date.toLocaleString('default', { month: 'long' })

        if (!monthlyIncome[month]) {
          monthlyIncome[month] = 0
        }
        monthlyIncome[month] += ingreso.monto
      })

      const months = Object.keys(monthlyIncome)
      const sortedMonths = months.sort((a, b) => new Date(`${a} 1, 2025`) - new Date(`${b} 1, 2025`))

      const formattedData: FormattedData[] = sortedMonths.map((month) => ({
        month,
        incomes: monthlyIncome[month],
      }))

      if (formattedData.length > 1) {
        const currentMonth = formattedData[formattedData.length - 1].incomes
        const previousMonth = formattedData[formattedData.length - 2].incomes
        const change = calculatePercentageChange(previousMonth, currentMonth)
        setPercentageChange(change)
      }

      setChartData(formattedData)
    }

    fetchIngresos()
  }, [])

  const chartConfig = {
    incomes: {
      label: 'Ingresos',
      color: '#7dd3fc'
    }
  } satisfies ChartConfig

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
              tickFormatter={(value) => value.slice(0, 3)}
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
              Aumento de {percentageChange.toFixed(2)}% este mes <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
