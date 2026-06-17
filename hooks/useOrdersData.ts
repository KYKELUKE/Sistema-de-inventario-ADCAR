'use client'

import { useState, useEffect } from 'react'
import { getOrders, createOrder as createOrderService, updateOrder as updateOrderService, deleteOrder as deleteOrderService } from '@/lib/services/orders.service'

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
  notes?: string
  status: string
  total: number
  date: string
}

export function useOrdersData() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const result = await getOrders()
        if (result.success && result.data) {
          setOrders(result.data)
          setError(null)
        } else {
          setError('Error loading orders')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading orders')
        console.error('Error fetching orders:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const createOrder = async (order: Omit<Order, 'id' | 'created_at'>) => {
    try {
      const result = await createOrderService(order)
      if (result.success && result.data) {
        setOrders([result.data, ...orders])
        return result.data
      }
      throw new Error('Failed to create order')
    } catch (err) {
      throw err
    }
  }

  const updateOrder = async (id: string, updates: Partial<Omit<Order, 'id' | 'created_at'>>) => {
    try {
      const result = await updateOrderService(id, updates)
      if (result.success && result.data) {
        setOrders(orders.map(o => o.id === id ? result.data : o))
        return result.data
      }
      throw new Error('Failed to update order')
    } catch (err) {
      throw err
    }
  }

  const deleteOrder = async (id: string) => {
    try {
      const result = await deleteOrderService(id)
      if (result.success) {
        setOrders(orders.filter(o => o.id !== id))
      } else {
        throw new Error('Failed to delete order')
      }
    } catch (err) {
      throw err
    }
  }

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
  }
}
