# Guía Completa de Figma - Sistema LubrOil

## Información General del Proyecto
- **Nombre**: LubrOil - Sistema Inteligente de Gestión de Inventario
- **Tipo**: Dashboard B2B Enterprise
- **Objetivo**: Gestión de inventario de lubricantes automotrices con análisis IA
- **Usuario Principal**: Gerentes de inventario y distribuidores

---

## 1. SISTEMA DE DISEÑO

### Paleta de Colores
- **Primario**: Rojo (#EF4444) - Alertas, CTAs, énfasis
- **Secundario**: Gris Oscuro (#1F2937) - Fondos, textos
- **Terciario**: Blanco (#FFFFFF) - Fondos limpios
- **Neutro**: Gris Claro (#F3F4F6) - Separadores, hover
- **Éxito**: Verde (#10B981)
- **Advertencia**: Ámbar (#F59E0B)

### Tipografía
- **Headings**: Inter Bold (24px, 20px, 18px)
- **Body**: Inter Regular (14px, 16px)
- **Labels**: Inter Medium (12px)
- **Line Height**: 1.4 - 1.6

---

## 2. COMPONENTES PRINCIPALES

### 2.1 Sidebar/Navegación
- Ancho: 220px (expandido) / 80px (colapsado)
- Logo en la parte superior
- Secciones: Principal, Operaciones, General
- Items con iconos + label
- Hover state: Fondo gris claro
- Active state: Rojo con texto blanco

### 2.2 Header
- Altura: 64px
- Contains: Logo, Título página, Acciones (botones)
- Fondo blanco con borde inferior gris claro

### 2.3 Cards/Tarjetas
- Border-radius: 8px
- Border: 1px solid #E5E7EB
- Sombra: 0 1px 2px rgba(0,0,0,0.05)
- Padding: 20px
- Espaciado entre cards: 16px (gap)

### 2.4 Buttons
- Primario: Fondo rojo, texto blanco
- Secundario: Fondo gris, texto oscuro
- Tamaño: 40px (height), 16px padding horizontal
- Border-radius: 8px
- Font-weight: 500

### 2.5 Inputs/Select
- Height: 40px
- Border: 1px solid #D1D5DB
- Border-radius: 8px
- Focus: Border rojo
- Padding: 10px 12px

---

## 3. PANTALLAS DEL SISTEMA

### 3.1 Dashboard (Home)
**Ubicación**: /
**Layout**: 2 columnas (Sidebar + Contenido)

**Secciones**:
1. **Header Ejecutivo**
   - Título: "Bienvenido a LubrOil"
   - Subtítulo: "Gestión Inteligente de Inventario"
   - 4 Cards KPI:
     * Total Inventario: $120,450
     * Productos Críticos: 3
     * Tendencia Ventas: ↑18.5%
     * Stock Saludable: 92%

2. **Gráficos**
   - Gráfico de líneas: Tendencias últimos 30 días
   - Gráfico de barras: Ventas por categoría
   - Tabla: Productos más vendidos

3. **Alerta de Stock Bajo**
   - Widget destacado en rojo
   - Botón: "Ver Alertas"

### 3.2 Productos
**Ubicación**: /products
**Layout**: Grid + Search

**Elementos**:
- Search bar: Buscar por nombre/SKU
- Filter: Por categoría, estado
- Cards de productos (Grid 3 columnas):
  * Imagen
  * Nombre, SKU
  * Precio, Stock
  * Badge de estado (En stock/Bajo/Agotado)
  * Acciones (Editar, Eliminar)

### 3.3 Stock Bajo
**Ubicación**: /low-stock
**Layout**: Tabla + Filtros

**Elementos**:
- Header con 3 botones: Excel, PDF, Crear Orden Proveedor
- Tabla con columnas:
  * Producto
  * SKU
  * Stock Actual
  * Stock Mínimo
  * % Disponible
  * Proveedor
  * Urgencia (Badge rojo/naranja)
  * Acciones

### 3.4 Órdenes/Ventas
**Ubicación**: /orders
**Layout**: Timeline + Filtros

**Elementos**:
- Período selector (Hoy, Semana, Mes, Trimestre)
- Tabla de órdenes:
  * ID Orden
  * Fecha
  * Cliente
  * Monto
  * Estado (Pendiente/Completada)
  * Acciones

### 3.5 Tendencias
**Ubicación**: /trends
**Layout**: Gráficos + Análisis

**Elementos**:
- 3 Gráficos grandes:
  * Línea: Evolución ventas
  * Barras: Comparativa categorías
  * Área: Proyección futura
- Período selector
- Indicadores de tendencia

### 3.6 CRICIA (AI Assistant)
**Ubicación**: /trends (panel lateral) o chat flotante
**Elementos**:
- Chat interface
- Input field (multiline)
- Botón enviar (paper plane icon)
- Histórico de mensajes:
  * Usuario: Bubble derecha, gris
  * CRICIA: Bubble izquierda, rojo
- Ejemplos sugeridos debajo

### 3.7 Reportes
**Ubicación**: /reports
**Layout**: Gráficos + Descarga

**Elementos**:
- Período selector
- Botones descarga: Excel (verde), PDF (rojo)
- Métricas resumen
- Gráficos de análisis
- Tabla de detalle

### 3.8 Diagramas
**Ubicación**: /diagramas, /diagrama-flujo, /diagramas-mermaid
**Elementos**:
- Imagen grande del diagrama
- Secciones expandibles explicando componentes
- Tabla de tecnologías

---

## 4. FLUJOS DE USUARIO

### Flujo 1: Consultar Stock
1. Usuario abre dashboard
2. Ve alerta de "3 productos con stock bajo"
3. Hace clic en "Stock Bajo"
4. Ve tabla con productos críticos
5. Exporta a Excel para gestión

### Flujo 2: Consultar con CRICIA
1. Usuario abre Tendencias
2. Ve panel de CRICIA
3. Escribe pregunta sobre inventario
4. CRICIA responde con análisis
5. Usuario explora datos sugeridos

### Flujo 3: Generar Reporte
1. Usuario va a Reportes
2. Selecciona período
3. Hace clic en "Descargar Excel"
4. Sistema genera reporte profesional
5. Se descarga automáticamente

---

## 5. ESTADOS Y INTERACCIONES

### Botones
- **Default**: Fondo sólido, cursor pointer
- **Hover**: Oscurecer 10%
- **Active**: Oscurecer 20%
- **Disabled**: Gris, 50% opacidad, cursor not-allowed

### Inputs
- **Default**: Border gris
- **Hover**: Border gris oscuro
- **Focus**: Border rojo, box-shadow
- **Error**: Border rojo, mensaje de error en rojo

### Tablas
- **Row Hover**: Fondo gris muy claro
- **Row Selected**: Fondo gris claro, checkbox checked
- **Sorting**: Icono de flecha en header

---

## 6. ELEMENTOS ESPECIALES

### Badge de Estado
- **Crítico**: Fondo rojo, texto blanco
- **Advertencia**: Fondo ámbar, texto oscuro
- **Normal**: Fondo verde, texto blanco
- **Info**: Fondo azul, texto blanco

### Cards de Métrica KPI
- Layout: Icono izquierda, número derecha
- Número en gris oscuro (24px bold)
- Label en gris medio (14px)
- Tendencia con icono (↑ verde / ↓ rojo)

### Modal/Dialog
- Fondo semi-transparente (0.5 opacidad)
- Card blanca centrada (400px ancho max)
- Header con título + close button
- Body con contenido
- Footer con botones (Cancel, Confirm)

---

## 7. INSTRUCCIONES PARA CREAR EN FIGMA

1. **Crear un archivo**: "LubrOil - Prototipo"
2. **Crear frames para cada pantalla**:
   - Dashboard
   - Productos
   - Stock Bajo
   - Órdenes
   - Tendencias
   - CRICIA
   - Reportes
   - Diagramas

3. **Crear componentes reutilizables**:
   - Button (primario, secundario, disabled)
   - Card (default, elevated)
   - Input (default, focus, error)
   - Badge (4 variantes)
   - Modal
   - Table Row
   - Header
   - Sidebar Items

4. **Aplicar autolayout**:
   - Usar flexbox en Figma (Auto Layout)
   - Establecer gaps y paddings

5. **Crear prototipos interactivos**:
   - Links entre pantallas
   - Micro-interacciones en botones
   - Estados hover/active

6. **Usar variables de color**:
   - Rojo: #EF4444
   - Gris Oscuro: #1F2937
   - Blanco: #FFFFFF
   - Gris Claro: #F3F4F6

---

## 8. REFERENCIAS DE INSPIRACIÓN

- Diseño corporativo y profesional
- Interfaz intuitiva para gestores
- Énfasis en datos y visualización
- Accesibilidad y claridad
- Responsive (indicar breakpoints)

---

## 9. ASSETS NECESARIOS

- Logo LubrOil (rojo y blanco)
- Iconos (lucide-react style)
- Imágenes de productos (placeholders)
- Gráficos y charts (Recharts style)
- Colores y estilos consistency

---

## 10. LINKS ÚTILES

- Sistema actual: http://localhost:3000
- Código: /vercel/share/v0-project
- Inventario: 10 productos diferentes
- Datos de ejemplo en documentos anteriores
