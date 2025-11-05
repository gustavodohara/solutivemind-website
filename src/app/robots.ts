import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://solutivemind.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/theme-demo/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
