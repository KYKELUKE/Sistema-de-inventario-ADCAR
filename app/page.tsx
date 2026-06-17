'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  BarChart3,
  DollarSign,
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const weeklySalesData = [
  { day: 'Lunes', ventas: 2450, pedidos: 18 },
  { day: 'Martes', ventas: 2890, pedidos: 22 },
  { day: 'Miércoles', ventas: 2120, pedidos: 15 },
  { day: 'Jueves', ventas: 3150, pedidos: 25 },
  { day: 'Viernes', ventas: 3890, pedidos: 32 },
  { day: 'Sábado', ventas: 4520, pedidos: 38 },
  { day: 'Domingo', ventas: 2780, pedidos: 20 },
]

export default function DashboardPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const stats = [
    {
      title: 'Stock Total',
      value: '2,458',
      description: 'Productos en inventario',
      icon: ShoppingCart,
      trend: '+2.5%',
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      title: 'Ventas Hoy',
      value: 'S/ 3,245',
      description: 'Últimas 24 horas',
      icon: DollarSign,
      trend: '+12.4%',
      color: 'bg-green-500/10 text-green-600',
    },
    {
      title: 'Stock Bajo',
      value: '23',
      description: 'Productos por reabastecer',
      icon: AlertTriangle,
      trend: '-3 desde ayer',
      color: 'bg-red-500/10 text-red-600',
    },
    {
      title: 'Órdenes Pendientes',
      value: '14',
      description: 'Por procesar',
      icon: TrendingUp,
      trend: '+5',
      color: 'bg-orange-500/10 text-orange-600',
    },
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
          title="Dashboard Lubricentro"
          description="Control centralizado de inventario, ventas y operaciones"
          userEmail="usuario@lubricentro.com"
          actions={
            <Button className="h-9 px-4 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg">
              + Nuevo Producto
            </Button>
          }
        />

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={cn('p-2 rounded-lg', stat.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                      <span className="text-xs font-semibold text-success">{stat.trend}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ventas Semanales */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Ventas Semanales</CardTitle>
                <CardDescription>Ingresos diarios de los últimos 7 días</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart
                    data={weeklySalesData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
                    <Legend />
                    <Bar dataKey="ventas" fill="#f97316" name="Ventas ($)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="pedidos" fill="#06b6d4" name="Pedidos" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Productos Más Vendidos */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Productos Más Vendidos</CardTitle>
                <CardDescription>Top 5 productos del mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Aceite 10W-40 Shell', sales: 145, revenue: 'S/ 2,610' },
                    { name: 'Filtro de Aceite Fram', sales: 98, revenue: 'S/ 1,470' },
                    { name: 'Fluido ATF Mobil', sales: 87, revenue: 'S/ 1,566' },
                    { name: 'Aceite 5W-30 Castrol', sales: 76, revenue: 'S/ 1,292' },
                    { name: 'Refrigerante Prestone', sales: 62, revenue: 'S/ 744' },
                  ].map((product, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sales} ventas</p>
                      </div>
                      <p className="text-sm font-semibold text-secondary">{product.revenue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Alertas Importantes */}
            <Card className="border-0 shadow-sm border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Alertas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 bg-destructive/10 rounded text-sm text-destructive font-medium">
                  Stock crítico: Aceite 5W-40 (2 unidades)
                </div>
                <div className="p-2 bg-warning/10 rounded text-sm text-warning font-medium">
                  Vencimiento próximo: Anticongelante (7 días)
                </div>
                <div className="p-2 bg-warning/10 rounded text-sm text-warning font-medium">
                  Orden pendiente de proveedor: 45 unidades
                </div>
              </CardContent>
            </Card>

            {/* Actividad Reciente */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'Venta registrada', detail: 'Orden #1245', time: 'hace 12 min' },
                    { action: 'Stock actualizado', detail: 'Aceite 10W-40', time: 'hace 45 min' },
                    { action: 'Nueva orden', detail: 'Proveedor Shell', time: 'hace 2 horas' },
                    { action: 'Inventario verificado', detail: 'Sección A', time: 'hace 5 horas' },
                  ].map((item, idx) => (
                    <div key={idx} className="pb-3 border-b border-border last:border-0 last:pb-0">
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full h-9 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg text-sm">
                  Registrar Venta
                </Button>
                <Button variant="outline" className="w-full h-9 rounded-lg text-sm bg-transparent">
                  Crear Orden Proveedor
                </Button>
                <Button variant="outline" className="w-full h-9 rounded-lg text-sm bg-transparent">
                  Ver Reportes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
