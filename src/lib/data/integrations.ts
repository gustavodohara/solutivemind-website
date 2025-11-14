/**
 * Integrations data
 * Used in IntegrationGrid component
 */

export interface Integration {
  name: string
  logo: string
  category: 'ide' | 'tool' | 'platform'
  url?: string
}

export const INTEGRATIONS: Integration[] = [
  {
    name: 'Make',
    logo: '/images/integrations/make.svg',
    category: 'platform',
  },
  {
    name: 'Zapier',
    logo: '/images/integrations/zapier.svg',
    category: 'platform',
  },
  {
    name: 'Airtable',
    logo: '/images/integrations/airtable.svg',
    category: 'platform',
  },
  {
    name: 'Notion',
    logo: '/images/integrations/notion.svg',
    category: 'tool',
  },
  {
    name: 'Google Workspace',
    logo: '/images/integrations/google-workspace.svg',
    category: 'platform',
  },
  {
    name: 'Slack',
    logo: '/images/integrations/slack.svg',
    category: 'tool',
  },
  {
    name: 'OpenAI',
    logo: '/images/integrations/openai.svg',
    category: 'platform',
  },
  {
    name: 'Anthropic',
    logo: '/images/integrations/anthropic.svg',
    category: 'platform',
  },
  {
    name: 'Microsoft 365',
    logo: '/images/integrations/microsoft-365.svg',
    category: 'platform',
  },
  {
    name: 'Salesforce',
    logo: '/images/integrations/salesforce.svg',
    category: 'platform',
  },
  {
    name: 'HubSpot',
    logo: '/images/integrations/hubspot.svg',
    category: 'platform',
  },
  {
    name: 'Asana',
    logo: '/images/integrations/asana.svg',
    category: 'tool',
  },
]
