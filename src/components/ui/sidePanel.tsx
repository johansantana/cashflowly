'use client'

import React from 'react'
import { Button } from '@heroui/react'
import BellIcon from '../icons/bell'
import UserIcon from '../icons/user'

export default function SidePanel(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className="flex flex-col p-4 gap-4 " {...props}>
      <Button isIconOnly className="border-1" variant="bordered">
        <BellIcon className="text-gray-400" />
      </Button>
      <Button isIconOnly className="border-1" variant="bordered">
        <UserIcon className="text-gray-400" isCircled />
      </Button>
    </div>
  )
}
