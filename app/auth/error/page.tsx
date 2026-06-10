import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="border-red-900/50 bg-red-950/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <CardTitle className="text-2xl text-red-400">
                  Error de Autenticación
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {params?.error ? (
                <p className="text-sm text-slate-300">
                  <strong>Código de error:</strong> {params.error}
                </p>
              ) : (
                <p className="text-sm text-slate-300">
                  Ocurrió un error no especificado durante la autenticación.
                </p>
              )}
              <Link href="/auth/login">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Volver al Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
