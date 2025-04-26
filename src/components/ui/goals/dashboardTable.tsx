'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button
} from '@heroui/react'

interface Meta {
  id: number
  nombre: string
  objetivo: number
  fechaPropuesta: string
  progresoActual: number
}

export default function DashboardTable() {
  const [metas, setMetas] = useState<Meta[]>([])

  useEffect(() => {
    const fetchMetas = async () => {
      const token = localStorage.getItem('token')
      try {
        const res = await fetch('https://localhost:7248/api/Meta', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*'
          }
        })
        const data: Meta[] = await res.json()
        const activas = data.filter(meta => meta.progresoActual < meta.objetivo)
        setMetas(activas)
      } catch (err) {
        console.error('Error al obtener metas activas:', err)
      }
    }

    fetchMetas()
  }, [])

  const eliminarMeta = async (id: number) => {
    const token = localStorage.getItem('token')
    const confirmar = confirm('¿Estás seguro de que deseas eliminar esta meta completada?')
    if (!confirmar) return

    try {
      await fetch(`https://cashflowly-service-858222718338.us-east1.run.app/api/Meta/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*'
        }
      })

      // Eliminar del estado actual
      setMetas(prev => prev.filter(meta => meta.id !== id))
    } catch (err) {
      console.error('Error al eliminar meta:', err)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Table
        isHeaderSticky
        aria-label="Metas activas"
        color="secondary"
        classNames={{
          base: 'max-h-[400px] overflow-scroll',
          table: 'min-h-[90px]'
        }}
        className="overflow-hidden"
      >
        <TableHeader>
          <TableColumn>Descripción</TableColumn>
          <TableColumn>Objetivo (RD$)</TableColumn>
          <TableColumn>Acumulado (RD$)</TableColumn>
          <TableColumn>Fecha Límite</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {metas.map(meta => (
            <TableRow key={meta.id}>
              <TableCell>{meta.nombre}</TableCell>
              <TableCell>{meta.objetivo.toLocaleString()}</TableCell>
              <TableCell>{meta.progresoActual.toLocaleString()}</TableCell>
              <TableCell>{new Date(meta.fechaPropuesta).toLocaleDateString()}</TableCell>
              <TableCell>
                <Chip className="bg-green-300">Activa</Chip>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => eliminarMeta(meta.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
