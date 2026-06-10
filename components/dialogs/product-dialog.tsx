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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Product {
  id?: string
  name: string
  sku: string
  category: string
  quantity: number
  unit_price: number
  description?: string
}

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (product: Product) => void
  initialData?: Product
  isLoading?: boolean
}

export function ProductDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading = false,
}: ProductDialogProps) {
  const [formData, setFormData] = useState<Product>(
    initialData || {
      name: '',
      sku: '',
      category: 'aceites',
      quantity: 0,
      unit_price: 0,
      description: '',
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.sku || formData.unit_price === 0) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    onSubmit(formData)
    setFormData({
      name: '',
      sku: '',
      category: 'aceites',
      quantity: 0,
      unit_price: 0,
      description: '',
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Actualiza los datos del producto'
              : 'Agrega un nuevo producto al catálogo'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nombre del Producto *
            </Label>
            <Input
              id="name"
              placeholder="ej: Aceite 10W-40 Shell"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isLoading}
            />
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label htmlFor="sku" className="text-sm font-medium">
              SKU *
            </Label>
            <Input
              id="sku"
              placeholder="ej: OIL-001"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              disabled={isLoading}
            />
          </div>

          {/* Categoría y Cantidad */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Categoría *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                disabled={isLoading}
              >
                <SelectTrigger id="category" className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aceites">Aceites</SelectItem>
                  <SelectItem value="filtros">Filtros</SelectItem>
                  <SelectItem value="fluidos">Fluidos</SelectItem>
                  <SelectItem value="repuestos">Repuestos</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium">
                Cantidad *
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })
                }
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Precio Unitario (USD) *
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              step="0.01"
              value={formData.unit_price}
              onChange={(e) =>
                setFormData({ ...formData, unit_price: parseFloat(e.target.value) || 0 })
              }
              disabled={isLoading}
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Descripción
            </Label>
            <Textarea
              id="description"
              placeholder="Detalles del producto (opcional)"
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
