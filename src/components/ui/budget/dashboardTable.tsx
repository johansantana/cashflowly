'use client'

import React from 'react'
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
  return (
    <div className="flex flex-col gap-3">
      <Table aria-label="Historial de ingresos" color="success" selectionMode="multiple">
        <TableHeader>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Presupuesto (RD$)</TableColumn>
          <TableColumn>Gastado (RD$)</TableColumn>
          <TableColumn>Límite</TableColumn>
          <TableColumn>Prioridad</TableColumn>
          <TableColumn>Método de pago</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              <Chip className="bg-lightBrown">Alimentación</Chip>
            </TableCell>
            <TableCell>5,000.00</TableCell>
            <TableCell>2,000.00</TableCell>
            <TableCell>40%</TableCell>
            <TableCell>
              <Chip className="bg-rose-300">Alta</Chip>
            </TableCell>
            <TableCell>Tarjeta</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>
              <Chip className="bg-lightBrown">Transporte</Chip>
            </TableCell>
            <TableCell>3,500.00</TableCell>
            <TableCell>1,500.00</TableCell>
            <TableCell>50%</TableCell>
            <TableCell>
              <Chip className="bg-green-200">Media</Chip>
            </TableCell>
            <TableCell>Efectivo</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>
              <Chip className="bg-lightBrown">Vivienda</Chip>
            </TableCell>
            <TableCell>10,000.00</TableCell>
            <TableCell>10,000.00</TableCell>
            <TableCell>100%</TableCell>
            <TableCell>
              <Chip className="bg-rose-300">Alta</Chip>
            </TableCell>
            <TableCell>Efectivo</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>
              <Chip className="bg-lightBrown">Servicios basicos</Chip>
            </TableCell>
            <TableCell>6,000.00</TableCell>
            <TableCell>5,000.00</TableCell>
            <TableCell>80%</TableCell>
            <TableCell>
              <Chip className="bg-green-200">Media</Chip>
            </TableCell>
            <TableCell>Efectivo</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>
              <Chip className="bg-lightBrown">Salud y bienestar</Chip>
            </TableCell>
            <TableCell>4,000.00</TableCell>
            <TableCell>3,000.00</TableCell>
            <TableCell>55%</TableCell>
            <TableCell>
              <Chip className="bg-green-200">Media</Chip>
            </TableCell>
            <TableCell>Transferencia</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
