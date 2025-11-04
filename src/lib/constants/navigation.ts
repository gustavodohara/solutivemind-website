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
  email: 'contacto@solutivemind.com',
  phone: '+54 9 11 2409 0216',
  whatsapp: '5491124090216', // Número sin espacios ni guiones
  whatsappMessage: '¡Hola! Me interesa obtener más información sobre sus servicios.',
  address: 'Buenos Aires, Argentina',
  social: {
    linkedin: 'https://linkedin.com/company/solutivemind',
    twitter: 'https://twitter.com/solutivemind',
    instagram: 'https://instagram.com/solutivemind',
  },
}
