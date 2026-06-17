'use client'

import React from "react"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface Supplier {
  id?: string
  name: string
  contact: string
  email: string
  phone: string
  location: string
  products: string
}

interface SupplierDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (supplier: Supplier) => void
  initialData?: Supplier
  isLoading?: boolean
}

export function SupplierDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading = false,
}: SupplierDialogProps) {
  const [formData, setFormData] = useState<Supplier>(
    initialData || {
      name: '',
      contact: '',
      email: '',
      phone: '',
      location: '',
      products: '',
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      alert('Por favor completa los campos requeridos')
      return
    }

    onSubmit(formData)
    setFormData({
      name: '',
      contact: '',
      email: '',
      phone: '',
      location: '',
      products: '',
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Editar Proveedor' : 'Nuevo Proveedor'}</DialogTitle>
          <DialogDescription>
            {initialData ? 'Actualiza los datos del proveedor' : 'Agrega un nuevo proveedor'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nombre de la Empresa *
            </Label>
            <Input
              id="name"
              placeholder="ej: Shell Lubricants"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isLoading}
            />
          </div>

          {/* Contacto */}
          <div className="space-y-2">
            <Label htmlFor="contact" className="text-sm font-medium">
              Persona de Contacto
            </Label>
            <Input
              id="contact"
              placeholder="Nombre del contacto"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              disabled={isLoading}
            />
          </div>

          {/* Email y Teléfono */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="proveedor@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Teléfono
              </Label>
              <Input
                id="phone"
                placeholder="+56 2 XXXX XXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Ubicación */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Ubicación
            </Label>
            <Input
              id="location"
              placeholder="Ciudad, País"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              disabled={isLoading}
            />
          </div>

          {/* Productos */}
          <div className="space-y-2">
            <Label htmlFor="products" className="text-sm font-medium">
              Productos/Servicios
            </Label>
            <Textarea
              id="products"
              placeholder="Describe qué productos o servicios ofrece"
              value={formData.products}
              onChange={(e) => setFormData({ ...formData, products: e.target.value })}
              disabled={isLoading}
              rows={3}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
