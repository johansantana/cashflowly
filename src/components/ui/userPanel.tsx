import React from 'react'
import { Card, CardBody, CardFooter, Button, Avatar } from '@heroui/react'
import LogoutIcon from '../icons/logout'
import { useRouter } from 'next/navigation'

interface UserPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserPanel({ isOpen, onClose }: UserPanelProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleLogout = () => {
    // Remove the token cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

    // Redirect to login page
    router.push('/login')
  }

  return (
    <Card className="absolute right-20 top-0 w-80 shadow-lg z-50">
      <CardBody className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            className="w-16 h-16"
          />
          <div>
            <h4 className="text-lg font-semibold">Juan Pérez</h4>
            <p className="text-sm text-gray-500">juan.perez@example.com</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>
        <div className="space-y-2">
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium text-slate-900">Plan Actual</p>
            <p className="text-xs text-slate-700">Plan Premium</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium text-slate-900">Último acceso</p>
            <p className="text-xs text-slate-700">Hace 5 minutos</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="border-t">
        <Button
          className="w-full"
          color="danger"
          variant="flat"
          startContent={<LogoutIcon />}
          onPress={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </CardFooter>
    </Card>
  )
}
