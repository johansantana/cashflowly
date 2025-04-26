'use client'

import { Button } from '@heroui/react'
import { Link } from '@heroui/react'
import { ReactElement } from 'react'

export default function NavbarItem({
  href,
  icon,
  label
}: Readonly<{ href: string; icon: ReactElement; label: string }>) {
  return (
    <li className="flex items-center gap-2 w-full">
      <Button
        as={Link}
        href={href}
        className="w-full text-white text-medium font-light justify-start bg-white/5"
        startContent={icon}
      >
        {label}
      </Button>
    </li>
  )
}
