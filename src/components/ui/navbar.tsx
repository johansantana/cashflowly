import React from 'react'
import { Divider } from '@heroui/react'
import LogoIcon from '../icons/logo'
import NavbarItem from './navbarItem'
import HomeIcon from '../icons/home'
import TrendingUpIcon from '../icons/trendingUp'
import TrendingDownIcon from '../icons/trending'
import BudgetIcon from '../icons/budget'
import TargetIcon from '../icons/target'
import SettingsIcon from '../icons/settings'
import AnalyticsIcon from '../icons/analytics'
import ReportIcon from '../icons/report'

const pages = [
  { label: 'Inicio', href: '/', icon: HomeIcon },
  { label: 'Ingresos', href: '/incomes', icon: TrendingUpIcon },
  { label: 'Facturas', href: '/bills', icon: TrendingDownIcon },
  { label: 'Presupuesto', href: '/budget', icon: BudgetIcon },
  { label: 'Metas', href: '/goals', icon: TargetIcon },
  { label: 'Reportes', href: '/reports', icon: ReportIcon },
  { label: 'Análisis', href: '/analysis', icon: AnalyticsIcon }
]

export default function Navbar(props: React.HTMLProps<HTMLElement>) {
  return (
    <aside
      className="flex flex-col bg-darkGreen text-beige min-w-[400px] p-5"
      {...props}
    >
      <section>
        <div className="flex items-center gap-1">
          <LogoIcon />
          <span className="text-lg text-white">CashFlowly</span>
        </div>
      </section>
      <Divider className="my-5 bg-white/30" />
      <section>
        <ul className="flex flex-col gap-4">
          {pages.map((page, index) => (
            <NavbarItem
              key={index}
              href={page.href}
              icon={<page.icon className="h-5 w-5" />}
              label={page.label}
            />
          ))}
        </ul>
      </section>
      <Divider className="my-5 bg-white/30" />
      <section className="flex-grow flex flex-col justify-end">
        <div className="flex items-center gap-1">
          <NavbarItem
            href="/settings"
            icon={<SettingsIcon className="h-5 w-5" />}
            label="Configuración"
          />
        </div>
      </section>
    </aside>
  )
}
