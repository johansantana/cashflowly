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
      <Table
        isHeaderSticky
        aria-label="Historial de ingresos"
        color="secondary"
        selectionMode="multiple"
        classNames={{
          base: 'max-h-[400px] overflow-scroll',
          table: 'min-h-[90px]'
        }}
        className="overflow-hidden"
      >
        <TableHeader>
          <TableColumn>Descripcion</TableColumn>
          <TableColumn>Objetivo (RD$)</TableColumn>
          <TableColumn>Acumulado (RD$)</TableColumn>
          <TableColumn>Fecha Límite</TableColumn>
          <TableColumn>Estado</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Viaje a europa</TableCell>
            <TableCell>5,000.00</TableCell>
            <TableCell>3,500.00</TableCell>
            <TableCell>12/11/2025</TableCell>
            <TableCell>
              <Chip className="bg-green-300">Activa</Chip>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Comprar un carro</TableCell>
            <TableCell>5,000.00</TableCell>
            <TableCell>3,500.00</TableCell>
            <TableCell>12/11/2025</TableCell>
            <TableCell>
              <Chip className="bg-green-300">Activa</Chip>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Fondo de emergencia</TableCell>
            <TableCell>5,000.00</TableCell>
            <TableCell>3,500.00</TableCell>
            <TableCell>12/11/2025</TableCell>
            <TableCell>
              <Chip className="bg-green-300">Activa</Chip>
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Nueva laptop</TableCell>
            <TableCell>5,000.00</TableCell>
            <TableCell>3,500.00</TableCell>
            <TableCell>12/11/2025</TableCell>
            <TableCell>
              <Chip className="bg-green-300">Activa</Chip>
            </TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Regalos de navidad</TableCell>
            <TableCell>5,000.00</TableCell>
            <TableCell>3,500.00</TableCell>
            <TableCell>12/11/2025</TableCell>
            <TableCell>
              <Chip className="bg-green-300">Activa</Chip>
            </TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Viaje con mi familia</TableCell>
            <TableCell>5,000.00</TableCell>
            <TableCell>3,500.00</TableCell>
            <TableCell>12/11/2025</TableCell>
            <TableCell>
              <Chip className="bg-green-300">Activa</Chip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
