import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/auth/login')
  }

  return (
    <div className="flex min-h-svh w-full flex-col">
      <div className="flex items-center justify-between border-b border-border bg-background p-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Bienvenido, {user.email}</p>
        </div>
        <form action={async () => {
          'use server'
          const supabase = await createClient()
          await supabase.auth.signOut()
          redirect('/auth/login')
        }}>
          <Button type="submit" variant="outline">
            Sign Out
          </Button>
        </form>
      </div>

      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Total de Productos</h3>
            <p className="text-2xl font-bold text-foreground">1,245</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Stock Disponible</h3>
            <p className="text-2xl font-bold text-foreground">S/ 52.4K</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Stock Bajo</h3>
            <p className="text-2xl font-bold text-red-600">5</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Rotación Promedio</h3>
            <p className="text-2xl font-bold text-foreground">8.2x</p>
          </div>
        </div>

        <Link href="/">
          <Button className="bg-amber-600 hover:bg-amber-700">
            Ir al Dashboard Principal
          </Button>
        </Link>
      </div>
    </div>
  )
}
