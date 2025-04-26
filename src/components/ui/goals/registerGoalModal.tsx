'use client'

import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from '@heroui/react'
import { useRouter } from 'next/navigation'

interface RegisterGoalModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegisterGoalModal({ isOpen, onClose }: RegisterGoalModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [objective, setObjective] = useState('')
  const [proposedDate, setProposedDate] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('https://localhost:7248/api/Meta/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: name,
          objetivo: parseFloat(objective),
          fechaPropuesta: new Date(proposedDate).toISOString()
        })
      })

      if (response.ok) {
        onClose()
        router.refresh()
      } else {
        console.error('Error registering goal')
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
          <ModalHeader>Registrar Meta</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Nombre de la meta"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej: Viaje a Europa"
                required
              />
              <Input
                label="Objetivo (RD$)"
                type="number"
                value={objective}
                onChange={e => setObjective(e.target.value)}
                placeholder="0.00"
                required
              />
              <Input
                label="Fecha propuesta"
                type="date"
                value={proposedDate}
                onChange={e => setProposedDate(e.target.value)}
                required
              />
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
