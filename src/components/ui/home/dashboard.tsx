'use client'

import DashboardCard from '../dashboardCard'
import CaretUpIcon from '../../icons/caretUp'
import { Progress, Avatar } from '@heroui/react'
import DashboardAreaChart from './dashboardAreaChart'
import TargetIcon from '@/components/icons/target'
import TrendingUpIcon from '@/components/icons/trendingUp'
import TrendingDownIcon from '@/components/icons/trending'

interface DashboardProps extends React.HTMLAttributes<HTMLElement> {
  title: string
}

export default function Dashboard(props: DashboardProps) {
  const { ...restOfProps } = props

  return (
    <div className="flex h-full flex-col gap-6" {...restOfProps}>
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            size="lg"
            src="https://ui-avatars.com/api/?name=User&background=random"
            className="bg-slate-200"
          />
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">¡Hola, Juan!</h1>
            <p className="text-slate-600">Bienvenido de nuevo a tu dashboard financiero</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-emerald-100">
              <TrendingUpIcon className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Ingresos del mes</p>
              <p className="text-2xl font-semibold text-slate-900">RD$ 50,000</p>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-slate-100">
              <TrendingDownIcon className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Gastos del mes</p>
              <p className="text-2xl font-semibold text-slate-900">RD$ 20,000</p>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-sky-100">
              <TargetIcon className="w-6 h-6 text-sky-700" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Metas activas</p>
              <p className="text-2xl font-semibold text-slate-900">3</p>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-100">
              <CaretUpIcon className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Ahorro mensual</p>
              <p className="text-2xl font-semibold text-slate-900">RD$ 30,000</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Health Score */}
        <DashboardCard className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Salud Financiera</h2>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Progress
                className="w-32 h-32"
                color="success"
                value={75}
                size="lg"
                showValueLabel={false}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-900">75%</span>
              </div>
            </div>
            <p className="text-center text-slate-600">
              Tu salud financiera es buena. Sigue así para alcanzar tus metas.
            </p>
          </div>
        </DashboardCard>

        {/* Monthly Overview */}
        <DashboardCard className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Visión General Mensual</h2>
          <DashboardAreaChart />
        </DashboardCard>
      </div>
    </div>
  )
}
