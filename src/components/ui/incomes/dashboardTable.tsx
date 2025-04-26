'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip
} from '@heroui/react'

export default function DashboardTable() {
  const [ingresos, setIngresos] = useState<any[]>([])
  const [ingresoAnterior, setIngresoAnterior] = useState<number>(0)
  const [ingresoActual, setIngresoActual] = useState<number>(0)
  const [crecimiento, setCrecimiento] = useState<number | null>(null)
  const [totalIngresosMes, setTotalIngresosMes] = useState<number>(0)
  const [ingresoMasAlto, setIngresoMasAlto] = useState<number>(0)

  useEffect(() => {
    const fetchIngresos = async () => {
      const token = localStorage.getItem('token')
      const response = await fetch('https://localhost:7248/api/Ingresos', {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setIngresos(data)

      // Calcular el total de ingresos del mes y el ingreso más alto de los últimos 6 meses
      const ingresosPorMes = data.reduce((acc: any, ingreso: any) => {
        const fecha = new Date(ingreso.fecha)
        const mes = fecha.getMonth() + 1 // Mes actual (1-12)
        const anio = fecha.getFullYear()

        // Sumar los ingresos por mes
        if (!acc[`${mes}-${anio}`]) {
          acc[`${mes}-${anio}`] = 0
        }
        acc[`${mes}-${anio}`] += ingreso.monto

        // Buscar el ingreso más alto de los últimos 6 meses
        if (ingreso.monto > ingresoMasAlto) {
          setIngresoMasAlto(ingreso.monto)
        }

        return acc
      }, {})

      const ingresosMesActual = ingresosPorMes[`${new Date().getMonth() + 1}-${new Date().getFullYear()}`] || 0
      setTotalIngresosMes(ingresosMesActual)

      // Calcular el porcentaje de crecimiento
      const mesAnterior = new Date().getMonth()
      const ingresosMesAnterior = ingresosPorMes[`${mesAnterior + 1}-${new Date().getFullYear()}`] || 0
      setIngresoAnterior(ingresosMesAnterior)
      setIngresoActual(ingresosMesActual)

      if (ingresosMesAnterior > 0) {
        const crecimientoPorcentaje = ((ingresosMesActual - ingresosMesAnterior) / ingresosMesAnterior) * 100
        setCrecimiento(crecimientoPorcentaje)
      }
    }

    fetchIngresos()
  }, [ingresoMasAlto])

  return (
    <div className="flex flex-col gap-3">
      <Table
        aria-label="Historial de ingresos"
        color="default"
        defaultSelectedKeys={['2', '3']}
        selectionMode="multiple"
      >
        <TableHeader>
          <TableColumn>Fecha</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Monto (RD$)</TableColumn>
        </TableHeader>
        <TableBody>
          {ingresos.map((ingreso) => {
            const fecha = new Date(ingreso.fecha)
            const mes = fecha.toLocaleString('default', { month: 'short' })
            const categoria = ingreso.categoria || ingreso.categoriaPersonalizada || 'Sin categoría'

            return (
              <TableRow key={ingreso.id}>
                <TableCell>{`${mes} ${fecha.getFullYear()}`}</TableCell>
                <TableCell>
                  <Chip className="bg-lightBrown">{categoria}</Chip>
                </TableCell>
                <TableCell>{ingreso.monto.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                })}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}