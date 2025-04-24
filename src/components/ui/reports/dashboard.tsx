'use client'

import DashboardCard from '../dashboardCard'
import { Divider, Input, DatePicker, Select, SelectItem, Button } from '@heroui/react'
import DashboardPieChart from './dashboardPieChart'
import SearchIcon from '@/components/icons/search'
import FileIcon from '@/components/icons/file'

interface DashboardProps extends React.HTMLAttributes<HTMLElement> {
  title: string
}

const categories = [
  { key: 'food', label: 'Alimentación' },
  { key: 'transport', label: 'Transporte' },
  { key: 'housing', label: 'Vivienda' },
  { key: 'basic_services', label: 'Servicios Básicos' },
  { key: 'health', label: 'Salud y bienestar' }
]

const accounts = [
  { key: 1, label: 'Cuenta de crédito' },
  { key: 2, label: 'Cuenta de ahorros' }
]

const files = [
  { type: 'food', name: 'Alimentación', date: '31/01/2025' },
  { type: 'food', name: 'Alimentación', date: '31/01/2025' },
  { type: 'transport', name: 'Transporte', date: '31/01/2025' },
  { type: 'transport', name: 'Transporte', date: '31/01/2025' },
  { type: 'food', name: 'Alimentación', date: '31/01/2025' },
  { type: 'food', name: 'Alimentación', date: '31/01/2025' },
  { type: 'food', name: 'Alimentación', date: '31/01/2025' },
  { type: 'transport', name: 'Transporte', date: '31/01/2025' },
  { type: 'transport', name: 'Transporte', date: '31/01/2025' },
  { type: 'basic_services', name: 'Servicios Básicos', date: '31/01/2025' },
  { type: 'food', name: 'Alimentación', date: '31/01/2025' },
  { type: 'transport', name: 'Transporte', date: '31/01/2025' },
  { type: 'food', name: 'Alimentación', date: '31/01/2025' },
  { type: 'transport', name: 'Transporte', date: '31/01/2025' },
  { type: 'food', name: 'Alimentación', date: '31/01/2025' },
  { type: 'food', name: 'Alimentación', date: '31/01/2025' },
  { type: 'housing', name: 'Vivienda', date: '31/01/2025' },
  { type: 'basic_services', name: 'Servicios Básicos', date: '31/01/2025' },
  { type: 'transport', name: 'Transporte', date: '31/01/2025' },
  { type: 'basic_services', name: 'Servicios Básicos', date: '31/01/2025' },
  { type: 'basic_services', name: 'Servicios Básicos', date: '31/01/2025' },
  { type: 'housing', name: 'Vivienda', date: '31/01/2025' },
  { type: 'health', name: 'Salud y bienestar', date: '31/01/2025' },
  { type: 'health', name: 'Salud y bienestar', date: '31/01/2025' }
]

export default function Dashboard(props: DashboardProps) {
  const { title, ...restOfProps } = props

  return (
    <div className="flex h-full flex-col gap-4" {...restOfProps}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
      </div>
      <div className="flex flex-grow flex-col gap-4">
        <DashboardCard className="flex justify-between">
          <div className="w-1/3 flex flex-col gap-4">
            <p className="uppercase font-semibold text-teal-800">Reporte mensual</p>
            <div className="flex flex-col gap-2">
              <span className="text-2xl">Ingreso mensual</span>
              <span className="text-3xl font-medium text-teal-800">
                30,000.00 <span className="text-xl">RD$</span>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl">Gasto mensual</span>
              <span className="text-3xl font-medium text-teal-800">
                30,000.00 <span className="text-xl">RD$</span>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl">Saldo disponible</span>
              <span className="text-3xl font-medium text-teal-800">
                30,000.00 <span className="text-xl">RD$</span>
              </span>
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className="w-1/3 px-8 flex flex-col gap-4">
            <p className="uppercase font-semibold text-teal-800">
              Reporte de categorías - Febrero 2025
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex flex-col gap-2">
                <span className="text-lg xl:text-xl">Fecha de generación:</span>
                <span className="text-xl lg:text-2xl 2xl:text-3xl font-medium text-teal-800">
                  31/01/2025
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg xl:text-xl">Total gastado:</span>
                <span className="text-xl lg:text-2xl 2xl:text-3xl font-medium text-teal-800">
                  40,000.00 <span className="text-xl">RD$</span>
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg xl:text-xl">Ingresos totales:</span>
                <span className="text-xl lg:text-2xl 2xl:text-3xl font-medium text-teal-800">
                  130,000.00 <span className="text-xl">RD$</span>
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg xl:text-xl">Total gastado:</span>
                <span className="text-xl lg:text-2xl 2xl:text-3xl font-medium text-teal-800">
                  20,030.00 <span className="text-xl">RD$</span>
                </span>
              </div>
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className="w-1/3">
            <DashboardPieChart />
          </div>
        </DashboardCard>
        <DashboardCard className=" flex-grow bg-transparent">
          <p className="text-2xl mb-4">Últimos reportes de gasto</p>
          <div className="flex gap-10 items-center">
            <Input
              isClearable
              placeholder="Buscar"
              className="w-full sm:max-w-[44%] xl:max-w-[30%]"
              startContent={<SearchIcon className="h-4 w-4 text-gray-400" />}
            />
            <div className="flex gap-2 flex-grow">
              <DatePicker className="max-w-[284px]" label="Fecha" />
              <Select className="max-w-xs" label="Categoría">
                {categories.map(category => (
                  <SelectItem key={category.key} value={category.key}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>
              <Select className="max-w-xs " label="Cuenta">
                {accounts.map(account => (
                  <SelectItem key={account.key} value={account.key}>
                    {account.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-10">
            {files.map((file, index) => (
              <Button
                key={index}
                className="bg-gray-50 justify-between"
                startContent={<FileIcon className="h-4 w-5" />}
              >
                <span>{file.name}</span> <span className="text-xs text-gray-400">{file.date}</span>
              </Button>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}
