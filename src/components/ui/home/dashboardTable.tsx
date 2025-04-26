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

const transactions = [
  {
    id: '1',
    date: '8 Feb',
    type: 'Ingreso',
    category: 'Sueldo',
    amount: '40,000.00',
    status: 'Completado'
  },
  {
    id: '2',
    date: '7 Feb',
    type: 'Gasto',
    category: 'Alquiler',
    amount: '15,000.00',
    status: 'Completado'
  },
  {
    id: '3',
    date: '6 Feb',
    type: 'Gasto',
    category: 'Servicios',
    amount: '5,000.00',
    status: 'Completado'
  },
  {
    id: '4',
    date: '5 Feb',
    type: 'Ingreso',
    category: 'Bonos',
    amount: '10,000.00',
    status: 'Completado'
  }
]

export default function DashboardTable() {
  return (
    <div className="flex flex-col gap-3">
      <Table aria-label="Transacciones recientes" color="default" selectionMode="multiple">
        <TableHeader>
          <TableColumn>Fecha</TableColumn>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Monto (RD$)</TableColumn>
          <TableColumn>Estado</TableColumn>
        </TableHeader>
        <TableBody>
          {transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <Chip className={transaction.type === 'Ingreso' ? 'bg-emerald-200' : 'bg-slate-200'}>
                  {transaction.type}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip className="bg-slate-200">{transaction.category}</Chip>
              </TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>
                <Chip className="bg-green-300">{transaction.status}</Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 