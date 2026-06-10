"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, AlertTriangle, CheckCircle } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const movements = [
  { id: 1, product: "Aceite 10W-40 Shell", type: "Entrada", quantity: 50, date: "2024-01-29", reference: "PO-0145", supplier: "Shell Lubricants" },
  { id: 2, product: "Filtro de Aceite Fram", type: "Salida", quantity: 12, date: "2024-01-28", reference: "ORD-001245", supplier: "Venta Directa" },
  { id: 3, product: "Fluido ATF Mobil", type: "Ajuste", quantity: -5, date: "2024-01-27", reference: "ADJ-001", supplier: "Control Calidad" },
  { id: 4, product: "Aceite 5W-30 Castrol", type: "Entrada", quantity: 100, date: "2024-01-26", reference: "PO-0144", supplier: "Castrol South America" },
  { id: 5, product: "Refrigerante Prestone", type: "Salida", quantity: 30, date: "2024-01-25", reference: "ORD-001244", supplier: "Venta Directa" },
]

export default function StockManagementPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)

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
          title="Control de Stock"
          description="Registra y monitorea los movimientos de tu inventario en tiempo real."
          actions={
            <>
              <Button className="w-full sm:w-auto h-9 px-4 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Movimiento
              </Button>
            </>
          }
        />

        <div className="mt-6 space-y-4">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Entradas Hoy</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Salidas Hoy</p>
              <p className="text-2xl font-bold text-foreground">2</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Discrepancias</p>
              <p className="text-2xl font-bold text-destructive">1</p>
            </Card>
          </div>

          {/* Movements Table */}
          <Card className="p-6 transition-all duration-500 hover:shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Producto</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Tipo</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Cantidad</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Fecha</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Referencia</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.map((movement) => (
                    <tr key={movement.id} className="border-b border-border hover:bg-secondary transition-colors">
                      <td className="py-3 px-4 text-foreground">{movement.product}</td>
                      <td className="py-3 px-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          movement.type === "Entrada"
                            ? "bg-green-100 text-green-700"
                            : movement.type === "Salida"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        )}>
                          {movement.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-foreground">
                        {movement.quantity > 0 ? "+" : ""}{movement.quantity}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{movement.date}</td>
                      <td className="py-3 px-4 text-muted-foreground">{movement.reference}</td>
                      <td className="py-3 px-4">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
