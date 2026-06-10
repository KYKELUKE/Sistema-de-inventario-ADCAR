'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Phone, Mail, MapPin, Edit, Trash2, Star, Loader } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SupplierDialog } from '@/components/dialogs/supplier-dialog'
import { DeleteDialog } from '@/components/dialogs/delete-dialog'
import { useSuppliersData } from '@/hooks/useSuppliersData'

export default function SuppliersPage() {
  const { suppliers, loading, error, createSupplier, updateSupplier, deleteSupplier } = useSuppliersData()
  
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<any | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // CRUD Functions
  const handleCreateSupplier = async (newSupplier: any) => {
    setIsSubmitting(true)
    try {
      await createSupplier(newSupplier)
      setDialogOpen(false)
      setSelectedSupplier(undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateSupplier = async (updatedSupplier: any) => {
    setIsSubmitting(true)
    try {
      await updateSupplier(selectedSupplier.id, updatedSupplier)
      setDialogOpen(false)
      setSelectedSupplier(undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteSupplier = async () => {
    if (!selectedSupplier?.id) return
    setIsSubmitting(true)
    try {
      await deleteSupplier(selectedSupplier.id)
      setDeleteDialogOpen(false)
      setSelectedSupplier(undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenDialog = (supplier?: any) => {
    setSelectedSupplier(supplier)
    setDialogOpen(true)
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive font-semibold">Error: {error}</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Cargando proveedores...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      </div>

      <main
        className={cn(
          "flex-1 p-4 md:p-5 lg:p-6 transition-all duration-300",
          isCollapsed ? "lg:ml-16" : "lg:ml-60",
        )}
      >
        <Header
          title="Gestión de Proveedores"
          description="Administra tus proveedores y gestiona las relaciones comerciales."
          actions={
            <Button 
              onClick={() => handleOpenDialog()}
              className="h-9 px-4 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Proveedor
            </Button>
          }
        />

        <div className="mt-6 space-y-4">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{supplier.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium">{supplier.contact}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={cn(
                            "text-lg",
                            i < Math.floor(supplier.rating) ? "text-yellow-400" : "text-gray-300"
                          )}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span>{supplier.rating}/5</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleOpenDialog(supplier)}
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-secondary/10 hover:text-secondary"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={() => {
                      setSelectedSupplier(supplier)
                      setDeleteDialogOpen(true)
                    }}
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${supplier.email}`} className="text-sm text-foreground hover:text-primary transition-colors">
                    {supplier.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href={`tel:${supplier.phone}`} className="text-sm text-foreground hover:text-primary transition-colors">
                    {supplier.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{supplier.location}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Dialogs */}
        <SupplierDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={(supplier) => {
            if (selectedSupplier?.id) {
              handleUpdateSupplier({ ...supplier, id: selectedSupplier.id })
            } else {
              handleCreateSupplier(supplier)
            }
          }}
          initialData={selectedSupplier}
          isLoading={isSubmitting}
        />

        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteSupplier}
          title="Eliminar Proveedor"
          description={`¿Estás seguro que deseas eliminar "${selectedSupplier?.name}"? Esta acción no se puede deshacer.`}
          isLoading={isSubmitting}
        />
      </main>
    </div>
  )
}
