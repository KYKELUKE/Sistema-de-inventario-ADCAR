'use client'

import { useState, useEffect } from 'react'
import { getProducts, createProduct as createProductService, updateProduct as updateProductService, deleteProduct as deleteProductService } from '@/lib/services/products.service'

export interface Product {
  id: string
  name: string
  sku: string
  quantity: number
  unit_price: number
  category: string
  description?: string
}

export function useProductsData() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const result = await getProducts()
        if (result.success && result.data) {
          setProducts(result.data)
          setError(null)
        } else {
          setError('Error loading products')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const createProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const result = await createProductService(product)
      if (result.success && result.data) {
        setProducts([result.data, ...products])
        return result.data
      }
      throw new Error('Failed to create product')
    } catch (err) {
      throw err
    }
  }

  const updateProduct = async (id: string, updates: Partial<Omit<Product, 'id' | 'created_at'>>) => {
    try {
      const result = await updateProductService(id, updates)
      if (result.success && result.data) {
        setProducts(products.map(p => p.id === id ? result.data : p))
        return result.data
      }
      throw new Error('Failed to update product')
    } catch (err) {
      throw err
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const result = await deleteProductService(id)
      if (result.success) {
        setProducts(products.filter(p => p.id !== id))
      } else {
        throw new Error('Failed to delete product')
      }
    } catch (err) {
      throw err
    }
  }

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
