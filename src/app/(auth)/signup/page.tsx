'use client'

import { Card, Input, Link, CardBody } from '@heroui/react'
import { Form } from '@heroui/form'
import { Button } from '@heroui/button'
import LockIcon from '@/components/icons/lock'
import UserIcon from '@/components/icons/user'
import MailIcon from '@/components/icons/mail'
import { FormEvent, useState } from 'react'

export default function Signup() {
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.currentTarget))
  }

  return (
    <main className="h-screen flex flex-col lg:flex-row">
      <section className="h-full grow bg-gradient-to-br from-teal-900 to-sky-900 grid place-content-center">
        <div className="h-full text-white flex flex-col gap-4">
          <h2 className="text-4xl font-light">¡Hola amigo!</h2>
          <p>Bienvenido de nuevo, Tus finanzas te esperan</p>
          <p className="max-w-96 font-light">
            Revisa tu progreso, gestiona tus ingresos y toma mejores decisiones financieras con la
            ayuda de nuestra inteligencia artificial. Conéctate y sigue avanzando hacia su
            estabilidad económica.
          </p>
          <Button href="/login" className="self-start text-white" as={Link} variant="bordered">
            Iniciar sesion
          </Button>
        </div>
      </section>
      <section className="h-full lg:w-[45%] grid place-content-center">
        <div className="h-full w-96 max-w-96 p-10">
          <h1 className="text-2xl mb-6 font-medium text-center">Crea una cuenta</h1>
          <Form
            className="flex flex-col gap-4 items-center"
            validationBehavior="native"
            onSubmit={async formData => {
              await onSubmit(formData)
            }}
          >
            <Input
              isRequired
              name="firstname"
              type="text"
              placeholder="Nombre"
              startContent={<UserIcon className="w-5 h-5 text-gray-600" />}
            />
            <Input
              isRequired
              name="lastname"
              type="text"
              placeholder="Apellido"
              startContent={<UserIcon className="w-5 h-5 text-gray-600" />}
            />
            <Input
              isRequired
              name="email"
              type="email"
              placeholder="Correo Electronico"
              startContent={<MailIcon className="w-5 h-5 text-gray-600" />}
            />
            <Input
              isRequired
              name="password"
              type="password"
              placeholder="Contraseña"
              className="w-full"
              startContent={<LockIcon className="h-5 w-5 text-gray-600" />}
            />
            <Button type="submit" className="bg-teal-800 text-white">
              Registrarse
            </Button>
            {error && (
              <Card className="w-full border-red-500 border-1 bg-red-50">
                <CardBody className="text-sm text-red-500 ">{error}</CardBody>
              </Card>
            )}
          </Form>
        </div>
      </section>
    </main>
  )
}
