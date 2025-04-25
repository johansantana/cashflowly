'use client'

import { Input, Button, Link, Form, Card, CardBody } from '@heroui/react'
import LockIcon from '@/components/icons/lock'
import UserIcon from '@/components/icons/user'
import { FormEvent, useState } from 'react'

export default function Login() {
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    const data = Object.fromEntries(new FormData(e.currentTarget));
  
    try {
      const response = await fetch('https://localhost:7248/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          recordarSesion: true,
        }),
      });
  
      if (!response.ok) {
        const res = await response.json();
        setError(res.message || 'Error al iniciar sesión');
        return;
      }
  
      const res = await response.json();
      localStorage.setItem('token', res.token); // ✅ guardar el token
      console.log('Inicio de sesión exitoso');
  
      // Redirigir al dashboard
      window.location.href = '/budget';
    } catch (err) {
      setError('Error de red o del servidor');
    }
  };
  

  return (
    <main className="h-screen flex flex-col lg:flex-row">
      <section className="h-full lg:w-[40%] grid place-content-center">
        <div className="h-full w-96 max-w-96 p-10">
          <h1 className="text-2xl mb-6 font-medium text-center">Iniciar Sesion en CashFlowly</h1>
          <Form
            validationBehavior="native"
            className="flex flex-col gap-4 items-center"
            onSubmit={async formData => {
              await onSubmit(formData)
            }}
          >
            <Input
              name="email"
              isRequired
              type="email"
              placeholder="Correo Electronico"
              startContent={<UserIcon className="w-5 h-5 text-gray-600" />}
            />
            <Input
              name="password"
              isRequired
              type="password"
              placeholder="Contraseña"
              className="w-full"
              startContent={<LockIcon className="h-5 w-5 text-gray-600" />}
            />
            <Link href="#" underline="always" className="text-sm text-black">
              ¿Olvidaste tu contraseña?
            </Link>
            <Button type="submit" className="bg-teal-800 text-white">
              Iniciar sesión
            </Button>
            {error && (
              <Card className="w-full border-red-500 border-1 bg-red-50">
                <CardBody className="text-sm text-red-500 ">{error}</CardBody>
              </Card>
            )}
          </Form>
        </div>
      </section>
      <section className="h-full grow bg-darkGreen from-teal-900 to-sky-900 grid place-content-center">
        <div className="h-full text-white flex flex-col gap-8">
          <h2 className="text-4xl font-light">¡Bienvenido de vuelta!</h2>
          <p>Optimiza tus finanzas con la IA</p>
          <p className="max-w-96 font-light">
            Toma el control de tus ingresos y gastos inteligencia artificial. Planifica, ahorra y
            haz crecer tu dinero de forma inteligente. Únete ahora y comienza a mejorar tu futuro
            financiero.
          </p>
          <Button href="/signup" className="self-start text-white bg-mutedGreen" as={Link} variant="bordered">
            Registrarse
          </Button>
        </div>
      </section>
    </main>
  )
}
