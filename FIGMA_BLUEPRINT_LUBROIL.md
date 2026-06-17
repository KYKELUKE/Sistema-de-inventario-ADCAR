# LubrOil - Blueprint Figma Completo

## Descripción General
Prototipo Figma profesional que replica EXACTAMENTE el sistema LubrOil de gestión inteligente de inventario. Este documento contiene todas las especificaciones para recrear fielmente la interfaz.

---

## 1. SISTEMA DE COLORES

### Colores Principales
- **Rojo LubrOil**: #EF4444 (RGB: 239, 68, 68)
- **Rojo Hover**: #DC2626 (RGB: 220, 38, 38)
- **Blanco**: #FFFFFF (RGB: 255, 255, 255)
- **Gris Oscuro**: #1F2937 (RGB: 31, 41, 55)
- **Gris Claro**: #F3F4F6 (RGB: 243, 244, 246)
- **Gris Neutral**: #9CA3AF (RGB: 156, 163, 175)
- **Verde Status**: #10B981 (RGB: 16, 185, 129)
- **Naranja Status**: #F59E0B (RGB: 245, 158, 11)
- **Rojo Status**: #EF4444 (RGB: 239, 68, 68)

### Paleta de Estados
- Crítico (Rojo): #EF4444
- Atención (Naranja): #F59E0B
- Normal (Verde): #10B981

---

## 2. TIPOGRAFÍA

### Fuentes
- **Familia Principal**: Inter (Google Fonts)
- **Familia Secundaria**: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

### Escala Tipográfica
```
Títulos H1:      32px, Bold (700), line-height: 1.2
Títulos H2:      24px, Bold (700), line-height: 1.3
Títulos H3:      20px, Bold (700), line-height: 1.4
Subtítulos:      16px, SemiBold (600), line-height: 1.4
Body Large:      16px, Regular (400), line-height: 1.5
Body Normal:     14px, Regular (400), line-height: 1.5
Body Small:      12px, Regular (400), line-height: 1.4
Labels:          12px, Medium (500), line-height: 1.3
Captions:        11px, Regular (400), line-height: 1.3
```

---

## 3. ESPACIADO Y GRID

### Sistema de Espaciado (en px)
```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
```

### Grid de Contenido
- Desktop ancho: 1280px (w-full con padding)
- Sidebar ancho: 240px
- Contenido útil: ~1040px
- Margen horizontal: 16px cada lado
- Margen vertical: 24px

### Espaciado de Componentes
- Padding cards: 16px
- Padding botones: 8px horizontal, 6px vertical
- Gap entre items: 12px
- Gap entre secciones: 24px

---

## 4. COMPONENTES BASE

### Botones

#### Botón Primario (Rojo)
```
Ancho: variable (min 100px)
Alto: 36px
Background: #EF4444
Text Color: #FFFFFF
Font: 14px, SemiBold (600)
Border Radius: 8px
Padding: 8px 16px
Hover: #DC2626
Active: #B91C1C
Disabled: #D1D5DB

Estados:
- Normal: #EF4444
- Hover: #DC2626 (oscurecer)
- Active: #B91C1C
- Focus: borde 2px #F59E0B
- Disabled: #D1D5DB, opacidad 0.5
```

#### Botón Secundario (Blanco)
```
Background: #FFFFFF
Border: 1px #E5E7EB
Text Color: #1F2937
Hover: #F3F4F6
```

#### Botón Icon
```
Size: 32px (icon) o 40px (pequeño)
Background: transparent
Hover: #F3F4F6
Border Radius: 8px
```

### Inputs
```
Altura: 36px
Padding: 8px 12px
Border: 1px #E5E7EB
Border Radius: 8px
Font: 14px
Focus: borde 2px #EF4444
Placeholder color: #9CA3AF
```

### Badges/Pills
```
Padding: 4px 8px
Font: 12px, Medium (500)
Border Radius: 4px (rectangular) o 16px (pill)
Variantes:
  - Critical: bg #FEE2E2, text #991B1B
  - Warning: bg #FEF3C7, text #92400E
  - Success: bg #ECFDF5, text #065F46
```

### Cards
```
Background: #FFFFFF
Border: 1px #E5E7EB
Border Radius: 12px
Padding: 16px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Hover: Shadow más pronunciada
```

---

## 5. ESTRUCTURA DE LAYOUT

### Sidebar Principal
```
Ancho: 240px (expandido) / 64px (colapsado)
Height: 100vh (full viewport)
Background: #FFFFFF
Border-right: 1px #E5E7EB
Fixed position: left 0, top 0
Padding: 16px

Logo Section:
  - Logo icon: 32px
  - Logo text: "LubrOil"
  - Subtitle: "Lubricentro"
  - Margin bottom: 24px

Navigation Groups:
  - PRINCIPAL
  - OPERACIONES
  - GENERAL
```

### Header
```
Height: 64px
Background: #FFFFFF
Border-bottom: 1px #E5E7EB
Padding: 0 24px
Position: fixed
Top: 0
Left: 240px (de sidebar)

Contenido:
  - Título página: left align
  - Descripción: small, gris
  - Acciones: right align (botones)
```

### Main Content
```
Margin-left: 240px (por sidebar)
Margin-top: 64px (por header)
Padding: 24px
Background: #F9FAFB
Min-height: calc(100vh - 64px)
```

---

## 6. PÁGINAS ESPECÍFICAS

### Página: PRODUCTOS (Inventory)

#### Header Section
```
Título: "Inventario"
Position: relative (dentro de main, no en header global)
Padding: 24px
Background: #FFFFFF
Border-bottom: 1px #E5E7EB
Margin-bottom: 24px

Elementos:
- H1 "Inventario": 24px Bold
- Botón "Add Producto": Rojo, right-aligned
```

#### Search Bar
```
Ancho: 100% o ~400px
Height: 40px
Placeholder: "Search"
Icon: magnifying glass, left
Padding: 8px 12px
Border: 1px #E5E7EB
Border Radius: 8px
```

#### Product Grid
```
Display: CSS Grid
Grid columns: 3 (desktop) / 2 (tablet) / 1 (mobile)
Gap: 16px
Padding: 0

Product Card:
  - Width: calc(100% / 3) - gap
  - Height: auto
  - Background: #FFFFFF
  - Border: 1px #E5E7EB
  - Border Radius: 12px
  - Padding: 16px
  - Shadow: light

Contenido de Card:
  1. Imagen Producto: 
     - Size: 80x80px
     - Border Radius: 8px
     - Position: relative left
  
  2. Nombre Producto:
     - Font: 16px Bold
     - Color: #1F2937
     - Margin: 12px 0 0 90px (para que esté junto a imagen)
  
  3. Badge Status:
     - Valores: "BAJO NIVEL", "NIVEL MEDIO", "BIEN SURTIDO"
     - Font: 11px Bold
     - Padding: 4px 8px
     - Border Radius: 4px
     - Color según estado
  
  4. Info adicional (pequeño):
     - Font: 12px, gris #9CA3AF
     - Text: "Proveedor: {nombre}"
     - Text: "ERF: {codigo}"
  
  5. Acciones:
     - Botones: "No%", "Defore" (u otros)
     - Size: pequeño
     - Display: flex gap 8px
     - Position: bottom de card
     - Width: 100%
```

### Página: STOCK BAJO (Low Stock Alerts)

#### Header Section
```
Título: "Alertas de Stock Bajo"
Descripción: "Productos que requieren reorden inmediato..."
Botones de exportación:
  - Excel: Verde (#10B981)
  - PDF: Rojo (#EF4444)
  - Orden Proveedor: Gris (secundario)
```

#### Alerts List
```
Display: vertical stack
Gap: 12px
Padding: 0

Alert Card:
  - Background: #FFFFFF
  - Border-left: 4px #EF4444 (rojo para criticidad)
  - Border: 1px #E5E7EB
  - Border Radius: 8px
  - Padding: 16px
  - Display: flex, space-between

Content:
  - Nombre producto: 16px Bold
  - Stock actual: "Stock: {qty} / Mín: {min}"
  - Color diferente según urgencia

Rightside:
  - Botón de acción: Reorder
  - Urgency badge: color rojo/naranja
```

### Página: TENDENCIAS (Trends)

#### Charts Section
```
Display: Grid 2x2 (o 1 col mobile)
Gap: 24px
Padding: 24px

Chart Card:
  - Background: #FFFFFF
  - Border: 1px #E5E7EB
  - Border Radius: 12px
  - Padding: 16px
  - Title: 16px Bold
  - Description: 12px gris

Charts:
  1. Line Chart: Tendencias semanales
  2. Bar Chart: Comparativa categorías
  3. Pie Chart: Distribución de ventas
  4. Area Chart: Crecimiento acumulativo
```

### Página: REPORTES (Reports)

#### Metrics Cards
```
Display: Grid 4 cols (o responsive)
Gap: 16px

Metric Card:
  - Background: #FFFFFF
  - Border: 1px #E5E7EB
  - Border Radius: 12px
  - Padding: 20px
  - Icon: 32px, rojo
  - Title: 12px, gris (label)
  - Value: 24px Bold
  - Subtitle: 12px, gris (descripción)

KPIs:
  - Total Ingresos: S/ 45,230
  - Total Pedidos: 156
  - Ticket Promedio: S/ 289.81
  - Crecimiento: +18.5%
```

### Página: CRICIA (AI Assistant)

#### Chat Interface
```
Container:
  - Background: #FFFFFF
  - Border: 1px #E5E7EB
  - Border Radius: 12px
  - Height: 500px (o responsive)
  - Display: flex column

Header:
  - Background: #EF4444
  - Color: #FFFFFF
  - Padding: 16px
  - Border-top-radius: 12px
  - Title: "CRICIA"
  - Subtitle: "Agente IA de Gestión Inteligente"

Messages Area:
  - Flex: 1
  - Overflow-y: auto
  - Padding: 16px
  - Gap: 12px

Message Bubble (User):
  - Background: #EF4444
  - Color: #FFFFFF
  - Border Radius: 12px
  - Max-width: 80%
  - Align: right
  - Padding: 12px 16px

Message Bubble (AI):
  - Background: #F3F4F6
  - Color: #1F2937
  - Border Radius: 12px
  - Max-width: 80%
  - Align: left
  - Padding: 12px 16px

Input Section:
  - Display: flex
  - Gap: 8px
  - Padding: 16px
  - Border-top: 1px #E5E7EB
  
  Input:
    - Flex: 1
    - Height: 40px
    - Border: 1px #E5E7EB
    - Border Radius: 8px
    - Padding: 8px 12px
  
  Send Button:
    - Size: 40x40px
    - Background: #EF4444
    - Icon: send arrow
```

---

## 7. FLUJOS DE USUARIO

### Flujo 1: Ver Inventario y Buscar Producto
```
1. Usuario ingresa a /products
2. Ve grid de 9-10 productos
3. Busca por nombre en search bar
4. Producto aparece/desaparece según búsqueda
5. Puede clickear producto para ver detalles
```

### Flujo 2: Exportar Reporte
```
1. Usuario en /low-stock
2. Clickea botón Excel o PDF
3. Se abre diálogo/loading
4. Descarga el archivo
5. Archivo contiene datos formateados
```

### Flujo 3: Consultar CRICIA
```
1. Usuario abre chat con CRICIA
2. Escribe pregunta
3. Presiona Enter o clickea Send
4. CRICIA responde con análisis
5. Respuesta aparece en chat
```

---

## 8. ELEMENTOS ESPECIALES

### Status Badges
```
BIEN NIVEL:
  Background: #ECFDF5
  Text: #065F46
  Text: "BIEN NIVEL" (bold)

BAJO NIVEL:
  Background: #FEE2E2
  Text: #991B1B
  Text: "BAJO NIVEL" (bold)

NIVEL MEDIO:
  Background: #FEF3C7
  Text: #92400E
  Text: "NIVEL MEDIO" (bold)
```

### Loading States
```
Skeleton Loader:
  - Background: #E5E7EB
  - Height: 16px
  - Border Radius: 4px
  - Animation: pulse 1.5s ease-in-out infinite

Loading Spinner:
  - Size: 24px o 32px
  - Color: #EF4444
  - Animation: spin 1s linear infinite
```

### Modals/Dialogs
```
Backdrop:
  - Background: rgba(0, 0, 0, 0.5)
  - Opacity: 0.5

Dialog:
  - Background: #FFFFFF
  - Border Radius: 12px
  - Padding: 24px
  - Shadow: 0 20px 25px -5px rgba(0,0,0,0.1)
  - Max-width: 500px (modal standard)
  - Position: center screen
```

---

## 9. RESPONSIVE BREAKPOINTS

```
Mobile:      < 640px   (1 columna)
Tablet:      640-1024px (2 columnas)
Desktop:     > 1024px   (3 columnas)
Large:       > 1280px   (4 columnas)
```

---

## 10. INSTRUCCIONES PARA CREAR EN FIGMA

### Paso 1: Setup Base
1. Crear archivo nuevo en Figma
2. Setup color palette (agregar los 10 colores)
3. Setup typography (agregar estilos Inter)
4. Crear página "Tokens" con swatches de colores

### Paso 2: Crear Componentes
1. Crear carpeta "Components"
2. Crear componentes: Button, Input, Badge, Card
3. Definir variantes (size, state, color)
4. Crear master components

### Paso 3: Crear Layouts
1. Crear página "Layouts"
2. Frame principal: 1440px width
3. Crear sidebar component
4. Crear header component
5. Crear main content area

### Paso 4: Crear Páginas Completas
1. Crear página "Productos"
2. Crear página "Stock Bajo"
3. Crear página "Tendencias"
4. Crear página "Reportes"
5. Crear página "CRICIA"

### Paso 5: Crear Prototipos
1. Linkear pantallas con conexiones
2. Definir navegación (click en botón → siguiente pantalla)
3. Agregar transiciones suaves
4. Crear flujos principales

### Paso 6: Exportar
1. Exportar assets (botones, icons)
2. Exportar spec para desarrolladores
3. Compartir prototipo interactivo

---

## 11. ESPECIFICACIONES EXACTAS POR PÁGINA

(Ver secciones anteriores para cada página)

---

## LINKS Y REFERENCIAS

- **Font**: https://fonts.google.com/specimen/Inter
- **Color Tool**: https://www.colorhexa.com/
- **Icons**: Lucide Icons (https://lucide.dev/)

---

**Versión**: 1.0
**Última actualización**: Enero 2024
**Status**: Listo para prototipado en Figma
