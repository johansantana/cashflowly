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
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const generateAccountNumber = () => {
    // Generate a random 10-digit account number
    return Math.floor(1000000000 + Math.random() * 9000000000).toString()
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      // Register user
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: `${data.firstname} ${data.lastname}`,
          email: data.email,
          password: data.password
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al registrar usuario')
      }

      // Get user info by email
      const userResponse = await fetch(`/api/usuarios/email/${data.email}`)
      if (!userResponse.ok) {
        throw new Error('Error al obtener información del usuario')
      }
      const userData = await userResponse.json()

      // Create default account
      const accountResponse = await fetch('/api/Cuentas/Post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: 'default',
          numeroDeCuenta: generateAccountNumber(),
          saldoDisponible: 0,
          usuarioId: userData.id
        })
      })

      if (!accountResponse.ok) {
        throw new Error('Error al crear la cuenta')
      }

      setSuccess('¡Registro exitoso! Redirigiendo al inicio de sesión...')

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar usuario')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="h-screen flex flex-col lg:flex-row">
      <section className="h-full grow bg-darkGreen from-teal-900 to-sky-900 grid place-content-center">
        <div className="h-full text-white flex flex-col gap-8">
          <h2 className="text-4xl font-light">¡Hola amigo!</h2>
          <p>Bienvenido de nuevo, Tus finanzas te esperan</p>
          <p className="max-w-96 font-light">
            Revisa tu progreso, gestiona tus ingresos y toma mejores decisiones financieras con la
            ayuda de nuestra inteligencia artificial. Conéctate y sigue avanzando hacia su
            estabilidad económica.
          </p>
          <Button href="/login" className="self-start text-white bg-mutedGreen" as={Link} variant="bordered">
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
            <Button type="submit" className="bg-teal-800 text-white" isLoading={isLoading}>
              Registrarse
            </Button>
            {error && (
              <Card className="w-full border-red-500 border-1 bg-red-50">
                <CardBody className="text-sm text-red-500 ">{error}</CardBody>
              </Card>
            )}
            {success && (
              <Card className="w-full border-green-500 border-1 bg-green-50">
                <CardBody className="text-sm text-green-500">{success}</CardBody>
              </Card>
            )}
          </Form>
        </div>
      </section>
    </main>
  )
}
