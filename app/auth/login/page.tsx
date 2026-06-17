'use client'

import React from "react"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Dummy auth - redirects to dashboard
      if (!email || !password) {
        throw new Error('Por favor ingresa email y contraseña')
      }
      // Simple validation
      if (!email.includes('@')) {
        throw new Error('Por favor ingresa un email válido')
      }
      router.push('/')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/logo-adcar.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="w-full max-w-sm relative z-10">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <Image
              src="/logo-adcar.png"
              alt="AD CAR DAVILA"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>

          {/* Login Card */}
          <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardHeader className="border-b border-red-200 pb-6">
              <CardTitle className="text-3xl font-bold text-gray-900">Inicia Sesión</CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                Accede a tu cuenta de gestión
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-gray-700 font-semibold">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@empresa.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-gray-700 font-semibold">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                      {error}
                    </p>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-10 rounded-lg transition-colors" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </Button>
                </div>
                <div className="mt-6 text-center text-sm text-gray-600 border-t border-gray-200 pt-6">
                  ¿No tienes cuenta?{' '}
                  <Link
                    href="/auth/sign-up"
                    className="text-red-600 font-semibold underline underline-offset-4 hover:text-red-700 transition-colors"
                  >
                    Regístrate aquí
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-white/80">
            <p>AD CAR DAVILA - Sistema de Gestión Integral</p>
          </div>
        </div>
      </div>
    </div>
  )
}
