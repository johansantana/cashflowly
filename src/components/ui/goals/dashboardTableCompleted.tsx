'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@heroui/react'

interface Meta {
  id: number
  nombre: string
  objetivo: number
  fechaPropuesta: string
  progresoActual: number
}

export default function DashboardTableCompleted() {
  const [metasCompletadas, setMetasCompletadas] = useState<Meta[]>([])

  useEffect(() => {
    const fetchMetas = async () => {
      const token = localStorage.getItem('token')
      try {
        const res = await fetch('https://cashflowly-service-858222718338.us-east1.run.app/api/Meta', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*'
          }
        })
        const data: Meta[] = await res.json()
        const completadas = data.filter(meta => meta.progresoActual >= meta.objetivo)
        setMetasCompletadas(completadas)
      } catch (err) {
        console.error('Error al obtener metas completadas:', err)
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

      // Remover del estado actual
      setMetasCompletadas(prev => prev.filter(meta => meta.id !== id))
    } catch (err) {
      console.error('Error al eliminar meta completada:', err)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Table
        isHeaderSticky
        aria-label="Historial de metas cumplidas"
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
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {metasCompletadas.map(meta => (
            <TableRow key={meta.id}>
              <TableCell>{meta.nombre}</TableCell>
              <TableCell>{meta.objetivo.toLocaleString()}</TableCell>
              <TableCell>{new Date(meta.fechaPropuesta).toLocaleDateString()}</TableCell>
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
