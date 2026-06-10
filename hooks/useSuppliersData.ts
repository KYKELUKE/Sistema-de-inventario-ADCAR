'use client'

import { useState, useEffect } from 'react'
import { getSuppliers, createSupplier as createSupplierService, updateSupplier as updateSupplierService, deleteSupplier as deleteSupplierService } from '@/lib/services/suppliers.service'

export interface Supplier {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  location: string
  rating: number
  status: string
  products: string
}

export function useSuppliersData() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true)
        const result = await getSuppliers()
        if (result.success && result.data) {
          setSuppliers(result.data)
          setError(null)
        } else {
          setError('Error loading suppliers')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading suppliers')
        console.error('Error fetching suppliers:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSuppliers()
  }, [])

  const createSupplier = async (supplier: Omit<Supplier, 'id' | 'rating' | 'status'>) => {
    try {
      const result = await createSupplierService(supplier)
      if (result.success && result.data) {
        setSuppliers([result.data, ...suppliers])
        return result.data
      }
      throw new Error('Failed to create supplier')
    } catch (err) {
      throw err
    }
  }

  const updateSupplier = async (id: string, updates: Partial<Omit<Supplier, 'id'>>) => {
    try {
      const result = await updateSupplierService(id, updates)
      if (result.success && result.data) {
        setSuppliers(suppliers.map(s => s.id === id ? result.data : s))
        return result.data
      }
      throw new Error('Failed to update supplier')
    } catch (err) {
      throw err
    }
  }

  const deleteSupplier = async (id: string) => {
    try {
      const result = await deleteSupplierService(id)
      if (result.success) {
        setSuppliers(suppliers.filter(s => s.id !== id))
      } else {
        throw new Error('Failed to delete supplier')
      }
    } catch (err) {
      throw err
    }
  }

  return {
    suppliers,
    loading,
    error,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  }
}
