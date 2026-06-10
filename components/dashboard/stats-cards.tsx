"use client"

import { Card } from "@/components/ui/card"

const stats = [
  {
    title: "Total Productos",
    value: "1,245",
    subtitle: "+12 este mes",
  },
  {
    title: "Stock Disponible",
    value: "$52.4K",
    subtitle: "Valor en inventario",
  },
  {
    title: "Stock Bajo",
    value: "5",
    subtitle: "Requieren reorden",
  },
  {
    title: "Rotación Promedio",
    value: "8.2x",
    subtitle: "Por año",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border border-border p-4 rounded-lg">
          <h3 className="text-xs text-muted-foreground font-medium mb-3">{stat.title}</h3>
          <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
        </Card>
      ))}
    </div>
  )
}
