import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/react'

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  if (!isOpen) return null

  return (
    <Card className="absolute right-20 top-0 w-80 shadow-lg z-50">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notificaciones</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ×
        </button>
      </CardHeader>
      <CardBody className="max-h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {/* Example notifications - replace with real data */}
          <div className="p-3 bg-sky-50 rounded-lg">
            <p className="text-sm font-medium text-sky-900">Nueva factura pendiente</p>
            <p className="text-xs text-sky-700">Tienes una factura por pagar que vence en 3 días</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg">
            <p className="text-sm font-medium text-amber-900">Meta alcanzada</p>
            <p className="text-xs text-amber-700">¡Felicidades! Has alcanzado tu meta de ahorro mensual</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="border-t">
        <button className="text-sm text-sky-600 hover:text-sky-800">Ver todas las notificaciones</button>
      </CardFooter>
    </Card>
  )
} 