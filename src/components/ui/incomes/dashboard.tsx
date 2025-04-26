'use client'

import { useEffect, useState } from 'react';


import DashboardCard from '../dashboardCard'
import CaretUpIcon from '../../icons/caretUp'
import ReportIcon from '@/components/icons/report'
import PlusIcon from '@/components/icons/plus'
import { Button } from '@heroui/react'
import DashboardTable from './dashboardTable'
import DashboardAreaChart from './dashboardAreaChart'
import ArrowUpRightIcon from '@/components/icons/arrowUpRight'
import RegisterIncomeModal from './registerIncomeModal'
import { useState } from 'react'

interface DashboardProps extends React.HTMLAttributes<HTMLElement> {
  title: string
}

interface Ingreso {
  id: number;
  monto: number;
  fecha: string;
  ingresoFijo: boolean;
  categoria: string | null;
  cuenta: string;
  usuario: string | null;
  categoriaPersonalizada: string | null;
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
            className="bg-sky-700 text-white"
            startContent={<PlusIcon />}
            onPress={() => setIsModalOpen(true)}
          >
            Registrar Ingreso
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
              <span className="text-lg font-semibold text-darkGreen2">Ingreso del mes</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-lg lg:text-sm max-w-[20ch] text-slate-900">
                Aumento del {crecimientoPorcentaje.toFixed(2)}% desde el último mes.
              </span>
            </div>
            <div className="font-bold text-greenglows flex gap-2 items-end">
              <span className="text-xl xl:text-2xl">RD$</span>
              <span className="text-3xl xl:text-2xl">{totalMes.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                })}</span>
              <CaretUpIcon />
            </div>
          </div>
        </DashboardCard>
        <DashboardCard>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-darkGreen2">Balance total del mes</span>
            </div>
            <div className="font-bold text-sky-700 flex gap-2 items-end max-w-[20ch] text-slate-900">
              <span className="text-xl xl:text-2xl">RD$</span>
              <span className="text-3xl xl:text-2xl">{totalMes.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                })}</span>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-darkGreen2">
                Ingreso más alto de los últimos meses
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="uppercase text-sm font-semibold">Ingreso más alto</span>
            </div>
            <div className="font-bold text-greenglows flex gap-2 items-end">
              <span className="text-xl xl:text-2xl">RD$</span>
              <span className="text-3xl xl:text-2xl">{ingresoMasAlto.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                })}</span>
              <ArrowUpRightIcon className="self-start" />
            </div>
          </div>
        </DashboardCard>
        <div className="col-span-3 flex gap-4">
          <DashboardCard className="w-[60%] bg-mutedGreen" variant="lightColored" />
          <DashboardCard className="w-full">
            <DashboardTable />
          </DashboardCard>
        </div>
        <div className="col-span-3 flex gap-4">
          <DashboardCard className="w-full">
            <DashboardAreaChart />
          </DashboardCard>
          <DashboardCard className="w-[40%] bg-mutedGreen" variant="lightColored" />
        </div>
      </div>
      <RegisterIncomeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
