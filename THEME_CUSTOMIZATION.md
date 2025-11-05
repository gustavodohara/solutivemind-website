# Guía de Customización de Tema

Este proyecto usa un sistema de temas basado en CSS variables y Tailwind CSS v4.

## Cómo Cambiar Colores

### 1. Editar Variables CSS

Abre `src/app/globals.css` y busca las variables marcadas con `CUSTOMIZABLE`:

#### Light Mode
```css
:root {
  --primary: oklch(0.55 0.22 250);      /* Color principal */
  --secondary: oklch(0.97 0 0);         /* Color secundario */
  --accent: oklch(0.97 0 0);            /* Color de acento */
  --radius: 0.5rem;                     /* Border radius */
}
```

#### Dark Mode
```css
.dark {
  --primary: oklch(0.65 0.22 250);      /* Color principal (dark) */
  --secondary: oklch(0.269 0 0);        /* Color secundario (dark) */
  --accent: oklch(0.269 0 0);           /* Color de acento (dark) */
}
```

### 2. Formato OKLCH

Los colores usan formato OKLCH: `oklch(lightness chroma hue)`

- **Lightness (0-1)**: Claridad del color (0=negro, 1=blanco)
- **Chroma (0-0.4)**: Intensidad del color (0=gris, 0.4=saturado)
- **Hue (0-360)**: El color base (0=rojo, 120=verde, 240=azul, 250=azul vibrante)

#### ¿Por qué OKLCH?

OKLCH es superior a HSL porque:
- Perceptualmente uniforme (cambios consistentes en todo el espacio de color)
- Mejor saturación y brillo
- Colores más vibrantes y predecibles
- Diseñado para pantallas modernas

### 3. Herramientas Útiles

- [OKLCH Color Picker](https://oklch.com/) - El mejor picker para OKLCH
- [Color.js](https://colorjs.io/apps/picker/) - Convertir entre formatos
- [Coolors](https://coolors.co/) - Generar paletas (convertir a OKLCH después)
- [Adobe Color](https://color.adobe.com/) - Crear esquemas de color

### 4. Paletas de Ejemplo

Ve ejemplos en `src/lib/constants/theme-config.ts`:

**Verde esmeralda:**
```typescript
light: { primary: 'oklch(0.55 0.18 145)' }
dark: { primary: 'oklch(0.65 0.18 145)' }
```

**Púrpura:**
```typescript
light: { primary: 'oklch(0.55 0.24 300)' }
dark: { primary: 'oklch(0.65 0.24 300)' }
```

**Naranja:**
```typescript
light: { primary: 'oklch(0.65 0.20 50)' }
dark: { primary: 'oklch(0.70 0.20 50)' }
```

## Cambiar Border Radius

Para hacer el diseño más/menos redondeado:

```css
--radius: 0rem;      /* Sin redondeo (cuadrado) */
--radius: 0.25rem;   /* Poco redondeado */
--radius: 0.5rem;    /* Medio (default) */
--radius: 1rem;      /* Muy redondeado */
--radius: 9999px;    /* Completamente redondeado (píldora) */
```

## Probar Cambios

1. Inicia el servidor: `npm run dev`
2. Ve a `/theme-demo` para ver todos los componentes
3. Usa el toggle de dark mode para verificar ambos temas
4. Los cambios en `globals.css` se aplican inmediatamente (hot reload)

## Convertir HSL a OKLCH

Si tienes colores en HSL y quieres convertirlos a OKLCH:

1. Ve a https://oklch.com/
2. Ingresa tu color HSL
3. Copia el valor OKLCH resultante

Ejemplo:
- HSL: `hsl(240, 80%, 55%)`
- OKLCH: `oklch(0.55 0.22 250)`

## Tips de Accesibilidad

- Mantén suficiente contraste entre `primary` y `primary-foreground` (mínimo 4.5:1)
- En dark mode, usa colores más claros que en light mode
- Prueba la accesibilidad con:
  - [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
  - Herramientas de Chrome DevTools (Lighthouse)

## Estructura de Variables

El sistema de temas incluye:

- **Background colors**: fondo general y cards
- **Brand colors**: primary, secondary, accent
- **Semantic colors**: destructive (errores), muted (texto secundario)
- **UI colors**: border, input, ring (focus)
- **Chart colors**: para gráficos
- **Sidebar colors**: para navegación

Todas estas variables se pueden personalizar, pero las marcadas como `CUSTOMIZABLE` son las más importantes para la identidad visual.

## Troubleshooting

**¿Los colores no cambian?**
- Verifica que estás editando las variables correctas (`:root` para light, `.dark` para dark mode)
- Asegúrate de guardar el archivo
- Recarga la página si hot reload no funciona

**¿Colores extraños en dark mode?**
- Aumenta el valor de lightness en dark mode (primer número)
- Mantén el chroma similar entre light y dark mode

**¿Quieres más control?**
- Puedes añadir más variantes de colores (ej: `--primary-light`, `--primary-dark`)
- Solo asegúrate de usarlos en tus componentes con `bg-[var(--primary-light)]`
