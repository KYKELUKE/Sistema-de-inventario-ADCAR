import { streamText } from 'ai'
import { createGroq } from '@ai-sdk/groq'

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

<<<<<<< HEAD
// Datos del inventario con compatibilidad vehicular
const inventoryData = [
  { id: 1, name: 'Aceite 10W-40 Shell Advance', quantity: 45, minStock: 20, price: 89.99, cost: 50, category: 'Aceites Minerales', monthlyConsumption: 15, compatible: ['Toyota', 'Honda', 'Nissan', 'Ford', 'Chevrolet'], engines: ['Gasolina 1.5L-3.0L'], viscosity: '10W-40' },
  { id: 2, name: 'Aceite 5W-30 Castrol Magnatec', quantity: 28, minStock: 15, price: 92.99, cost: 52, category: 'Aceites Sintéticos', monthlyConsumption: 12, compatible: ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Hyundai'], engines: ['Gasolina 2.0L-4.0L'], viscosity: '5W-30' },
  { id: 3, name: 'Fluido ATF Mobil', quantity: 8, minStock: 10, price: 45.99, cost: 25, category: 'Fluidos de Transmisión', monthlyConsumption: 8, compatible: ['Toyota', 'Honda', 'Mazda', 'Subaru'], transmissions: ['Automática 4-6 velocidades'], year: '2010-2023' },
  { id: 4, name: 'Refrigerante Prestone Rojo', quantity: 18, minStock: 12, price: 25.99, cost: 12, category: 'Refrigerantes', monthlyConsumption: 6, compatible: ['Ford', 'Chevrolet', 'GMC', 'Dodge'], engines: ['Gasolina 3.0L-5.7L'] },
  { id: 5, name: 'Aceite Sintético 0W-20', quantity: 12, minStock: 15, price: 105.99, cost: 60, category: 'Aceites Sintéticos', monthlyConsumption: 5, compatible: ['Toyota', 'Lexus', 'Honda', 'Acura'], engines: ['Gasolina Híbrido'], viscosity: '0W-20' },
  { id: 6, name: 'Filtro de Aceite Fram PH8A', quantity: 32, minStock: 20, price: 34.99, cost: 15, category: 'Filtros', monthlyConsumption: 18, compatible: ['Chevrolet', 'GMC', 'Pontiac'], engines: ['Gasolina 5.3L-6.0L'], fitment: '1985-2023' },
  { id: 7, name: 'Filtro de Aire K&N', quantity: 25, minStock: 10, price: 45.99, cost: 20, category: 'Filtros', monthlyConsumption: 8, compatible: ['Ford', 'Dodge', 'Jeep', 'RAM'], engines: ['Gasolina 3.6L-5.7L'], efficiency: 'Reusable' },
  { id: 8, name: 'Liquido Limpiaparabrisas', quantity: 50, minStock: 25, price: 12.99, cost: 5, category: 'Líquidos', monthlyConsumption: 20, temperature: '-20C a +50C', universal: true },
  { id: 9, name: 'Aceite Motor 15W-40 Diesel', quantity: 3, minStock: 10, price: 78.99, cost: 45, category: 'Aceites Minerales', monthlyConsumption: 10, compatible: ['Ford', 'Chevrolet', 'GMC', 'Dodge'], engines: ['Diesel 5.9L-8.3L'], viscosity: '15W-40' },
  { id: 10, name: 'Fluido Hidráulico ISO 46', quantity: 5, minStock: 15, price: 55.99, cost: 30, category: 'Fluidos de Transmisión', monthlyConsumption: 7, compatible: ['John Deere', 'Caterpillar', 'Komatsu'], equipment: 'Maquinaria Pesada' },
]

// Base de datos de equivalencias y compatibilidades
const vehicleCompatibility: Record<string, any> = {
  'Honda Civic': { years: '2016-2023', engine: 'Gasolina 1.8L-2.0L', oil: 'Aceite 10W-40 Shell Advance', filter: 'Filtro K&N', transmission: 'Fluido ATF Mobil' },
  'Toyota Camry': { years: '2015-2023', engine: 'Gasolina 2.5L', oil: 'Aceite 5W-30', filter: 'Filtro de Aceite Fram PH8A', coolant: 'Refrigerante Prestone Rojo' },
  'Ford F-150': { years: '2009-2023', engine: 'Gasolina 3.5L-5.0L / Diesel 6.7L', oil: 'Aceite 15W-40 Diesel', filter: 'Filtro de Aceite Fram PH8A', coolant: 'Refrigerante Prestone Rojo' },
  'Chevrolet Silverado': { years: '2014-2023', engine: 'Gasolina 5.3L-6.2L', oil: 'Aceite 10W-40 Shell Advance', filter: 'Filtro de Aceite Fram PH8A' },
  'BMW 328i': { years: '2012-2023', engine: 'Gasolina 2.0L Turbo', oil: 'Aceite 5W-30 Castrol Magnatec', filter: 'Filtro K&N' },
  'Mercedes-Benz C300': { years: '2015-2023', engine: 'Gasolina 2.0L-3.0L Turbo', oil: 'Aceite 5W-30 Castrol Magnatec', coolant: 'Refrigerante Premium' },
  'Nissan Altima': { years: '2013-2023', engine: 'Gasolina 2.5L-3.5L', oil: 'Aceite 10W-40 Shell Advance', transmission: 'Fluido ATF Mobil' },
  'Mazda CX-5': { years: '2017-2023', engine: 'Gasolina 2.5L', oil: 'Aceite 10W-40 Shell Advance', filter: 'Filtro K&N' },
}

=======
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

>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822
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

<<<<<<< HEAD
// Respuestas inteligentes locales para vehículos comunes
function generateLocalResponse(message: string): string {
  const msg = message.toLowerCase()
  
  // Búsqueda de compatibilidad vehicular
  for (const [vehicle, specs] of Object.entries(vehicleCompatibility)) {
    if (msg.includes(vehicle.toLowerCase())) {
      const year = msg.match(/20\d{2}/)
      return `Para un ${vehicle}${year ? ' ' + year[0] : ''}, necesitas:

**Aceite:** ${specs.oil || 'Consultar especificaciones'}
- Viscosidad: ${specs.oil === 'Aceite 10W-40 Shell Advance' ? '10W-40' : specs.oil === 'Aceite 5W-30 Castrol Magnatec' ? '5W-30' : 'Consultar'}
- Stock disponible: ${inventoryData.find(p => p.name.includes(specs.oil || ''))?.quantity || 'Verificar'} unidades

**Filtro:** ${specs.filter || 'Consultar'}
- Stock disponible: ${inventoryData.find(p => p.name.includes(specs.filter || ''))?.quantity || 'Verificar'} unidades

**Transmisión:** ${specs.transmission ? specs.transmission : 'Usar recomendación del fabricante'}
- Stock: ${specs.transmission ? (inventoryData.find(p => p.name.includes('Fluido ATF'))?.quantity || '8') : 'N/A'} unidades

Especificaciones del motor: ${specs.engine}
Años de aplicación: ${specs.years}

¿Necesitas asesoría adicional o sugerencias de alternativas?`
    }
  }
  
  // Preguntas sobre stock
  if (msg.includes('stock') || msg.includes('crítico') || msg.includes('bajo')) {
    const critical = inventoryData.filter(p => p.quantity < p.minStock)
    const baixo = inventoryData.filter(p => p.quantity < p.minStock * 1.5 && p.quantity >= p.minStock)
    
    return `**ESTADO DE STOCK ACTUAL:**

**PRODUCTOS CRÍTICOS (${critical.length}):**
${critical.map(p => `- ${p.name}: ${p.quantity}/${p.minStock} unidades`).join('\n')}

**PRODUCTOS EN NIVEL BAJO (${baixo.length}):**
${baixo.map(p => `- ${p.name}: ${p.quantity}/${p.minStock} unidades`).join('\n')}

**RECOMENDACIONES:**
1. Reabastecer urgentemente: Aceite 15W-40 Diesel (3 unidades, necesita 10)
2. Prioridad media: Fluido ATF Mobil (8 unidades, necesita 10)
3. Siguiente orden: Repuestos varios para mantener margen de seguridad

¿Quieres detalles de costos de reabastecimiento?`
  }
  
  // Preguntas sobre filtros
  if (msg.includes('filtro') || msg.includes('air filter') || msg.includes('oil filter')) {
    return `**FILTROS DISPONIBLES:**

1. **Filtro de Aceite Fram PH8A** (32 unidades)
   - Compatible: Chevrolet, GMC, Pontiac (motores 5.3L-6.0L)
   - Precio: S/ 34.99
   - Stock: Suficiente
   - Años: 1985-2023

2. **Filtro de Aire K&N** (25 unidades)
   - Compatible: Ford, Dodge, Jeep, RAM (motores 3.6L-5.7L)
   - Precio: S/ 45.99
   - Stock: Abundante
   - Ventaja: Reutilizable, mejor flujo de aire

¿Para qué vehículo específico necesitas el filtro? Puedo recomendarte el más adecuado.`
  }
  
  // Preguntas sobre aceites
  if (msg.includes('aceite')) {
    return `**ACEITES DISPONIBLES EN INVENTARIO:**

**ACEITES MINERALES:**
- Aceite 10W-40 Shell Advance (45 unidades) - Para motores estándar de 1.5L a 3.0L
- Aceite 15W-40 Diesel (3 unidades - CRÍTICO) - Para diesel 5.9L a 8.3L

**ACEITES SINTÉTICOS:**
- Aceite 5W-30 Castrol Magnatec (28 unidades) - Para motores turbocargados y premium
- Aceite 0W-20 (12 unidades - BAJO) - Para motores híbridos y eficiencia

¿Qué tipo de motor tiene el vehículo (gasolina/diesel/híbrido)? Así te doy la recomendación exacta.`
  }

  // Respuesta por defecto
  return `Soy CRICIA, asesora experta en autopartes y lubricantes de AD CAR DAVILA.

Puedo ayudarte con:
- **Compatibilidad vehicular**: "¿Qué aceite lleva un Honda Civic 2020?"
- **Stock actual**: "¿Qué productos están en stock crítico?"
- **Asesoría técnica**: "Mi cliente tiene un Ford F-150 diesel"
- **Alternativas**: "¿Qué filtros equivalentes tenemos?"

¿Cuál es tu consulta específica?`
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const userMessage = messages[messages.length - 1]?.content || ''
    
    console.log('[CRICIA] Consulta recibida:', userMessage)

    // Si GROQ_API_KEY no está configurado, usar respuestas locales inteligentes
    if (!process.env.GROQ_API_KEY) {
      console.log('[CRICIA] Usando respuestas locales (GROQ_API_KEY no configurado)')
      
      const localResponse = generateLocalResponse(userMessage)
      const encoder = new TextEncoder()
      
      const stream = new ReadableStream({
        start(controller) {
          // Enviar respuesta en chunks como si fuera streaming
          const chunks = localResponse.match(/.{1,50}/g) || [localResponse]
          chunks.forEach(chunk => {
            const data = JSON.stringify({ type: 'text-delta', delta: chunk })
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          })
          
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
          controller.close()
        }
      })
      
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }

    // Si GROQ_API_KEY está configurado, usar Groq
    const systemPrompt = `Eres CRICIA, asesora IA EXPERTA en autopartes, lubricantes y mantenimiento vehicular para AD CAR DAVILA.

ERES UN EXPERTO EN:
- Compatibilidad de aceites, filtros y fluidos con vehículos específicos
- Especificaciones técnicas de motores (gasolina, diesel, turbo, híbrido)
- Marcas y modelos de vehículos (Toyota, Honda, Ford, Chevrolet, BMW, Mercedes, Audi, Nissan, Mazda, Hyundai, etc.)
- Años de fabricación y cambios de especificaciones
- Equivalencias de productos
- Intervalos de mantenimiento y pautas de servicio

${getInventorySummary()}

COMPATIBILIDADES PRINCIPALES:
${Object.entries(vehicleCompatibility).map(([vehicle, specs]) => 
  `${vehicle}: ${specs.years} - Motor: ${specs.engine} - Aceite: ${specs.oil || 'Consultar'}`
).join('\n')}

ESTILO:
- Hablo como un mecánico experimentado
- Doy datos técnicos precisos
- Soy directo y accionable`
=======
export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    console.log('[CRICIA] Recibido:', messages[messages.length - 1]?.content)

    const systemPrompt = `Eres CRICIA, agente IA experto en inventario para AD CAR DAVILA.

${getInventorySummary()}

Habla como un profesional real: natural, directo, con datos concretos. Entiende intención, anticipa necesidades. Sé empático pero accionable.`
>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822

    const result = await streamText({
      model: groq('llama-3.1-70b-versatile'),
      system: systemPrompt,
      messages: messages as any,
      maxTokens: 1000,
    })

<<<<<<< HEAD
=======
    // Convertir a ReadableStream con formato SSE
>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
<<<<<<< HEAD
          for await (const textChunk of result.textStream) {
            const data = JSON.stringify({ type: 'text-delta', delta: textChunk })
=======
          for await (const chunk of result.textStream) {
            const data = JSON.stringify({ type: 'text-delta', delta: chunk })
>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822
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
<<<<<<< HEAD
    console.error('[CRICIA Fatal Error]:', error)
    return new Response(
      JSON.stringify({ error: 'Error procesando solicitud' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
=======
    console.error('[CRICIA API Error]:', error)
    return new Response('Error', { status: 500 })
>>>>>>> d56b5bf90f7f396d6dd945f2f0fe4340dc634822
  }
}
