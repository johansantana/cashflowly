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
          <TableRow key="1">
            <TableCell>8 Feb</TableCell>
            <TableCell>
              <Chip className="bg-lightBrown">Sueldo</Chip>
            </TableCell>
            <TableCell>40,000.00</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>10 Ene</TableCell>
            <TableCell>
              <Chip className="bg-lightDustyRose">Bonos</Chip>
            </TableCell>
            <TableCell>13,000.00</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>1 Ene</TableCell>
            <TableCell>
              <Chip className="bg-lightBrown">Sueldo</Chip>
            </TableCell>
            <TableCell>40,000.00</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>28 Dic</TableCell>
            <TableCell>
              <Chip className="bg-lightBrown">Sueldo</Chip>
            </TableCell>
            <TableCell>40,000.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
