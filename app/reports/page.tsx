'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
<<<<<<< HEAD
import { BarChart3, Package, ShoppingCart, AlertCircle, Calendar, TrendingUp, DollarSign, Download, FileText } from 'lucide-react'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { exportToExcel, exportToPDF } from '@/lib/report-generators'
=======
import { BarChart3, Package, ShoppingCart, AlertCircle, Calendar, TrendingUp, DollarSign } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822

const weeklySalesData = [
  { day: 'Lunes', ventas: 2450, pedidos: 18, aceites: 1200, refrigerantes: 850, filtros: 400 },
  { day: 'Martes', ventas: 2890, pedidos: 22, aceites: 1450, refrigerantes: 920, filtros: 520 },
  { day: 'Miércoles', ventas: 2120, pedidos: 15, aceites: 1050, refrigerantes: 680, filtros: 390 },
  { day: 'Jueves', ventas: 3150, pedidos: 25, aceites: 1680, refrigerantes: 1000, filtros: 470 },
  { day: 'Viernes', ventas: 3890, pedidos: 32, aceites: 2100, refrigerantes: 1200, filtros: 590 },
  { day: 'Sábado', ventas: 4520, pedidos: 38, aceites: 2400, refrigerantes: 1450, filtros: 670 },
  { day: 'Domingo', ventas: 2780, pedidos: 20, aceites: 1450, refrigerantes: 900, filtros: 430 },
]

<<<<<<< HEAD
const reportMetrics = {
  totalIngresos: 45230,
  totalPedidos: 156,
  ticketPromedio: 289.81,
  crecimiento: 18.5,
}

export default function ReportsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [reportType, setReportType] = useState('monthly')
  const [isExporting, setIsExporting] = useState(false)
  const router = useRouter()
  const reportRef = useRef<HTMLDivElement>(null)

  const handleExportExcel = async () => {
    setIsExporting(true)
    try {
      await exportToExcel()
    } catch (error) {
      console.error('Error exportando Excel:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      if (reportRef.current) {
        await exportToPDF(reportRef.current)
      }
    } catch (error) {
      console.error('Error exportando PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }
=======
export default function ReportsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [reportType, setReportType] = useState('monthly')
  const router = useRouter()
>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822

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
          title="Reportes y Análisis"
          description="Análisis detallado de ventas, inventario y tendencias"
          actions={
            <>
              <Button 
                onClick={() => router.push('/products')}
                variant="outline" 
                className="h-9 px-4 text-sm font-medium rounded-lg bg-transparent"
              >
                <Package className="w-4 h-4 mr-2" />
                Ver Productos
              </Button>
              <Button 
                onClick={() => router.push('/orders')}
                className="h-9 px-4 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Ver Órdenes
              </Button>
            </>
          }
        />

        {/* Report Period Selector */}
<<<<<<< HEAD
        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="h-9 w-full sm:w-40 text-sm rounded-lg">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Hoy</SelectItem>
                <SelectItem value="weekly">Esta Semana</SelectItem>
                <SelectItem value="monthly">Este Mes</SelectItem>
                <SelectItem value="quarterly">Este Trimestre</SelectItem>
                <SelectItem value="yearly">Este Año</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="h-9 px-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Ene 1 - Ene 31, 2024
            </Badge>
          </div>
          
          {/* Export Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleExportExcel}
              disabled={isExporting}
              className="h-9 px-4 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              {isExporting ? 'Exportando...' : 'Excel'}
            </Button>
            <Button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="h-9 px-4 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exportando...' : 'PDF'}
            </Button>
          </div>
        </div>

        {/* Report Content - Wrapper for PDF Export */}
        <div ref={reportRef} className="mt-8 bg-white p-6 rounded-lg">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
=======
        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="h-9 w-full sm:w-40 text-sm rounded-lg">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Hoy</SelectItem>
              <SelectItem value="weekly">Esta Semana</SelectItem>
              <SelectItem value="monthly">Este Mes</SelectItem>
              <SelectItem value="quarterly">Este Trimestre</SelectItem>
              <SelectItem value="yearly">Este Año</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="h-9 px-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Ene 1 - Ene 31, 2024
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-secondary">S/ 45,230</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-xs font-medium text-success">+18.5% vs mes anterior</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Órdenes Completadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-primary">156</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-xs font-medium text-success">+12 más que la semana anterior</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rotación Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-accent">8.3x</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Rotación mensual de inventario</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ventas por Categoría */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Ventas por Categoría</CardTitle>
              <CardDescription>Distribución de ingresos por tipo de producto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Aceites', value: 'S/ 18,450', percentage: 40 },
                  { name: 'Filtros', value: 'S/ 12,340', percentage: 27 },
                  { name: 'Fluidos', value: 'S/ 10,580', percentage: 23 },
                  { name: 'Otros', value: 'S/ 3,860', percentage: 10 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <span className="text-sm font-semibold text-secondary">{item.value}</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div
                        className="h-full rounded-full bg-secondary transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Productos */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Productos Top 5</CardTitle>
              <CardDescription>Productos más vendidos este mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Aceite 10W-40 Shell', sales: 245, revenue: 'S/ 4,410' },
                  { name: 'Filtro Fram HP', sales: 189, revenue: 'S/ 2,835' },
                  { name: 'ATF Mobil', sales: 156, revenue: 'S/ 2,808' },
                  { name: 'Aceite 5W-30 Castrol', sales: 134, revenue: 'S/ 2,412' },
                  { name: 'Refrigerante Prestone', sales: 98, revenue: 'S/ 1,176' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-muted/20 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.sales} unidades</p>
                    </div>
                    <p className="text-sm font-semibold text-secondary">{item.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Health */}
        <Card className="mt-6 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Salud del Inventario</CardTitle>
            <CardDescription>Métricas clave de stock y rotación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Stock Óptimo', value: '85%', color: 'text-success' },
                { label: 'Stock Bajo', value: '12%', color: 'text-warning' },
                { label: 'Stock Crítico', value: '3%', color: 'text-destructive' },
                { label: 'Movimiento Promedio', value: '24.5 días', color: 'text-accent' },
              ].map((item) => (
                <div key={item.label} className="p-4 bg-muted/20 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className={cn('text-2xl font-bold', item.color)}>{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gráfico - Ventas Semanales */}
        <Card className="mt-6 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Ventas Semanales</CardTitle>
            <CardDescription>Ingresos y pedidos de los últimos 7 días</CardDescription>
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
                <Tooltip 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  formatter={(value) => {
                    if (typeof value === 'number') {
                      return `$${value.toLocaleString()}`
                    }
                    return value
                  }}
                />
                <Legend />
                <Bar dataKey="ventas" fill="#f97316" name="Ventas ($)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="pedidos" fill="#06b6d4" name="Pedidos" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Desglose de Ventas por Categoría Semanal */}
        <Card className="mt-6 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Desglose de Categorías Semanales</CardTitle>
            <CardDescription>Tendencia de ventas por tipo de producto</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart
                data={weeklySalesData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  cursor={{ stroke: '#06b6d4', strokeWidth: 2 }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="aceites" 
                  stroke="#f97316" 
                  name="Aceites" 
                  strokeWidth={3}
                  dot={{ fill: '#f97316', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="refrigerantes" 
                  stroke="#06b6d4" 
                  name="Refrigerantes"
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="filtros" 
                  stroke="#8b5cf6" 
                  name="Filtros"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Additional Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Rotación de Productos</h3>
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Rotación Promedio</span>
                <span className="font-semibold text-foreground">8.2x/año</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Producto Más Rotado</span>
                <span className="font-semibold text-foreground">Cable HDMI</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Producto Menos Rotado</span>
                <span className="font-semibold text-foreground">Monitor LG</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Valor del Inventario</h3>
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Valor Total</span>
                <span className="font-semibold text-foreground">S/ 52,400</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Variación (vs. mes anterior)</span>
                <span className="font-semibold text-green-600">+12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pronóstico (próximo mes)</span>
                <span className="font-semibold text-foreground">S/ 58,700</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Products by Category */}
        <Card className="p-6 transition-all duration-500 hover:shadow-xl">
          <h3 className="font-semibold text-foreground mb-6">Productos por Categoría</h3>
          <div className="space-y-4">
            {[
              { name: "Electrónica", count: 245, percentage: 45 },
              { name: "Accesorios", count: 520, percentage: 35 },
              { name: "Cables", count: 480, percentage: 20 },
            ].map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.count} productos</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
<<<<<<< HEAD
        </div>
=======
>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822
      </main>
    </div>
  )
}
