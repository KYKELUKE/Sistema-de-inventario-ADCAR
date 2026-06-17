export interface Product {
  id: string
  name: string
  sku: string
  quantity: number
  unit_price: number
  category: string
  created_at: string
}

const PRODUCTS_STORAGE_KEY = 'lubricentro_products'

const DEFAULT_PRODUCTS: Product[] = [
  { id: 'prod-1', name: 'LIQUIDO RADIADOR VISTONY GALON', sku: 'LIQ-RAD-VIS-G', quantity: 36, unit_price: 186.37, category: 'Fluidos', created_at: '2025-09-12' },
  { id: 'prod-2', name: 'AGUA DESIONIZADA VISTONY GALON', sku: 'AGUA-DES-VIS-G', quantity: 6, unit_price: 39.53, category: 'Fluidos', created_at: '2025-09-01' },
  { id: 'prod-3', name: 'LIQUIDO RADIADOR KOBALT REFRIGERANTE GALON', sku: 'LIQ-RAD-KOB-G', quantity: 8, unit_price: 25, category: 'Fluidos', created_at: '2025-09-01' },
  { id: 'prod-4', name: 'REFRIGERANTE WRACING VERDE GALON', sku: 'REF-WRA-VER-G', quantity: 7, unit_price: 141, category: 'Refrigerantes', created_at: '2025-09-01' },
  { id: 'prod-5', name: 'REFRIGERANTE WRACING ROJO GALON', sku: 'REF-WRA-ROJ-G', quantity: 7, unit_price: 178, category: 'Refrigerantes', created_at: '2025-09-01' },
  { id: 'prod-6', name: 'REFRIGERANTE ZEREX ROJO GALON', sku: 'REF-ZER-ROJ-G', quantity: 38, unit_price: 152.32, category: 'Refrigerantes', created_at: '2025-09-01' },
  { id: 'prod-7', name: 'ACEITE DE CAJA VISTONY SAE 140 1L', sku: 'ACE-CAJ-VIS-140', quantity: 12, unit_price: 154.78, category: 'Aceites', created_at: '2025-09-09' },
  { id: 'prod-8', name: 'ACEITE DE CAJA VISTONY 80W90 1L', sku: 'ACE-CAJ-VIS-80W90', quantity: 12, unit_price: 174.85, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-9', name: 'LIMPIAPARABRISAS WRACING 1L', sku: 'LIMP-WRA-1L', quantity: 12, unit_price: 43.5, category: 'Limpiadores', created_at: '2025-09-01' },
  { id: 'prod-10', name: 'ACEITE CHEVROM 10W30 1L', sku: 'ACE-CHE-10W30', quantity: 12, unit_price: 200, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-11', name: 'VALVOLINE SINTHETIC BLEND SAE 10W30 1L', sku: 'ACE-VAL-10W30', quantity: 3, unit_price: 237, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-12', name: 'VALVOLINE CLASSIC SAE 20W50 1L', sku: 'ACE-VAL-20W50', quantity: 3, unit_price: 52.65, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-13', name: 'SHELL HELIX HX5 20W50 1L', sku: 'ACE-SHE-20W50', quantity: 1, unit_price: 101.04, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-14', name: 'ATF CHEVROM MD3 1L', sku: 'ATF-CHE-MD3', quantity: 0, unit_price: 0, category: 'Fluidos', created_at: '2025-09-01' },
  { id: 'prod-15', name: 'ACEITE DE CAJA MOTUL SAE 75W80 1L', sku: 'ACE-MOT-75W80', quantity: 1, unit_price: 412.72, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-16', name: 'HIDROLINA SUPER RAYO 1L', sku: 'HID-RAY-1L', quantity: 20, unit_price: 140, category: 'Fluidos', created_at: '2025-09-01' },
  { id: 'prod-17', name: 'CASTROL MAGNATEC STOP STAR SAE 5W30 1L', sku: 'ACE-CAS-5W30', quantity: 12, unit_price: 355.56, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-18', name: 'VALVOLINE PREMIUM PROTECTION 5W30 1L', sku: 'ACE-VAL-PREM-5W30', quantity: 6, unit_price: 0, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-19', name: 'VISTONY BLINDAX 25W60 1L', sku: 'ACE-VIS-BLIND-25W60', quantity: 12, unit_price: 179.64, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-20', name: 'VISTONY BLINDAX GAS 20W50 1L', sku: 'ACE-VIS-BLIND-20W50', quantity: 12, unit_price: 179.76, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-21', name: 'VALVOLINE ATF 1L', sku: 'ATF-VAL-1L', quantity: 6, unit_price: 173.52, category: 'Fluidos', created_at: '2025-09-01' },
  { id: 'prod-22', name: 'CASTROL GTX BLANCO GALON', sku: 'ACE-CAS-GTX-BLA', quantity: 3, unit_price: 207.27, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-23', name: 'VALVOLINE PREMIUM PROTECTION 5W30 GALON 5 LITROS', sku: 'ACE-VAL-PREM-5L', quantity: 3, unit_price: 387.6, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-24', name: 'VISTONY SINTEX 10W30 OIL Gas GALON', sku: 'ACE-VIS-SINT-10W30', quantity: 4, unit_price: 236.24, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-25', name: 'VALVOLINE PREMIUM 10W30 GALON', sku: 'ACE-VAL-10W30-G', quantity: 3, unit_price: 237, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-26', name: 'VALVOLINE PREMIUM 20W50 GALON', sku: 'ACE-VAL-20W50-G', quantity: 0, unit_price: 237, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-27', name: 'MOBIL SUPER GAS 10W30 GALON', sku: 'ACE-MOB-10W30', quantity: 2, unit_price: 124.44, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-28', name: 'VALVODIESEL 15W40 NEGRO PETROLERO GALON', sku: 'ACE-VAL-DIES-15W40', quantity: 3, unit_price: 202.7, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-29', name: 'MOBIL SUPER GAS 20W50 GALON', sku: 'ACE-MOB-20W50', quantity: 2, unit_price: 124.44, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-30', name: 'BALDE ACEITE POWER LUBE BALDE', sku: 'BAL-ACE-POW', quantity: 1, unit_price: 139.5, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-31', name: 'GRASA VISTONY AMARILLA POTE CHICO', sku: 'GRA-VIS-AMA', quantity: 1, unit_price: 65.04, category: 'Grasas', created_at: '2025-09-01' },
  { id: 'prod-32', name: 'MOTOR FLUSH VISBELLA SPRAY', sku: 'MOT-FLU-VIS-SPR', quantity: 13, unit_price: 94.8, category: 'Limpiadores', created_at: '2025-09-01' },
  { id: 'prod-33', name: 'CARBUSHOCK VISBELLA', sku: 'CAR-SHO-VIS', quantity: 15, unit_price: 73.78, category: 'Aditivos', created_at: '2025-09-01' },
  { id: 'prod-34', name: 'LIQUIDO DE FRENO VISBELLA DOT 4 8 ONZ', sku: 'LIQ-FRE-VIS-8OZ', quantity: 1, unit_price: 0, category: 'Fluidos', created_at: '2025-09-01' },
  { id: 'prod-35', name: 'LIQUIDO DE FRENO VISBELLA DOT 4 4 ONZ', sku: 'LIQ-FRE-VIS-4OZ', quantity: 1, unit_price: 0, category: 'Fluidos', created_at: '2025-09-01' },
  { id: 'prod-36', name: 'LIQUIDO DE FRENO VISBELLA DOT 3 12 ONZ', sku: 'LIQ-FRE-VIS-12OZ', quantity: 1, unit_price: 8.6, category: 'Fluidos', created_at: '2025-09-01' },
  { id: 'prod-37', name: 'LIMPIADOR DE RADIADOR VISBELLA', sku: 'LIMP-RAD-VIS', quantity: 1, unit_price: 0, category: 'Limpiadores', created_at: '2025-09-01' },
  { id: 'prod-38', name: 'BALDE ACEITE VISTONY 25W60 FORZA VIS', sku: 'BAL-ACE-VIS-25W60', quantity: 1, unit_price: 0, category: 'Aceites', created_at: '2025-09-01' },
  { id: 'prod-39', name: 'TAPAS DE RADIADOR R 124', sku: 'TAP-RAD-R124', quantity: 1, unit_price: 0, category: 'Repuestos', created_at: '2025-09-01' },
  { id: 'prod-40', name: 'TAPAS DE RADIADOR R 125', sku: 'TAP-RAD-R125', quantity: 1, unit_price: 0, category: 'Repuestos', created_at: '2025-09-01' },
  { id: 'prod-41', name: 'SILICONA GRANDE VISBELLA', sku: 'SIL-GRA-VIS', quantity: 1, unit_price: 82.2, category: 'Selladores', created_at: '2025-09-01' },
  { id: 'prod-42', name: 'SILICONA CHICA VISBELLA', sku: 'SIL-CHI-VIS', quantity: 1, unit_price: 38.74, category: 'Selladores', created_at: '2025-09-01' },
  { id: 'prod-43', name: 'VALVOLINE REFRIGERANTE 33%', sku: 'REF-VAL-33', quantity: 1, unit_price: 186.79, category: 'Refrigerantes', created_at: '2025-09-01' },
  { id: 'prod-44', name: 'AGUA DE BATERIA VISTONY 1L', sku: 'AGUA-BAT-VIS-1L', quantity: 1, unit_price: 26.44, category: 'Fluidos', created_at: '2025-09-01' },
  { id: 'prod-45', name: 'TAPA DE RADIADOR R 148', sku: 'TAP-RAD-R148', quantity: 11, unit_price: 110, category: 'Repuestos', created_at: '2025-09-01' },
]

let productsStore: Product[] = getStoredProducts()

function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS
  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY)
  
  if (!stored) {
    // Si no hay datos, guardar los nuevos por defecto
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS))
    return DEFAULT_PRODUCTS
  }
  
  try {
    const parsedData = JSON.parse(stored)
    // Si hay menos de 10 productos, probablemente son datos viejos
    if (Array.isArray(parsedData) && parsedData.length < 10) {
      // Reemplazar con los nuevos datos
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS))
      return DEFAULT_PRODUCTS
    }
    return parsedData
  } catch {
    // Si hay error al parsear, usar los datos por defecto
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS))
    return DEFAULT_PRODUCTS
  }
}

function saveProducts(products: Product[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
}

export async function getProducts() {
  const products = getStoredProducts()
  productsStore = products
  return { success: true, data: [...products] }
}

export async function getProductById(id: string) {
  const products = getStoredProducts()
  const product = products.find(p => p.id === id)
  if (!product) return { success: false, error: 'Producto no encontrado' }
  return { success: true, data: { ...product } }
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>) {
  const products = getStoredProducts()
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    created_at: new Date().toISOString(),
  }
  products.push(newProduct)
  saveProducts(products)
  return { success: true, data: { ...newProduct } }
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'created_at'>>) {
  const products = getStoredProducts()
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return { success: false, error: 'Producto no encontrado' }
  
  products[index] = { ...products[index], ...updates }
  saveProducts(products)
  return { success: true, data: { ...products[index] } }
}

export async function deleteProduct(id: string) {
  const products = getStoredProducts()
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return { success: false, error: 'Producto no encontrado' }
  
  products.splice(index, 1)
  saveProducts(products)
  return { success: true }
}

export async function searchProducts(query: string) {
  const products = getStoredProducts()
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.sku.toLowerCase().includes(query.toLowerCase())
  )
  return { success: true, data: filtered }
}
