import { streamText } from 'ai'
import { createGroq } from '@ai-sdk/groq'

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

// Datos del inventario
const inventoryData = [
  { id: 1, name: 'Aceite 10W-40 Shell Advance', quantity: 45, minStock: 20, price: 89.99, cost: 50, category: 'Aceites Minerales', monthlyConsumption: 15 },
  { id: 2, name: 'Aceite 5W-30 Castrol Magnatec', quantity: 28, minStock: 15, price: 92.99, cost: 52, category: 'Aceites Sintéticos', monthlyConsumption: 12 },
  { id: 3, name: 'Fluido ATF Mobil', quantity: 8, minStock: 10, price: 45.99, cost: 25, category: 'Fluidos de Transmisión', monthlyConsumption: 8 },
  { id: 4, name: 'Refrigerante Prestone Rojo', quantity: 18, minStock: 12, price: 25.99, cost: 12, category: 'Refrigerantes', monthlyConsumption: 6 },
  { id: 5, name: 'Aceite Sintético 0W-20', quantity: 12, minStock: 15, price: 105.99, cost: 60, category: 'Aceites Sintéticos', monthlyConsumption: 5 },
  { id: 6, name: 'Filtro de Aceite Fram PH8A', quantity: 32, minStock: 20, price: 34.99, cost: 15, category: 'Filtros', monthlyConsumption: 18 },
  { id: 7, name: 'Liquido Limpiaparabrisas', quantity: 50, minStock: 25, price: 12.99, cost: 5, category: 'Líquidos', monthlyConsumption: 20 },
  { id: 8, name: 'Grasa Multipropósito NLGI 2', quantity: 15, minStock: 10, price: 22.50, cost: 10, category: 'Grasas', monthlyConsumption: 4 },
  { id: 9, name: 'Aceite Motor 15W-40 Diesel', quantity: 3, minStock: 10, price: 78.99, cost: 45, category: 'Aceites Minerales', monthlyConsumption: 10 },
  { id: 10, name: 'Fluido Hidráulico ISO 46', quantity: 5, minStock: 15, price: 55.99, cost: 30, category: 'Fluidos de Transmisión', monthlyConsumption: 7 },
]

function getInventorySummary(): string {
  const total = inventoryData.reduce((s, p) => s + (p.price * p.quantity), 0)
  const critical = inventoryData.filter(p => p.quantity < p.minStock)
  const inventory = inventoryData
    .map(p => {
      const daysLeft = Math.ceil((p.quantity / p.monthlyConsumption) * 30)
      return `${p.name}: ${p.quantity} unidades (min: ${p.minStock}, ${daysLeft} días)`
    })
    .join('\n')

  return `INVENTARIO AD CAR DAVILA:
Valor total: S/ ${total.toFixed(2)}
Críticos: ${critical.length}
${inventory}`
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    console.log('[CRICIA] Recibido:', messages[messages.length - 1]?.content)

    const systemPrompt = `Eres CRICIA, agente IA experto en inventario para AD CAR DAVILA.

${getInventorySummary()}

Habla como un profesional real: natural, directo, con datos concretos. Entiende intención, anticipa necesidades. Sé empático pero accionable.`

    const result = await streamText({
      model: groq('llama-3.1-70b-versatile'),
      system: systemPrompt,
      messages: messages as any,
      maxTokens: 1000,
    })

    // Convertir a ReadableStream con formato SSE
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.textStream) {
            const data = JSON.stringify({ type: 'text-delta', delta: chunk })
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          }
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
          controller.close()
        } catch (error) {
          console.error('[CRICIA Error]:', error)
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('[CRICIA API Error]:', error)
    return new Response('Error', { status: 500 })
  }
}
