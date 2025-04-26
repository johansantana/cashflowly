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
  SelectItem,
  Switch
} from '@heroui/react'
import { useRouter } from 'next/navigation'

interface RegisterIncomeModalProps {
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

export default function RegisterIncomeModal({ isOpen, onClose }: RegisterIncomeModalProps) {
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const [isFixed, setIsFixed] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Fetch categories
      fetch('/api/categorias/fijas/ingresos')
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(console.error)

      // Fetch accounts
      const userId = localStorage.getItem('userId')
      if (userId) {
        fetch(`/api/Cuentas/GetByUserId/${userId}`)
          .then(res => res.json())
          .then(data => setAccounts(data))
          .catch(console.error)
      }
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/Ingresos/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          monto: parseFloat(amount),
          fecha: new Date().toISOString(),
          ingresoFijo: isFixed,
          categoriaId: parseInt(selectedCategory),
          categoriaPersonalizadaId: 0,
          cuentaId: parseInt(selectedAccount)
        })
      })

      if (response.ok) {
        onClose()
        router.refresh()
      } else {
        console.error('Error registering income')
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
          <ModalHeader>Registrar Ingreso</ModalHeader>
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
              <div className="flex items-center gap-2">
                <Switch isSelected={isFixed} onValueChange={setIsFixed} />
                <span>Ingreso Fijo</span>
              </div>
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
