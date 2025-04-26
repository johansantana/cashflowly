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

interface Gasto {
  id: number
  monto: number
  categoria: string | null
  categoriaPersonalizada: string | null
  cuenta: string
}

interface DashboardTableProps {
  onTotalChange?: (total: number) => void;
}

export default function DashboardTable({ onTotalChange }: DashboardTableProps) {
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [totalGastado, setTotalGastado] = useState<number>(0)

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('Token no encontrado')
          return
        }

        const response = await fetch('https://localhost:7248/api/Gasto', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*'
          }
        })

        const data: Gasto[] = await response.json()

        const gastosFiltrados = data.filter(
          g => g.categoria !== null || g.categoriaPersonalizada !== null
        )

        setGastos(gastosFiltrados)

        // Calcular el total gastado
        const total = gastosFiltrados.reduce((acc, gasto) => acc + gasto.monto, 0)
        setTotalGastado(total)

        // Informar el total al padre si existe la prop
        if (onTotalChange) {
          onTotalChange(total)
        }
      } catch (error) {
        console.error('Error al cargar los gastos:', error)
      }
    }

    fetchGastos()
  }, [onTotalChange])

  return (
    <Table aria-label="Historial de gastos" color="success" selectionMode="multiple">
      <TableHeader>
        <TableColumn>Categoría</TableColumn>
        <TableColumn>Monto (RD$)</TableColumn>
        <TableColumn>Cuenta</TableColumn>
      </TableHeader>

      <TableBody className="max-h-[350px] overflow-y-auto block">
        {gastos.map(gasto => (
          <TableRow key={gasto.id}>
            <TableCell>
              <Chip className="bg-lightBrown">
                {gasto.categoria ?? gasto.categoriaPersonalizada}
              </Chip>
            </TableCell>
            <TableCell>{gasto.monto.toFixed(2)}</TableCell>
            <TableCell>{gasto.cuenta}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
