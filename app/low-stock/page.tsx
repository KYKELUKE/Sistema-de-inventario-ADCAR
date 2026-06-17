"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
<<<<<<< HEAD
import { AlertCircle, ShoppingCart, Download, FileText } from "lucide-react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { exportLowStockToExcel, exportLowStockToPDF } from "@/lib/low-stock-export"
=======
import { AlertCircle, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822

const lowStockItems = [
  { id: 1, name: 'Aceite 5W-40 Shell', current: 2, minimum: 30, sku: 'OIL-001', category: 'Aceites', supplier: 'Shell Lubricants' },
  { id: 2, name: 'Filtro de Aceite Fram', current: 5, minimum: 25, sku: 'FIL-001', category: 'Filtros', supplier: 'Fram Corporation' },
  { id: 3, name: 'Fluido Transmisión ATF', current: 8, minimum: 20, sku: 'FLU-001', category: 'Fluidos', supplier: 'Mobil' },
  { id: 4, name: 'Refrigerante Anticongelante', current: 12, minimum: 40, sku: 'REF-001', category: 'Refrigerantes', supplier: 'Prestone' },
  { id: 5, name: 'Aceite 10W-30 Castrol', current: 15, minimum: 50, sku: 'OIL-002', category: 'Aceites', supplier: 'Castrol' },
]

export default function LowStockPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
<<<<<<< HEAD
  const [isExporting, setIsExporting] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleExportExcel = async () => {
    setIsExporting(true)
    try {
      await exportLowStockToExcel(lowStockItems)
    } catch (error) {
      console.error('Error al exportar Excel:', error)
      alert('Error al exportar Excel')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      if (contentRef.current) {
        await exportLowStockToPDF(contentRef.current)
      }
    } catch (error) {
      console.error('Error al exportar PDF:', error)
      alert('Error al exportar PDF')
    } finally {
      setIsExporting(false)
    }
  }
=======
>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822

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
          title="Alertas de Stock Bajo"
          description="Productos que requieren reorden inmediato. Contacta a tus proveedores para reabastecer."
          actions={
<<<<<<< HEAD
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
              <Button className="h-9 px-4 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Crear Orden Proveedor
              </Button>
            </div>
          }
        />

        <div ref={contentRef} className="mt-8 space-y-4">
=======
            <Button className="h-9 px-4 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Crear Orden Proveedor
            </Button>
          }
        />

        <div className="mt-8 space-y-4">
>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822
          {lowStockItems.map((item) => {
            const percentage = (item.current / item.minimum) * 100
            const isVeryLow = item.current <= 5
            const isCritical = item.current <= 10

            return (
              <Card
                key={item.id}
                className={cn(
                  'border-0 shadow-sm hover:shadow-md transition-all',
                  isCritical && 'border-l-4 border-l-destructive bg-destructive/5',
                  !isCritical && 'border-l-4 border-l-warning bg-warning/5',
                )}
              >
                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={cn(
                          'p-2 rounded-lg flex-shrink-0',
                          isVeryLow ? 'bg-destructive/10' : 'bg-warning/10',
                        )}
                      >
                        <AlertCircle
                          className={cn('w-5 h-5', isVeryLow ? 'text-destructive' : 'text-warning')}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-base">{item.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">SKU: {item.sku}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{item.category}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">Proveedor: {item.supplier}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className={cn(
                        'h-8 px-3 text-xs font-medium rounded-lg flex-shrink-0',
                        isVeryLow
                          ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
                      )}
                    >
                      Reabastecer
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4">
                    <div className="p-3 bg-muted/40 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Stock Actual</p>
                      <p className={cn('text-xl font-bold', isVeryLow ? 'text-destructive' : 'text-foreground')}>
                        {item.current}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/40 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Mínimo Requerido</p>
                      <p className="text-xl font-bold text-foreground">{item.minimum}</p>
                    </div>
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">A Reabastecer</p>
                      <p className="text-xl font-bold text-secondary">{item.minimum - item.current}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-muted-foreground">Nivel de Stock</span>
                      <span className="text-xs font-semibold text-muted-foreground">{Math.round(percentage)}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-300',
                          isVeryLow ? 'bg-destructive' : 'bg-warning',
                        )}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
