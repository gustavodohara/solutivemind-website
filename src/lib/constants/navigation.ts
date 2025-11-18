import { NavItem } from '@/lib/types'

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Servicios',
    href: '/servicios',
  },
  {
    label: 'Sobre Nosotros',
    href: '/nosotros',
  },
  {
    label: 'Contacto',
    href: '/contacto',
  },
]

export const CONTACT_INFO = {
  phone: '+54 9 11 2409 0216',
  whatsapp: '5491124090216', // Número sin espacios ni guiones
  whatsappMessage: '¡Hola! Quiero saber cómo puedo automatizar mi negocio.',
  address: 'Buenos Aires, Argentina',
  social: {
    instagram: 'https://www.instagram.com/solutive.mind/',
  },
}
