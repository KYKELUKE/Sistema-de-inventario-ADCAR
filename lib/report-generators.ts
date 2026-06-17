import * as XLSX from 'xlsx'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Datos de inventario (mismo que en el API)
export const inventoryData = [
  { id: 1, name: 'Aceite 10W-40 Shell Advance', quantity: 45, minStock: 20, price: 89.99, cost: 50, category: 'Aceites Minerales', monthlyConsumption: 15 },
  { id: 2, name: 'Aceite 5W-30 Castrol GTX', quantity: 62, minStock: 25, price: 99.99, cost: 55, category: 'Aceites Minerales', monthlyConsumption: 18 },
  { id: 3, name: 'Refrigerante Prestone', quantity: 28, minStock: 15, price: 45.50, cost: 22, category: 'Refrigerantes', monthlyConsumption: 8 },
  { id: 4, name: 'Filtro de Aceite Fram', quantity: 35, minStock: 20, price: 24.99, cost: 12, category: 'Filtros', monthlyConsumption: 12 },
  { id: 5, name: 'Aceite 10W-30 Castrol', quantity: 15, minStock: 50, price: 85.99, cost: 45, category: 'Aceites Minerales', monthlyConsumption: 20 },
  { id: 6, name: 'Fluido ATF Mobil', quantity: 22, minStock: 12, price: 54.99, cost: 28, category: 'Fluidos', monthlyConsumption: 6 },
  { id: 7, name: 'Aceite para Engranaje Shell', quantity: 18, minStock: 10, price: 69.99, cost: 38, category: 'Aceites Especiales', monthlyConsumption: 5 },
  { id: 8, name: 'Grasa Multidrop Shell', quantity: 41, minStock: 15, price: 34.50, cost: 18, category: 'Grasas', monthlyConsumption: 10 },
  { id: 9, name: 'Refrigerante Zerex', quantity: 19, minStock: 12, price: 39.99, cost: 20, category: 'Refrigerantes', monthlyConsumption: 6 },
  { id: 10, name: 'Filtro de Aire Baldwin', quantity: 26, minStock: 18, price: 32.50, cost: 16, category: 'Filtros', monthlyConsumption: 8 },
]

// Datos de ventas semanales
export const weeklySalesData = [
  { day: 'Lunes', ventas: 2450, pedidos: 18, aceites: 1200, refrigerantes: 850, filtros: 400 },
  { day: 'Martes', ventas: 2890, pedidos: 22, aceites: 1450, refrigerantes: 920, filtros: 520 },
  { day: 'Miércoles', ventas: 2120, pedidos: 15, aceites: 1050, refrigerantes: 680, filtros: 390 },
  { day: 'Jueves', ventas: 3150, pedidos: 25, aceites: 1680, refrigerantes: 1000, filtros: 470 },
  { day: 'Viernes', ventas: 3890, pedidos: 32, aceites: 2100, refrigerantes: 1200, filtros: 590 },
  { day: 'Sábado', ventas: 4520, pedidos: 38, aceites: 2400, refrigerantes: 1450, filtros: 670 },
  { day: 'Domingo', ventas: 2780, pedidos: 20, aceites: 1450, refrigerantes: 900, filtros: 430 },
]

export async function exportToExcel() {
  try {
    const workbook = XLSX.utils.book_new()

    // Calcular métricas
    const totalIngresos = weeklySalesData.reduce((sum, d) => sum + d.ventas, 0)
    const totalPedidos = weeklySalesData.reduce((sum, d) => sum + d.pedidos, 0)
    const ticketPromedio = totalIngresos / totalPedidos
    const inventoryValue = inventoryData.reduce((sum, p) => sum + (p.price * p.quantity), 0)
    const criticalItems = inventoryData.filter(p => p.quantity < p.minStock).length

    // Hoja 1: Resumen Ejecutivo
    const summaryData = [
      ['REPORTE DE VENTAS E INVENTARIO - LUBROIL'],
      ['Período: Enero 1 - Enero 31, 2024'],
      ['Fecha de Generación:', new Date().toLocaleDateString('es-ES')],
      [],
      ['RESUMEN EJECUTIVO'],
      [],
      ['VENTAS'],
      ['Ingresos Totales', `S/ ${totalIngresos.toFixed(2)}`],
      ['Total de Pedidos', totalPedidos],
      ['Ticket Promedio', `S/ ${ticketPromedio.toFixed(2)}`],
      [],
      ['INVENTARIO'],
      ['Valor Total de Inventario', `S/ ${inventoryValue.toFixed(2)}`],
      ['Productos en Stock', inventoryData.length],
      ['Productos Críticos', criticalItems],
    ]

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
    summarySheet['A1'].font = { bold: true, size: 14, color: { rgb: 'FFFFFF' } }
    summarySheet['A1'].fill = { fgColor: { rgb: 'EF4444' } }
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumen')

    // Hoja 2: Ventas Detalladas
    const salesData = [
      ['VENTAS DETALLADAS POR DÍA'],
      [],
      ['Día', 'Ventas (S/)', 'Pedidos', 'Aceites (S/)', 'Refrigerantes (S/)', 'Filtros (S/)'],
      ...weeklySalesData.map(d => [d.day, d.ventas, d.pedidos, d.aceites, d.refrigerantes, d.filtros]),
    ]

    const salesSheet = XLSX.utils.aoa_to_sheet(salesData)
    XLSX.utils.book_append_sheet(workbook, salesSheet, 'Ventas')

    // Hoja 3: Inventario Completo
    const inventorySheetData = [
      ['INVENTARIO COMPLETO'],
      [],
      ['ID', 'Producto', 'Categoría', 'Stock Actual', 'Stock Mínimo', 'Precio Unit.', 'Valor Total', 'Estado'],
      ...inventoryData.map(p => [
        p.id,
        p.name,
        p.category,
        p.quantity,
        p.minStock,
        `S/ ${p.price.toFixed(2)}`,
        `S/ ${(p.price * p.quantity).toFixed(2)}`,
        p.quantity < p.minStock ? 'CRÍTICO' : p.quantity < (p.minStock * 1.5) ? 'BAJO' : 'NORMAL'
      ]),
    ]

    const inventorySheet = XLSX.utils.aoa_to_sheet(inventorySheetData)
    XLSX.utils.book_append_sheet(workbook, inventorySheet, 'Inventario')

    // Hoja 4: Análisis por Categoría
    const categories = [...new Set(inventoryData.map(p => p.category))]
    const categoryAnalysis = [
      ['ANÁLISIS POR CATEGORÍA'],
      [],
      ['Categoría', 'Productos', 'Stock Total', 'Valor Total (S/)', 'Promedio Stock'],
      ...categories.map(cat => {
        const products = inventoryData.filter(p => p.category === cat)
        return [
          cat,
          products.length,
          products.reduce((sum, p) => sum + p.quantity, 0),
          products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(2),
          (products.reduce((sum, p) => sum + p.quantity, 0) / products.length).toFixed(0)
        ]
      })
    ]

    const categorySheet = XLSX.utils.aoa_to_sheet(categoryAnalysis)
    XLSX.utils.book_append_sheet(workbook, categorySheet, 'Por Categoría')

    // Configurar anchos de columna
    summarySheet['!cols'] = [{ wch: 30 }, { wch: 20 }]
    salesSheet['!cols'] = [{ wch: 12 }, { wch: 15 }, { wch: 10 }, { wch: 15 }, { wch: 15 }, { wch: 15 }]
    inventorySheet['!cols'] = [{ wch: 5 }, { wch: 30 }, { wch: 20 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 10 }]

    // Descargar
    XLSX.writeFile(workbook, `Reporte-Ventas-Inventario-${new Date().toISOString().split('T')[0]}.xlsx`)
  } catch (error) {
    console.error('[Export Error]', error)
    alert('Error al exportar Excel: ' + (error instanceof Error ? error.message : 'Desconocido'))
  }
}

export async function exportToPDF(element: HTMLElement) {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgWidth = 210 - 20 // Márgenes de 10mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 10

    // Primera página
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
    heightLeft -= pdf.internal.pageSize.getHeight() - 20

    // Páginas adicionales si es necesario
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= pdf.internal.pageSize.getHeight()
    }

    pdf.save(`Reporte-Ventas-Inventario-${new Date().toISOString().split('T')[0]}.pdf`)
  } catch (error) {
    console.error('[PDF Export Error]', error)
    alert('Error al exportar PDF: ' + (error instanceof Error ? error.message : 'Desconocido'))
  }
}
