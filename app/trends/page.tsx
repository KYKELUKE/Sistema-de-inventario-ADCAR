'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'
import { Send, Loader, Sparkles, Zap, TrendingUp, AlertCircle, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface QuickQuestion {
  title: string
  question: string
  icon: React.ReactNode
  color: string
}

interface NewsSlide {
  id: string
  title: string
  icon: React.ReactNode
  action: string
  description: string
  color: string
}

export default function AIAgentPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sliderIndex, setSliderIndex] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const newsSlides: NewsSlide[] = [
    {
      id: 'inventario-total',
      title: '📊 Estado General',
      icon: <BarChart3 className="w-6 h-6" />,
      action: '¿Cuál es el estado actual de mi inventario? Dame un resumen detallado.',
      description: 'Resumen completo del inventario',
      color: 'from-red-600 to-red-500'
    },
    {
      id: 'stock-bajo',
      title: '⚠️ Alertas Críticas',
      icon: <AlertCircle className="w-6 h-6" />,
      action: '¿Qué productos están en stock bajo y necesitan reorden?',
      description: 'Productos que requieren atención',
      color: 'from-orange-600 to-orange-500'
    },
    {
      id: 'tendencias',
      title: '📈 Tendencias',
      icon: <TrendingUp className="w-6 h-6" />,
      action: '¿Cuáles son mis productos más vendidos y menos vendidos?',
      description: 'Análisis de rotación',
      color: 'from-green-600 to-green-500'
    },
    {
      id: 'valor-inventario',
      title: '💰 Análisis Financiero',
      icon: <Zap className="w-6 h-6" />,
      action: '¿Cuál es el valor total de mi inventario por categoría?',
      description: 'Inversión y distribución',
      color: 'from-blue-600 to-blue-500'
    },
    {
      id: 'recomendaciones',
      title: '🎯 Recomendaciones',
      icon: <Sparkles className="w-6 h-6" />,
      action: '¿Qué recomendaciones tienes para optimizar mi inventario?',
      description: 'Estrategias de mejora',
      color: 'from-purple-600 to-purple-500'
    },
  ]

  const handleNextSlide = () => {
    setSliderIndex((prev) => (prev + 1) % newsSlides.length)
  }

  const handlePrevSlide = () => {
    setSliderIndex((prev) => (prev - 1 + newsSlides.length) % newsSlides.length)
  }

  const handleSlideAction = (action: string) => {
    setInput(action)
    setTimeout(() => {
      const form = document.querySelector('form')
      if (form) form.dispatchEvent(new Event('submit', { bubbles: true }))
    }, 100)
  }

  const quickQuestions: QuickQuestion[] = [
    { 
      title: 'Compatibilidad Vehicular', 
      question: '¿Qué aceite y filtros necesita un Toyota Camry 2020? Dame especificaciones exactas y disponibilidad.',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'bg-red-50 border-red-200 hover:bg-red-100'
    },
    { 
      title: 'Stock Crítico', 
      question: '¿Qué productos están en stock crítico? ¿Cuáles debo reabastecer primero según la demanda?',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    { 
      title: 'Asesoría Técnica', 
      question: 'Un cliente tiene un Ford F-150 diesel 6.7L. ¿Qué mantenimiento requiere y qué productos necesita?',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    { 
      title: 'Equivalencias', 
      question: '¿Qué aceites y filtros equivalentes tenemos? Dame alternativas a marcas costosas.',
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let assistantMessage = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim()
            if (data && data !== '[DONE]') {
              try {
                const json = JSON.parse(data)
                if (json.type === 'text-delta' && json.delta) {
                  assistantMessage += json.delta
                  setMessages(prev => {
                    const newMessages = [...prev]
                    if (newMessages[newMessages.length - 1]?.role === 'assistant') {
                      newMessages[newMessages.length - 1].content = assistantMessage
                    } else {
                      newMessages.push({ role: 'assistant', content: assistantMessage })
                    }
                    return newMessages
                  })
                }
              } catch {
                // Parse error, skip
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, ocurrió un error al procesar tu consulta.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    setTimeout(() => {
      const form = document.querySelector('form')
      if (form) form.dispatchEvent(new Event('submit', { bubbles: true }))
    }, 100)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      </div>

      <main
        className={cn(
          'flex-1 p-4 md:p-5 lg:p-6 transition-all duration-300 flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50',
          isCollapsed ? 'lg:ml-16' : 'lg:ml-60',
        )}
      >
        <div className="flex-1 mt-2 flex flex-col gap-6">
          {/* CRICIA Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-8 text-white shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">CRICIA</h1>
                  <p className="text-red-100 text-sm mt-1">Agente IA de Gestión Inteligente</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-red-100 text-xs uppercase tracking-widest font-semibold">Estado</p>
                <p className="text-white text-lg font-bold mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  Activo
                </p>
              </div>
            </div>
            <p className="text-red-50 text-sm mt-4 max-w-2xl">
              Experta en autopartes, lubricantes y mantenimiento vehicular. Asesoro sobre compatibilidad de productos con cualquier marca/modelo/año de vehículo. Ayudo a mecánicos a encontrar las piezas correctas y recomiendo estrategias de mantenimiento.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border-l-4 border-red-600 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-600 uppercase font-semibold">Consultas Procesadas</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{messages.filter(m => m.role === 'user').length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-orange-600 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-600 uppercase font-semibold">Análisis Realizados</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{messages.filter(m => m.role === 'assistant').length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-green-600 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-600 uppercase font-semibold">Estado de Conexión</p>
              <p className="text-lg font-bold text-green-600 mt-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Conectado
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-blue-600 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-600 uppercase font-semibold">Versión</p>
              <p className="text-xl font-bold text-blue-600 mt-2">1.0 PRO</p>
            </div>
          </div>

          {/* Consultas Rápidas Slider */}
          <div className="relative">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-600" />
                Consultas Inteligentes Rápidas
              </h3>
              <p className="text-xs text-gray-500 mt-1">Desliza o haz clic para consultar instantáneamente</p>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl">
              <div 
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
              >
                {newsSlides.map((slide) => (
                  <div
                    key={slide.id}
                    className="w-full flex-shrink-0 p-6 rounded-2xl bg-gradient-to-r animate-in fade-in slide-in-from-right-4 duration-300"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgb(var(--color-start)), rgb(var(--color-end)))`
                    }}
                  >
                    <style>{`
                      [data-slide-id="${slide.id}"] {
                        --color-start: ${slide.color === 'from-red-600 to-red-500' ? '239, 68, 68' : slide.color === 'from-orange-600 to-orange-500' ? '234, 88, 12' : slide.color === 'from-green-600 to-green-500' ? '22, 163, 74' : slide.color === 'from-blue-600 to-blue-500' ? '37, 99, 235' : '147, 51, 234'};
                        --color-end: ${slide.color === 'from-red-600 to-red-500' ? '220, 38, 38' : slide.color === 'from-orange-600 to-orange-500' ? '194, 65, 12' : slide.color === 'from-green-600 to-green-500' ? '16, 185, 129' : slide.color === 'from-blue-600 to-blue-500' ? '59, 130, 246' : '168, 85, 247'};
                      }
                    `}</style>
                    
                    <div data-slide-id={slide.id} className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-white mt-1">
                          {slide.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{slide.title}</h3>
                          <p className="text-white/80 text-sm mb-3">{slide.description}</p>
                          <button
                            onClick={() => handleSlideAction(slide.action)}
                            disabled={isLoading}
                            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 backdrop-blur-sm border border-white/30 disabled:opacity-50"
                          >
                            {isLoading ? 'Procesando...' : 'Consultar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-200 z-10 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-200 z-10 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Slider Indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {newsSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSliderIndex(idx)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      idx === sliderIndex 
                        ? 'w-8 bg-white' 
                        : 'w-2 bg-white/40 hover:bg-white/60'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area - CRICIA */}
          <Card className="flex-1 p-6 flex flex-col gap-4 bg-white shadow-2xl border-0 rounded-3xl overflow-hidden relative">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-50 rounded-full -mr-40 -mt-40 opacity-30 pointer-events-none"></div>
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[calc(100vh-550px)] px-2 relative z-10">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="text-center">
                    <div className="inline-block p-4 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl animate-bounce mb-4">
                      <Sparkles className="w-10 h-10 text-red-600" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Bienvenido a CRICIA</h2>
                    <p className="text-sm text-red-600 font-semibold uppercase tracking-wider mb-4">Tu Agente IA Inteligente</p>
                  </div>
                  
                  <div className="max-w-lg text-center">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Soy CRICIA, tu agente IA especializado en gestión inteligente de inventario. Realizo análisis predictivos, detecto anomalías, optimizo capital y genero recomendaciones estratégicas basadas en datos reales.
                    </p>
                    <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200">
                      <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-2">Mis Capacidades</p>
                      <ul className="text-xs text-gray-700 space-y-1 text-left">
                        <li>✓ Análisis predictivo de inventario</li>
                        <li>✓ Detección de anomalías y riesgos</li>
                        <li>✓ Optimización de capital invertido</li>
                        <li>✓ Recomendaciones estratégicas</li>
                      </ul>
                    </div>
                  </div>

                  {/* Quick Question Buttons */}
                  <div className="w-full max-w-2xl space-y-3">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide text-center">Preguntas Rápidas</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {quickQuestions.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickQuestion(item.question)}
                          className={cn(
                            'p-4 text-left border rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 transform',
                            item.color
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-red-600 mt-1">
                              {item.icon}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                              <p className="text-xs text-gray-600 mt-1 leading-tight">{item.question}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500',
                      message.role === 'user' ? 'justify-end' : 'justify-start',
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="w-4 h-4 text-red-600" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-2xl px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg',
                        message.role === 'user'
                          ? 'bg-red-600 text-white rounded-br-none shadow-md hover:bg-red-700'
                          : 'bg-gray-100 text-gray-900 rounded-bl-none shadow-sm hover:bg-gray-200',
                      )}
                    >
                      <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex gap-3 animate-in fade-in duration-300">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Loader className="w-4 h-4 text-red-600 animate-spin" />
                  </div>
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2 shadow-sm border border-red-200">
                    <span className="inline-block">
                      <span className="animate-bounce inline-block">.</span>
                      <span className="animate-bounce inline-block" style={{ animationDelay: '0.2s' }}>.</span>
                      <span className="animate-bounce inline-block" style={{ animationDelay: '0.4s' }}>.</span>
                    </span>
                    <span className="text-sm font-medium">Analizando tu inventario</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-gray-200 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregunta a CRICIA sobre tu inventario..."
                className="flex-1 bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-red-600 focus:ring-red-600 rounded-xl focus:ring-2 transition-all duration-300"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </Card>

          {/* Info Cards - Tips & Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 bg-gradient-to-br from-red-50 to-red-100 border-red-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-red-300">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-200 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-red-700" />
                </div>
                <div>
                  <h3 className="font-bold text-red-900 mb-2">Tipos de Análisis</h3>
                  <p className="text-sm text-red-800 leading-relaxed">
                    Predicciones futuras, anomalías ocultas, optimización de capital, alertas inteligentes y análisis comparativo.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-200 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">Ejemplo de Consultas</h3>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    "¿Cuántos días de stock me quedan?", "¿Hay anomalías?", "¿Cómo optimizo mi dinero?"
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
