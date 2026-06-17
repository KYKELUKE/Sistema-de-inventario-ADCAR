import * as XLSX from 'xlsx'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface LowStockItem {
  id: number
  name: string
  current: number
  minimum: number
  sku: string
  category: string
  supplier: string
}

export async function exportLowStockToExcel(items: LowStockItem[]) {
  try {
    // Crear workbook con 2 hojas
    const wb = XLSX.utils.book_new()

    // Hoja 1: Resumen Ejecutivo
    const summary = [
      ['REPORTE DE STOCK BAJO - AD CAR DAVILA', ''],
      ['Fecha:', new Date().toLocaleDateString('es-ES')],
      ['Total de productos en stock bajo:', items.length],
      [''],
      ['RESUMEN POR CATEGORÍA', ''],
      ['Categoría', 'Cantidad de Productos'],
    ]

    // Agrupar por categoría
    const categories = new Map<string, number>()
    items.forEach(item => {
      categories.set(item.category, (categories.get(item.category) || 0) + 1)
    })

    categories.forEach((count, category) => {
      summary.push([category, count])
    })

    const ws1 = XLSX.utils.aoa_to_sheet(summary)
    ws1['!cols'] = [{ wch: 30 }, { wch: 20 }]
    XLSX.utils.book_append_sheet(wb, ws1, 'Resumen')

    // Hoja 2: Detalle de Productos
    const detailHeaders = ['ID', 'Producto', 'Stock Actual', 'Mínimo Requerido', 'Falta Abastecer', 'Categoría', 'SKU', 'Proveedor']
    const detailData = items.map(item => [
      item.id,
      item.name,
      item.current,
      item.minimum,
      item.minimum - item.current,
      item.category,
      item.sku,
      item.supplier,
    ])

    const ws2 = XLSX.utils.aoa_to_sheet([detailHeaders, ...detailData])
    ws2['!cols'] = [
      { wch: 5 },
      { wch: 30 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 },
      { wch: 18 },
      { wch: 10 },
      { wch: 25 },
    ]

    // Estilos
    const headerStyle = {
      fill: { fgColor: { rgb: 'FF000000' } },
      font: { bold: true, color: { rgb: 'FFFFFFFF' } },
      alignment: { horizontal: 'center', vertical: 'center' },
    }

    // Aplicar estilos a headers
    for (let i = 0; i < detailHeaders.length; i++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: i })
      ws2[cellRef].s = headerStyle
    }

    XLSX.utils.book_append_sheet(wb, ws2, 'Productos en Stock Bajo')

    // Hoja 3: Análisis de Urgencia
    const urgencyHeaders = ['Prioridad', 'Producto', 'Stock Actual', 'Porcentaje del Mínimo', 'Urgencia']
    const urgencyData = items
      .map(item => ({
        item,
        percentage: Math.round((item.current / item.minimum) * 100),
      }))
      .sort((a, b) => a.percentage - b.percentage)
      .map(({ item, percentage }) => {
        const urgency = percentage <= 10 ? 'CRÍTICO' : percentage <= 25 ? 'ALTO' : 'MEDIO'
        return [percentage <= 10 ? '🔴' : percentage <= 25 ? '🟠' : '🟡', item.name, item.current, `${percentage}%`, urgency]
      })

    const ws3 = XLSX.utils.aoa_to_sheet([urgencyHeaders, ...urgencyData])
    ws3['!cols'] = [{ wch: 5 }, { wch: 30 }, { wch: 12 }, { wch: 15 }, { wch: 12 }]
    XLSX.utils.book_append_sheet(wb, ws3, 'Análisis de Urgencia')

    // Descargar
    XLSX.writeFile(wb, `Stock-Bajo-${new Date().toISOString().split('T')[0]}.xlsx`)
  } catch (error) {
    console.error('Error exportando Excel:', error)
    throw error
  }
}

export async function exportLowStockToPDF(element: HTMLElement) {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      allowTaint: true,
      useCORS: true,
      backgroundColor: '#ffffff',
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgWidth = 210 - 20
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 10

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
    heightLeft -= 277

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= 277
    }

    // Agregar encabezado
    pdf.setFontSize(14)
    pdf.setFont(undefined, 'bold')
    pdf.text('REPORTE DE STOCK BAJO', 10, 8)
    pdf.setFontSize(10)
    pdf.setFont(undefined, 'normal')
    pdf.text(`Generado: ${new Date().toLocaleDateString('es-ES')}`, 10, 14)

    pdf.save(`Stock-Bajo-${new Date().toISOString().split('T')[0]}.pdf`)
  } catch (error) {
    console.error('Error exportando PDF:', error)
    throw error
  }
}
