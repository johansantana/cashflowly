'use client'

import { Input, Button, Link } from '@heroui/react'
import LockIcon from '@/components/icons/lock'
import UserIcon from '@/components/icons/user'
import MoneybagIcon from '@/components/icons/moneybag'

export default function Login() {
  return (
    <main className="h-screen flex">
      <section className="h-full w-[40%] grid place-content-center">
        <div className="h-full w-96 max-w-96">
          <h1 className="text-2xl mb-6 font-medium text-center">Iniciar Sesion en CashFlowly</h1>
          <form action="submit" className="flex flex-col gap-4 items-center">
            <Input
              type="email"
              placeholder="Correo Electronico"
              startContent={<UserIcon className="w-5 h-5 text-gray-600" />}
            />
            <Input
              type="password"
              placeholder="Contraseña"
              className="w-full"
              startContent={<LockIcon className="h-5 w-5 text-gray-600" />}
            />
            <Link href="#" underline="always" className="text-sm text-black">
              ¿Olvidaste tu contraseña?
            </Link>
            <Button className="bg-teal-800 text-white">Iniciar sesión</Button>
          </form>
        </div>
      </section>
      <section className="h-full grow bg-gradient-to-br from-teal-900 to-sky-900 grid place-content-center">
        <div className="h-full text-white flex flex-col gap-4">
          <h2 className="text-4xl font-light">¡Bienvenido de vuelta!</h2>
          <p>Optimiza tus finanzas con la IA</p>
          <p className="max-w-96 font-light">
            Toma el control de tus ingresos y gastos inteligencia artificial. Planifica, ahorra y
            haz crecer tu dinero de forma inteligente. Únete ahora y comienza a mejorar tu futuro
            financiero.
          </p>
          <Button href="#" className="self-start text-white" as={Link} variant="bordered">
            Registrarse
          </Button>
        </div>
      </section>
    </main>
  )
}
