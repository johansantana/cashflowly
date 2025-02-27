'use client'

import DashboardCard from '../dashboardCard'
import CaretUpIcon from '../../icons/caretUp'
import PlusIcon from '@/components/icons/plus'
import { Progress, Button } from '@heroui/react'
import DashboardTable from './dashboardTable'
import DashboardBarChart from './dashboardBarChart'
import ReportIcon from '@/components/icons/report'

interface DashboardProps extends React.HTMLAttributes<HTMLElement> {
  title: string
}

export default function Dashboard(props: DashboardProps) {
  const { title, ...restOfProps } = props

  return (
    <div className="flex h-full flex-col gap-4" {...restOfProps}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        <div className="flex gap-4">
          <Button radius="full" className="bg-emerald-700 text-white" startContent={<PlusIcon />}>
            Registrar Presupuesto
          </Button>
          <Button radius="full" startContent={<ReportIcon />}>
            Generar Reportes
          </Button>
        </div>
      </div>
      <div className="grid grid-flow-row flex-grow grid-rows-[.5fr_1fr_1fr] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <DashboardCard>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-1">
              <span className="uppercase text-sm font-semibold text-emerald-700">
                Presupuesto del mes
              </span>
              <span className="font-semibold text-lg lg:text-xl max-w-[20ch] text-slate-900">
                Aumento del 2.7% desde el último mes.
              </span>
            </div>
            <div className="font-bold text-emerald-700 flex gap-2 items-end">
              <span className="text-xl xl:text-2xl">RD$</span>
              <span className="text-3xl xl:text-4xl">30,000.00</span>
              <CaretUpIcon />
            </div>
          </div>
        </DashboardCard>
        <DashboardCard>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-2">
              <span className="uppercase text-sm font-semibold text-emerald-700">
                Saldo disponible
              </span>
            </div>
            <Progress
              className="w-full text-slate-900 font-normal mb-3"
              color="warning"
              label="Porcentaje utilizado"
              maxValue={61200}
              showValueLabel={true}
              value={33000}
              size="sm"
            />
            <div className="font-bold text-emerald-700 flex items-end gap-2">
              <span className="text-xl xl:text-2xl">RD$</span>
              <span className="text-3xl xl:text-4xl ">61,200.00</span>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard className=" text-white" variant="colored">
          <div className="flex flex-col h-full justify-between gap-2">
            <span className="font-light text-sm">Recomendaciones</span>
            <p className="2xl:text-lg">
              &quot;Para gestionar tu presupuesto de manera efectiva, es fundamental que seas
              realista y consciente de tus hábitos financieros.&quot;
            </p>
            <span className="font-light text-xs">powered by AI</span>
          </div>
        </DashboardCard>
        <div className="col-span-3 flex gap-4">
          <DashboardCard className="w-[40%]" variant="lightColored" />
          <DashboardCard className="w-full">
            <DashboardTable />
          </DashboardCard>
        </div>
        <div className="col-span-3 flex gap-4">
          <DashboardCard className="w-full">
            <DashboardBarChart />
          </DashboardCard>
          <DashboardCard className="w-[40%]" variant="lightColored" />
        </div>
      </div>
    </div>
  )
}
