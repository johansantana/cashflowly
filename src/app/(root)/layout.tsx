import Navbar from '@/components/ui/navbar'
import SidePanel from '@/components/ui/sidePanel'
import { Divider } from '@heroui/react'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-screen flex overflow-hidden">
      <Navbar />
      <main className="p-6 px-8 flex-grow overflow-y-scroll">{children}</main>
      <Divider orientation="vertical" className="bg-gray-300/50" />
      <SidePanel />
    </div>
  )
}
