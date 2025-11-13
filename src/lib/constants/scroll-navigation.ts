export interface ScrollSection {
  id: string
  label: string
  href: string
}

export const SCROLL_SECTIONS: ScrollSection[] = [
  { id: 'inicio', label: 'Inicio', href: '#inicio' },
  { id: 'features', label: 'Por qué elegirnos', href: '#features' },
  { id: 'servicios', label: 'Servicios', href: '#servicios' },
  { id: 'nosotros', label: 'Nosotros', href: '#nosotros' },
  { id: 'contacto', label: 'Contacto', href: '#contacto' },
]
