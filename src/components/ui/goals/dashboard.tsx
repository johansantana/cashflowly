'use client'

import { useEffect, useState } from 'react'
import DashboardCard from '../dashboardCard'
import DashboardTable from './dashboardTable'
import DashboardTableCompleted from './dashboardTableCompleted'
import { Button } from '@heroui/react'
import PlusIcon from '@/components/icons/plus'
import RegisterGoalModal from './registerGoalModal'
import { useState } from 'react'

interface DashboardProps extends React.HTMLAttributes<HTMLElement> {
  title: string
}

interface RecomendacionesResponse {
  recomendaciones: string
}

export default function Dashboard(props: DashboardProps) {
  const { title, ...restOfProps } = props
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex h-full flex-col gap-4" {...restOfProps}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        <div className="flex gap-4">
          <Button
            radius="full"
            className="bg-slate-600 text-white"
            startContent={<PlusIcon />}
            onPress={() => setIsModalOpen(true)}
          >
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
        <DashboardCard className=" text-white bg-mutedGreen" variant="colored">
          <div className="flex flex-col h-full justify-between gap-2">
            <span className="font-semibold text-lg">Recomendaciones</span>
            {loading ? ( 
              <p>Cargando recomendaciones...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : recomendacion ? (
              <p className="text-sm">{recomendacion}</p>
            ) : (
              <p>No se encontraron recomendaciones</p>
            )}
            <span className="font-light text-xs">powered by OpenAI</span>
          </div>
        </DashboardCard> 


        <DashboardCard className=" text-white bg-mutedGreen" variant="colored" />
        <div className="flex gap-4">
          <DashboardCard className="w-full">
            <h1 className="text-xl mb-4 font-medium">Historial de metas cumplidas</h1>
            <DashboardTableCompleted />
          </DashboardCard>
        </div>
      </div>
      <RegisterGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
