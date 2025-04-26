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

const bills = [
  {
    id: '1',
    date: '8 Feb',
    category: 'Servicios',
    amount: '5,000.00',
    status: 'Pendiente',
    dueDate: '15 Feb',
    paymentMethod: 'Tarjeta'
  },
  {
    id: '2',
    date: '10 Ene',
    category: 'Alquiler',
    amount: '15,000.00',
    status: 'Pagado',
    dueDate: '5 Ene',
    paymentMethod: 'Transferencia'
  },
  {
    id: '3',
    date: '1 Ene',
    category: 'Servicios',
    amount: '3,000.00',
    status: 'Pagado',
    dueDate: '10 Ene',
    paymentMethod: 'Efectivo'
  },
  {
    id: '4',
    date: '28 Dic',
    category: 'Alquiler',
    amount: '15,000.00',
    status: 'Pagado',
    dueDate: '5 Dic',
    paymentMethod: 'Transferencia'
  }
]

export default function DashboardTable() {
  return (
    <div className="flex flex-col gap-3">
      <Table aria-label="Historial de facturas" color="default" selectionMode="multiple">
        <TableHeader>
          <TableColumn>Fecha</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Monto (RD$)</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Vencimiento</TableColumn>
          <TableColumn>Método de pago</TableColumn>
        </TableHeader>
        <TableBody>
          {bills.map(bill => (
            <TableRow key={bill.id}>
              <TableCell>{bill.date}</TableCell>
              <TableCell>
                <Chip className="bg-slate-200">{bill.category}</Chip>
              </TableCell>
              <TableCell>{bill.amount}</TableCell>
              <TableCell>
                <Chip className={bill.status === 'Pagado' ? 'bg-green-300' : 'bg-slate-300'}>
                  {bill.status}
                </Chip>
              </TableCell>
              <TableCell>{bill.dueDate}</TableCell>
              <TableCell>{bill.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 