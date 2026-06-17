"use client"

import {
  LayoutDashboard,
  Package,
  AlertCircle,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  TrendingUp,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, createContext, useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

// Create context for sidebar collapse state
const SidebarContext = createContext<{
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}>({
  isCollapsed: false,
  setIsCollapsed: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

const menuItems = [
  { icon: LayoutDashboard, label: "Inicio", href: "/" },
  { icon: Package, label: "Productos", href: "/products" },
  { icon: ShoppingCart, label: "Órdenes/Ventas", href: "/orders" },
  { icon: AlertCircle, label: "Stock Bajo", badge: "3", href: "/low-stock" },
]

const managementItems = [
  { icon: BarChart3, label: "Reportes", href: "/reports" },
  { icon: RefreshCw, label: "Gestión de Stock", href: "/stock-management" },
  { icon: TrendingUp, label: "Tendencias", href: "/trends" },
  { icon: Users, label: "Proveedores", href: "/suppliers" },
]

const aiItems = [
  // AI tools items can be added here
]

const generalItems = [
  { icon: Settings, label: "Configuración", href: "/settings" },
  { icon: HelpCircle, label: "Ayuda", href: "/help" },
  { icon: LogOut, label: "Cerrar Sesión", href: "/logout" },
]

export function Sidebar({ isCollapsed = false, onToggle }: { isCollapsed?: boolean; onToggle?: () => void } = {}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto lg:block transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-60",
      )}
    >
      <div className={cn("p-4", isCollapsed && "px-2")}>
        <div className={cn("mb-6 flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
          {!isCollapsed && (
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-sidebar-primary-foreground" />
                </div>
                <div>
                  <span className="text-base font-bold text-sidebar-foreground">LubrOil</span>
                  <p className="text-[10px] text-muted-foreground">Lubricentro</p>
                </div>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Package className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
          )}
          {onToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className={cn(
                "h-7 w-7 rounded-lg hover:bg-sidebar-accent",
                isCollapsed && "hidden",
              )}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            {!isCollapsed && (
              <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wide px-2">
                PRINCIPAL
              </p>
            )}
            <nav className="space-y-0.5">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-normal transition-colors",
                      isActive
                        ? "bg-secondary text-secondary-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isCollapsed && "justify-center",
                    )}
                  >
                    <item.icon className={cn("w-4 h-4 flex-shrink-0", isCollapsed && "w-5 h-5")} />
                    {!isCollapsed && (
                      <>
                        <span className="text-sm flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-destructive text-destructive-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div>
            {!isCollapsed && (
              <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wide px-2">
                OPERACIONES
              </p>
            )}
            <nav className="space-y-0.5">
              {managementItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-normal transition-colors",
                      isActive
                        ? "bg-secondary text-secondary-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isCollapsed && "justify-center",
                    )}
                  >
                    <item.icon className={cn("w-4 h-4 flex-shrink-0", isCollapsed && "w-5 h-5")} />
                    {!isCollapsed && (
                      <>
                        <span className="text-sm flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-muted text-muted-foreground text-[10px] font-medium px-1.5 py-0.5 rounded">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div>
            {!isCollapsed && (
              <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wide px-2">
                GENERAL
              </p>
            )}
            <nav className="space-y-0.5">
              {generalItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-normal transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                      isCollapsed && "justify-center",
                    )}
                  >
                    <item.icon className={cn("w-4 h-4", isCollapsed && "w-4.5 h-4.5")} />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  )
}
