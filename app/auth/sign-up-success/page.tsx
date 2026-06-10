import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="border-green-900/50 bg-green-950/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <CardTitle className="text-2xl text-green-400">
                  ¡Registro Exitoso!
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-300">
                Tu cuenta ha sido creada correctamente. Por favor verifica tu correo electrónico para confirmar tu cuenta.
              </p>
              <p className="text-xs text-slate-400">
                Una vez confirmado tu correo, podrás acceder a tu panel de control de inventario.
              </p>
              <Link href="/auth/login">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Ir a Iniciar Sesión
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
