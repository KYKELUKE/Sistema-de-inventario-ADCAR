'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Plus, Edit2, Trash2, Package, Filter, Download, Loader } from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ProductDialog } from '@/components/dialogs/product-dialog'
import { DeleteDialog } from '@/components/dialogs/delete-dialog'
import { useProductsData } from '@/hooks/useProductsData'

export default function ProductsPage() {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProductsData()
  
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOpenDialog = (product?: any) => {
    setSelectedProduct(product)
    setDialogOpen(true)
  }

  const handleCreateProduct = async (product: any) => {
    setIsSubmitting(true)
    try {
      await createProduct(product)
      setDialogOpen(false)
      setSelectedProduct(undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateProduct = async (product: any) => {
    setIsSubmitting(true)
    try {
      await updateProduct(selectedProduct.id, product)
      setDialogOpen(false)
      setSelectedProduct(undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async () => {
    setIsSubmitting(true)
    try {
      if (selectedProduct?.id) {
        await deleteProduct(selectedProduct.id)
      }
      setDeleteDialogOpen(false)
      setSelectedProduct(undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExportCSV = () => {
    if (products.length === 0) {
      alert('No hay productos para exportar')
      return
    }

    // Create CSV header
    const headers = ['ID', 'Producto', 'SKU', 'Categoría', 'Cantidad', 'Precio Unitario', 'Precio Total', 'Fecha']
    
    // Create CSV rows
    const rows = products.map((product) => [
      product.id,
      product.name,
      product.sku,
      product.category,
      product.quantity,
      product.unit_price.toFixed(2),
      (product.quantity * product.unit_price).toFixed(2),
      new Date(product.created_at).toLocaleDateString('es-CL'),
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `inventario_productos_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <p className="text-muted-foreground">Cargando productos...</p>
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
          title="Catálogo de Productos"
          description="Gestiona lubricantes, filtros, fluidos y repuestos automotrices"
          userEmail="usuario@lubricentro.com"
          actions={
            <>
              <Button 
                onClick={() => handleOpenDialog()}
                className="h-9 px-4 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Producto
              </Button>
              <Button 
                onClick={handleExportCSV}
                variant="outline" 
                className="h-9 px-4 text-sm font-medium rounded-lg bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </>
          }
        />

        <div className="mt-8 space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar por nombre o SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 h-9 text-sm bg-card border-border rounded-lg"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-full sm:w-32 text-sm rounded-lg">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="aceites">Aceites</SelectItem>
                  <SelectItem value="filtros">Filtros</SelectItem>
                  <SelectItem value="fluidos">Fluidos</SelectItem>
                  <SelectItem value="repuestos">Repuestos</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg bg-transparent">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Products Table Card */}
          <Card className="overflow-hidden border-0 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Producto</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">SKU</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Categoría</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Cantidad</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Precio</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Estado</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => {
                      const status = product.quantity <= 5 ? 'critical' : product.quantity <= 20 ? 'warning' : 'ok'
                      return (
                        <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4 text-foreground font-medium">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded bg-secondary/10 flex items-center justify-center">
                                <Package className="w-4 h-4 text-secondary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{product.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="font-mono text-xs">{product.sku}</Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-sm capitalize">{product.category}</td>
                          <td className="py-3 px-4 text-right font-semibold text-foreground">{product.quantity}</td>
                          <td className="py-3 px-4 text-right font-medium text-secondary">${product.unit_price.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <Badge
                              className={cn(
                                'font-medium text-xs',
                                status === 'critical' && 'bg-destructive/10 text-destructive',
                                status === 'warning' && 'bg-warning/10 text-warning',
                                status === 'ok' && 'bg-success/10 text-success',
                              )}
                            >
                              {status === 'critical' && 'Crítico'}
                              {status === 'warning' && 'Bajo'}
                              {status === 'ok' && 'Normal'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center gap-1">
                              <Button 
                                onClick={() => handleOpenDialog(product)}
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 hover:bg-secondary/10 hover:text-secondary rounded"
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button 
                                onClick={() => {
                                  setSelectedProduct(product)
                                  setDeleteDialogOpen(true)
                                }}
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 px-4 text-center">
                        <div className="text-muted-foreground">
                          <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
                          <p className="font-medium">No hay productos</p>
                          <p className="text-sm">Comienza agregando tu primer producto</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Dialogs */}
        <ProductDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={(product) => {
            if (selectedProduct?.id) {
              handleUpdateProduct({ ...product, id: selectedProduct.id, created_at: selectedProduct.created_at })
            } else {
              handleCreateProduct(product)
            }
          }}
          initialData={selectedProduct}
          isLoading={isSubmitting}
        />

        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteProduct}
          title="Eliminar Producto"
          description={`¿Estás seguro que deseas eliminar "${selectedProduct?.name}"? Esta acción no se puede deshacer.`}
          isLoading={isSubmitting}
        />
      </main>
    </div>
  )
}
