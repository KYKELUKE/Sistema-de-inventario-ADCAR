export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  items: OrderItem[]
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  total: number
  date: string
  created_at: string
}

const ORDERS_STORAGE_KEY = 'lubricentro_orders'

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ord-1',
    clientName: 'Taller Mecánico "La Rápida"',
    clientEmail: 'la-rapida@taller.cl',
    clientPhone: '+56 9 1234 5678',
    date: new Date().toISOString().split('T')[0],
    total: 1250.50,
    status: 'completed',
    items: [
      { productId: 'prod-1', productName: 'Aceite Sintético 10W-40', quantity: 5, unitPrice: 15000 }
    ],
    created_at: new Date().toISOString(),
  },
]

let ordersStore: Order[] = DEFAULT_ORDERS

function getStoredOrders(): Order[] {
  if (typeof window === 'undefined') return DEFAULT_ORDERS
  const stored = localStorage.getItem(ORDERS_STORAGE_KEY)
  if (stored) {
    ordersStore = JSON.parse(stored)
  }
  return ordersStore
}

function saveOrders(orders: Order[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
}

export async function getOrders() {
  const orders = getStoredOrders()
  return { success: true, data: [...orders] }
}

export async function getOrderById(id: string) {
  const orders = getStoredOrders()
  const order = orders.find(o => o.id === id)
  if (!order) return { success: false, error: 'Orden no encontrada' }
  return { success: true, data: { ...order } }
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at'>) {
  const orders = getStoredOrders()
  const newOrder: Order = {
    ...order,
    id: `ord-${Date.now()}`,
    created_at: new Date().toISOString(),
  }
  orders.push(newOrder)
  saveOrders(orders)
  return { success: true, data: { ...newOrder } }
}

export async function updateOrder(id: string, updates: Partial<Omit<Order, 'id' | 'created_at'>>) {
  const orders = getStoredOrders()
  const index = orders.findIndex(o => o.id === id)
  if (index === -1) return { success: false, error: 'Orden no encontrada' }
  
  orders[index] = { ...orders[index], ...updates }
  saveOrders(orders)
  return { success: true, data: { ...orders[index] } }
}

export async function deleteOrder(id: string) {
  const orders = getStoredOrders()
  const index = orders.findIndex(o => o.id === id)
  if (index === -1) return { success: false, error: 'Orden no encontrada' }
  
  orders.splice(index, 1)
  saveOrders(orders)
  return { success: true }
}

export async function updateOrderStatus(id: string, status: 'pending' | 'processing' | 'completed' | 'cancelled') {
  return updateOrder(id, { status })
}

export async function getOrdersByStatus(status: string) {
  const orders = getStoredOrders()
  const filtered = orders.filter(o => o.status === status)
  return { success: true, data: filtered }
}
