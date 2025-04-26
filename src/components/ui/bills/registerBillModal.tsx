'use client'

import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem
} from '@heroui/react'
import { useRouter } from 'next/navigation'

interface RegisterBillModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Category {
  id: number
  name: string
}

interface Account {
  id: number
  name: string
}

const getTokenFromCookies = () => {
  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='))
  return tokenCookie ? tokenCookie.split('=')[1] : null
}

export default function RegisterBillModal({ isOpen, onClose }: RegisterBillModalProps) {
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const token = getTokenFromCookies()
      if (!token) {
        console.error('No token found in cookies')
        return
      }

      // Fetch categories
      fetch('/api/categorias/fijas/gastos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(console.error)

      // Fetch accounts
      const userId = localStorage.getItem('userId')
      if (userId) {
        fetch(`/api/Cuentas/GetByUserId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(data => setAccounts(data))
          .catch(console.error)
      }
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const token = getTokenFromCookies()
    if (!token) {
      console.error('No token found in cookies')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/Gasto/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          monto: parseFloat(amount),
          fecha: new Date().toISOString(),
          categoriaGastoId: parseInt(selectedCategory),
          categoriaGastoPersonalizadoId: 0,
          cuentaId: parseInt(selectedAccount)
        })
      })

      if (response.ok) {
        onClose()
        router.refresh()
      } else {
        console.error('Error registering bill')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Registrar Factura</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Monto"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
              <Select
                label="Categoría"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                required
              >
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Cuenta"
                value={selectedAccount}
                onChange={e => setSelectedAccount(e.target.value)}
                required
              >
                {accounts.map(account => (
                  <SelectItem key={account.id} value={account.id.toString()}>
                    {account.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="primary" type="submit" isLoading={isLoading}>
              Registrar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
