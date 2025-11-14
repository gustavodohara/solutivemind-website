/**
 * Partners / Technologies data
 * Used in LogoCarousel component
 */

export interface Partner {
  name: string
  src: string
  alt: string
  url?: string
}

export const PARTNERS: Partner[] = [
  {
    name: 'Make',
    src: '/images/partners/make.svg',
    alt: 'Make logo',
    url: 'https://www.make.com',
  },
  {
    name: 'Zapier',
    src: '/images/partners/zapier.svg',
    alt: 'Zapier logo',
    url: 'https://zapier.com',
  },
  {
    name: 'Airtable',
    src: '/images/partners/airtable.svg',
    alt: 'Airtable logo',
    url: 'https://airtable.com',
  },
  {
    name: 'Notion',
    src: '/images/partners/notion.svg',
    alt: 'Notion logo',
    url: 'https://notion.so',
  },
  {
    name: 'Google Workspace',
    src: '/images/partners/google-workspace.svg',
    alt: 'Google Workspace logo',
    url: 'https://workspace.google.com',
  },
  {
    name: 'Slack',
    src: '/images/partners/slack.svg',
    alt: 'Slack logo',
    url: 'https://slack.com',
  },
  {
    name: 'OpenAI',
    src: '/images/partners/openai.svg',
    alt: 'OpenAI logo',
    url: 'https://openai.com',
  },
  {
    name: 'Anthropic',
    src: '/images/partners/anthropic.svg',
    alt: 'Anthropic logo',
    url: 'https://anthropic.com',
  },
]
