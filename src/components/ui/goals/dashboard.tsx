'use client'

import DashboardCard from '../dashboardCard'
import DashboardTable from './dashboardTable'
import DashboardTableCompleted from './dashboardTableCompleted'
import { Button } from '@heroui/react'
import PlusIcon from '@/components/icons/plus'

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
          <Button radius="full" className="bg-slate-600 text-white" startContent={<PlusIcon />}>
            Registrar Meta
          </Button>
        </div>
      </div>
      <div className="grid grid-flow-row flex-grow grid-rows-[1fr_1fr] grid-cols-1 2xl:grid-cols-2 gap-4">
        <div className="flex gap-4">
          <DashboardCard className="w-full">
            <h1 className="text-xl mb-4 font-medium">Resumen</h1>
            <DashboardTable />
          </DashboardCard>
        </div>
        <DashboardCard className=" text-white bg-slate-500" variant="colored">
          <div className="flex flex-col h-full justify-between gap-2">
            <span className="font-light text-lg">Recomendaciones</span>
            <p className="2xl:text-2xl">
              Felicidades por definir tus metas! Un buen plan financiero no solo se trata de
              ahorrar, sino de hacerlo de manera estrategica. Prioriza tus metas segun urgencia e
              importancia, establece montos alcanzables y revisa tu progreso regularmente.
            </p>
            <p className="">
              Consejo extra: Divide cada meta en pequeños objetivos mensuales. Así, en lugar de
              ahorrar para un objetivo más grande, puedes asignar partes pequeñas para cada mes
              durante 4 o 5 meses. ¡Pequeños pasos hacen gandes logros!
            </p>
            <span className="font-light text-xs">powered by AI</span>
          </div>
        </DashboardCard>
        <DashboardCard className=" text-white bg-slate-400" variant="colored" />
        <div className="flex gap-4">
          <DashboardCard className="w-full">
            <h1 className="text-xl mb-4 font-medium">Historial de metas cumplidas</h1>
            <DashboardTableCompleted />
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}
