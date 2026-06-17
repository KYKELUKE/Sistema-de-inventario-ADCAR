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
import { X, Plus } from 'lucide-react'

interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
}

interface Order {
  id?: string
  clientName: string
  clientEmail: string
  clientPhone: string
  items: OrderItem[]
  notes?: string
  status?: string
}

interface OrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (order: Order) => void
  initialData?: Order
  isLoading?: boolean
}

export function OrderDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading = false,
}: OrderDialogProps) {
  const [formData, setFormData] = useState<Order>(
    initialData || {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      items: [],
      notes: '',
      status: 'pending',
    }
  )

  const [newItem, setNewItem] = useState<OrderItem>({
    productId: '',
    productName: '',
    quantity: 1,
    unitPrice: 0,
  })

  const handleAddItem = () => {
    if (!newItem.productName || newItem.quantity === 0 || newItem.unitPrice === 0) {
      alert('Completa todos los datos del producto')
      return
    }

    setFormData({
      ...formData,
      items: [...formData.items, { ...newItem, productId: `prod-${Date.now()}` }],
    })

    setNewItem({
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
    })
  }

  const handleRemoveItem = (productId: string) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.productId !== productId),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.clientName || !formData.clientEmail || formData.items.length === 0) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    onSubmit(formData)
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      items: [],
      notes: '',
      status: 'pending',
    })
    onOpenChange(false)
  }

  const totalAmount = formData.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Editar Orden' : 'Nueva Orden'}</DialogTitle>
          <DialogDescription>
            {initialData ? 'Actualiza los datos de la orden' : 'Crea una nueva orden de venta'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos del Cliente */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Datos del Cliente</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-sm font-medium">
                  Nombre *
                </Label>
                <Input
                  id="clientName"
                  placeholder="Nombre del cliente"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail" className="text-sm font-medium">
                  Email *
                </Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="cliente@email.com"
                  value={formData.clientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, clientEmail: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="clientPhone" className="text-sm font-medium">
                  Teléfono
                </Label>
                <Input
                  id="clientPhone"
                  placeholder="+56 9 XXXX XXXX"
                  value={formData.clientPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, clientPhone: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Productos</h3>

            {/* Lista de items */}
            {formData.items.length > 0 && (
              <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
                {formData.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between p-2 bg-background rounded border border-border"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} x ${item.unitPrice.toFixed(2)} = $
                        {(item.quantity * item.unitPrice).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.productId)}
                      disabled={isLoading}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="p-2 bg-secondary/10 rounded border border-secondary/30 font-semibold text-sm">
                  Total: ${totalAmount.toFixed(2)}
                </div>
              </div>
            )}

            {/* Agregar nuevo item */}
            <div className="space-y-2 p-3 bg-muted/20 rounded-lg">
              <p className="text-xs font-medium text-muted-foreground mb-2">Agregar Producto</p>
              <div className="grid grid-cols-4 gap-2">
                <Input
                  placeholder="Producto"
                  value={newItem.productName}
                  onChange={(e) =>
                    setNewItem({ ...newItem, productName: e.target.value })
                  }
                  disabled={isLoading}
                  className="col-span-2"
                />
                <Input
                  type="number"
                  placeholder="Cantidad"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: parseInt(e.target.value) || 1,
                    })
                  }
                  disabled={isLoading}
                />
                <Input
                  type="number"
                  placeholder="Precio"
                  step="0.01"
                  value={newItem.unitPrice}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      unitPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  disabled={isLoading}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddItem}
                disabled={isLoading}
                className="w-full bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </div>
          </div>

          {/* Notas */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notas
            </Label>
            <Textarea
              id="notes"
              placeholder="Notas adicionales (opcional)"
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              disabled={isLoading}
              rows={2}
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
              disabled={isLoading || formData.items.length === 0}
            >
              {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Orden'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
