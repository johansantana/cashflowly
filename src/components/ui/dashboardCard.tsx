interface DashboardCardProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  props?: React.HTMLProps<HTMLElement>
  variant?: 'default' | 'image' | 'colored' | 'lightColored'
  span?: '1' | '2' | '3'
}

export default function DashboardCard({ children, ...props }: Readonly<DashboardCardProps>) {
  const { variant = 'default', span = '1', className } = props

  const classesForVariant = {
    default: 'bg-slate-100 p-4 lg:p-5 2xl:p-8',
    image: 'bg-slate-100',
    colored: 'bg-emerald-600 p-4 lg:p-5 2xl:p-8',
    lightColored: 'bg-emerald-200 p-4 lg:p-5 2xl:p-8'
  }

  const classesForSpan = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3'
  }

  return (
    <div
      className={`${classesForSpan[span]} min-h-[200px] h-full rounded-2xl overflow-hidden ${classesForVariant[variant]} ${className}`}
    >
      {children}
    </div>
  )
}
