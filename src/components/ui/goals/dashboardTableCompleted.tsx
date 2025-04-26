'use client'

import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react'

export default function DashboardTable() {
  return (
    <div className="flex flex-col gap-3">
      <Table
        isHeaderSticky
        aria-label="Historial de ingresos"
        color="secondary"
        classNames={{
          base: 'max-h-[300px] overflow-scroll',
          table: 'min-h-[90px]'
        }}
        className="overflow-hidden"
      >
        <TableHeader>
          <TableColumn>Meta</TableColumn>
          <TableColumn>Monto</TableColumn>
          <TableColumn>Fecha de cumplimiento</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Fondo de emergencia</TableCell>
            <TableCell>3,000.00</TableCell>
            <TableCell>01/12/2025</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Fondo de emergencia</TableCell>
            <TableCell>3,000.00</TableCell>
            <TableCell>01/12/2025</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Fondo de emergencia</TableCell>
            <TableCell>3,000.00</TableCell>
            <TableCell>01/12/2025</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Fondo de emergencia</TableCell>
            <TableCell>3,000.00</TableCell>
            <TableCell>01/12/2025</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Fondo de emergencia</TableCell>
            <TableCell>3,000.00</TableCell>
            <TableCell>01/12/2025</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Fondo de emergencia</TableCell>
            <TableCell>3,000.00</TableCell>
            <TableCell>01/12/2025</TableCell>
          </TableRow>
          <TableRow key="7">
            <TableCell>Fondo de emergencia</TableCell>
            <TableCell>3,000.00</TableCell>
            <TableCell>01/12/2025</TableCell>
          </TableRow>
          <TableRow key="8">
            <TableCell>Fondo de emergencia</TableCell>
            <TableCell>3,000.00</TableCell>
            <TableCell>01/12/2025</TableCell>
          </TableRow>
          <TableRow key="9">
            <TableCell>Fondo de emergencia</TableCell>
            <TableCell>3,000.00</TableCell>
            <TableCell>01/12/2025</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
