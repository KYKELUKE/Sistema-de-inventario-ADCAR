'use client'

import { Search, Mail, Bell, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MobileNav } from './mobile-nav'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

interface HeaderProps {
  title: string
  description: string
  actions?: ReactNode
  userEmail?: string
}

export function Header({ title, description, actions, userEmail }: HeaderProps) {
  const router = useRouter()
  
  const handleLogout = () => {
    router.push('/auth/login')
  }

  const userInitials = userEmail
    ? userEmail.split('@')[0].substring(0, 2).toUpperCase()
    : 'LH'

  return (
    <header className="space-y-4 pb-2">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <MobileNav />

          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Buscar productos, órdenes..."
              className="pl-9 pr-3 h-9 text-sm bg-card border-border rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg hover:bg-secondary/10"
          >
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          <div className="flex items-center gap-2 pl-2 ml-2 border-l border-border">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/profile.jpg" alt="Usuario" />
              <AvatarFallback className="text-xs bg-primary text-primary-foreground font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs hidden lg:block">
              <p className="font-semibold text-foreground">Operador</p>
              <p className="text-muted-foreground text-[10px]">{userEmail || 'usuario@lubricentro.com'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Title section */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>

        {actions && <div className="flex flex-col sm:flex-row gap-2 ml-4">{actions}</div>}
      </div>
    </header>
  )
}
