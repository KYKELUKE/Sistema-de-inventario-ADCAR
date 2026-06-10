export interface Supplier {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  location: string
  rating: number
  status: 'active' | 'inactive'
  products: string
  created_at: string
}

const SUPPLIERS_STORAGE_KEY = 'lubricentro_suppliers'

const DEFAULT_SUPPLIERS: Supplier[] = [
  {
    id: 'supp-1',
    name: 'Shell Lubricants',
    contact: 'Carlos López',
    email: 'carlos@shell.com',
    phone: '+56 2 2965 5000',
    location: 'Santiago, Chile',
    rating: 4.9,
    status: 'active',
    products: 'Aceites Premium',
    created_at: new Date().toISOString(),
  },
  {
    id: 'supp-2',
    name: 'Castrol South America',
    contact: 'María García',
    email: 'maria@castrol.com',
    phone: '+56 2 3100 1000',
    location: 'Providencia, Chile',
    rating: 4.8,
    status: 'active',
    products: 'Aceites y Fluidos',
    created_at: new Date().toISOString(),
  },
]

let suppliersStore: Supplier[] = []

function getStoredSuppliers(): Supplier[] {
  if (typeof window === 'undefined') return DEFAULT_SUPPLIERS
  const stored = localStorage.getItem(SUPPLIERS_STORAGE_KEY)
  suppliersStore = stored ? JSON.parse(stored) : DEFAULT_SUPPLIERS
  return suppliersStore
}

function saveSuppliers(suppliers: Supplier[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(SUPPLIERS_STORAGE_KEY, JSON.stringify(suppliers))
}

export async function getSuppliers() {
  const suppliers = getStoredSuppliers()
  return { success: true, data: [...suppliers] }
}

export async function getSupplierById(id: string) {
  const suppliers = getStoredSuppliers()
  const supplier = suppliers.find(s => s.id === id)
  if (!supplier) return { success: false, error: 'Proveedor no encontrado' }
  return { success: true, data: { ...supplier } }
}

export async function createSupplier(supplier: Omit<Supplier, 'id' | 'created_at'>) {
  const suppliers = getStoredSuppliers()
  const newSupplier: Supplier = {
    ...supplier,
    id: `supp-${Date.now()}`,
    created_at: new Date().toISOString(),
  }
  suppliers.push(newSupplier)
  saveSuppliers(suppliers)
  return { success: true, data: { ...newSupplier } }
}

export async function updateSupplier(id: string, updates: Partial<Omit<Supplier, 'id' | 'created_at'>>) {
  const suppliers = getStoredSuppliers()
  const index = suppliers.findIndex(s => s.id === id)
  if (index === -1) return { success: false, error: 'Proveedor no encontrado' }
  
  suppliers[index] = { ...suppliers[index], ...updates }
  saveSuppliers(suppliers)
  return { success: true, data: { ...suppliers[index] } }
}

export async function deleteSupplier(id: string) {
  const suppliers = getStoredSuppliers()
  const index = suppliers.findIndex(s => s.id === id)
  if (index === -1) return { success: false, error: 'Proveedor no encontrado' }
  
  suppliers.splice(index, 1)
  saveSuppliers(suppliers)
  return { success: true }
}

export async function getActiveSuppliers() {
  const suppliers = getStoredSuppliers()
  const filtered = suppliers.filter(s => s.status === 'active')
  return { success: true, data: filtered }
}

export async function updateSupplierRating(id: string, rating: number) {
  return updateSupplier(id, { rating })
}
