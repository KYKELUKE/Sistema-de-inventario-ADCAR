'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Plus, Eye, Trash2, TrendingUp, Clock, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OrderDialog } from '@/components/dialogs/order-dialog'
import { DeleteDialog } from '@/components/dialogs/delete-dialog'
import { useOrdersData } from '@/hooks/useOrdersData'
import { Order } from '@/types' // Import Order type

const statusConfig = {
  completed: { label: 'Completada', color: 'bg-success/10 text-success', icon: CheckCircle },
  processing: { label: 'En Proceso', color: 'bg-accent/10 text-accent', icon: TrendingUp },
  pending: { label: 'Pendiente', color: 'bg-warning/10 text-warning', icon: Clock },
  cancelled: { label: 'Cancelada', color: 'bg-destructive/10 text-destructive', icon: AlertCircle },
}

export default function OrdersPage() {
  const { orders, loading, error, createOrder, updateOrder, deleteOrder } = useOrdersData()
  
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // CRUD Functions
  const handleCreateOrder = async (newOrder: Order) => {
    setIsSubmitting(true)
    try {
      await createOrder(newOrder)
      setDialogOpen(false)
      setSelectedOrder(undefined)
      console.log('Orden creada:', newOrder)
    } catch (error) {
      console.error('Error creando orden:', error)
      alert('Error al crear la orden')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateOrder = async (updatedOrder: Order) => {
    setIsSubmitting(true)
    try {
      await updateOrder(updatedOrder.id, updatedOrder)
      setDialogOpen(false)
      setSelectedOrder(undefined)
      console.log('Orden actualizada:', updatedOrder)
    } catch (error) {
      console.error('Error actualizando orden:', error)
      alert('Error al actualizar la orden')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteOrder = async () => {
    if (!selectedOrder) return
    setIsSubmitting(true)
    try {
      await deleteOrder(selectedOrder.id)
      setDeleteDialogOpen(false)
      setSelectedOrder(undefined)
      console.log('Orden eliminada:', selectedOrder)
    } catch (error) {
      console.error('Error eliminando orden:', error)
      alert('Error al eliminar la orden')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenDialog = (order?: Order) => {
    setSelectedOrder(order)
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
          <p className="text-muted-foreground">Cargando órdenes...</p>
        </div>
      </div>
    )
  }

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = [
    { title: 'Órdenes Hoy', value: '8', icon: TrendingUp, color: 'bg-accent/10 text-accent' },
    { title: 'En Proceso', value: '3', icon: Clock, color: 'bg-warning/10 text-warning' },
    { title: 'Completadas', value: '24', icon: CheckCircle, color: 'bg-success/10 text-success' },
    { title: 'Monto Total', value: 'S/ 18.5K', icon: TrendingUp, color: 'bg-secondary/10 text-secondary' },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      </div>

      <main
        className={cn(
          'flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300',
          isCollapsed ? 'lg:ml-16' : 'lg:ml-64',
        )}
      >
        <Header
          title="Órdenes y Ventas"
          description="Gestiona todas tus órdenes de venta y seguimiento de pedidos"
          actions={
            <Button 
              onClick={() => handleOpenDialog()}
              className="h-9 px-4 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Orden
            </Button>
          }
        />

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className={cn('p-3 rounded-lg', stat.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Buscar por número de orden o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 h-9 text-sm bg-card border-border rounded-lg"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-9 w-full sm:w-40 text-sm rounded-lg">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="processing">En Proceso</SelectItem>
              <SelectItem value="completed">Completada</SelectItem>
              <SelectItem value="cancelled">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <Card className="mt-6 overflow-hidden border-0 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Orden</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Cliente</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Productos</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Monto</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Fecha</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
                    const StatusIcon = statusInfo.icon
                    return (
                      <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="font-mono text-xs font-semibold">
                            {order.id}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-medium text-foreground">{order.clientName}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge className="bg-primary/10 text-primary font-medium text-xs">
                            {order.items.length} items
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-semibold text-secondary text-right">${(order.total ?? 0).toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className={cn('p-1.5 rounded', statusInfo.color)}>
                              <StatusIcon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-medium">{statusInfo.label}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-sm">{order.date}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-1">
                            <Button
                              onClick={() => handleOpenDialog(order)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-accent/10 hover:text-accent rounded"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectedOrder(order)
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
                        <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="font-medium">Sin órdenes</p>
                        <p className="text-sm">Crea una nueva orden para comenzar</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Dialogs */}
        <OrderDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={(order) => {
            if (selectedOrder?.id) {
              handleUpdateOrder({ ...order, id: selectedOrder.id })
            } else {
              handleCreateOrder(order)
            }
          }}
          initialData={selectedOrder}
          isLoading={isSubmitting}
        />

        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteOrder}
          title="Eliminar Orden"
          description={`¿Estás seguro que deseas eliminar la orden "${selectedOrder?.id}" del cliente "${selectedOrder?.clientName}"? Esta acción no se puede deshacer.`}
          isLoading={isSubmitting}
        />
      </main>
    </div>
  )
}
