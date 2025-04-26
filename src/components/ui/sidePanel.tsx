'use client'

import React, { useState } from 'react'
import { Button } from '@heroui/react'
import BellIcon from '../icons/bell'
import UserIcon from '../icons/user'
import NotificationsPanel from './notificationsPanel'
import UserPanel from './userPanel'

export default function SidePanel(props: React.HTMLProps<HTMLDivElement>) {
  const [activePanel, setActivePanel] = useState<'notifications' | 'user' | null>(null)

  const togglePanel = (panel: 'notifications' | 'user') => {
    setActivePanel(activePanel === panel ? null : panel)
  }

  return (
    <div className="flex flex-col p-4 gap-4 relative" {...props}>
      <div className="relative">
        <Button
          isIconOnly
          className="border-1"
          variant="bordered"
          onPress={() => togglePanel('notifications')}
        >
          <BellIcon className="text-gray-400" />
        </Button>
        <NotificationsPanel
          isOpen={activePanel === 'notifications'}
          onClose={() => setActivePanel(null)}
        />
      </div>
      <div className="relative">
        <Button
          isIconOnly
          className="border-1"
          variant="bordered"
          onPress={() => togglePanel('user')}
        >
          <UserIcon className="text-gray-400" isCircled />
        </Button>
        <UserPanel isOpen={activePanel === 'user'} onClose={() => setActivePanel(null)} />
      </div>
    </div>
  )
}
