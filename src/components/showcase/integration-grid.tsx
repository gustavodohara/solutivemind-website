import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface Integration {
  name: string
  logo: string
  category: 'ide' | 'tool' | 'platform'
  url?: string
}

export interface IntegrationGridProps {
  integrations: Integration[]
  columns?: 2 | 3 | 4
  showCategories?: boolean
  className?: string
}

export function IntegrationGrid({
  integrations,
  columns = 4,
  showCategories = false,
  className,
}: IntegrationGridProps) {
  const columnClasses = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }

  const groupedByCategory = showCategories
    ? integrations.reduce((acc, integration) => {
        if (!acc[integration.category]) {
          acc[integration.category] = []
        }
        acc[integration.category].push(integration)
        return acc
      }, {} as Record<string, Integration[]>)
    : { all: integrations }

  return (
    <div className={cn('space-y-12', className)}>
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <div key={category}>
          {showCategories && (
            <h3 className="text-xl font-semibold mb-6 capitalize">{category}</h3>
          )}
          <div className={cn('grid gap-8', columnClasses[columns])}>
            {items.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-center p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {integration.url ? (
                  <Link href={integration.url} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={integration.logo}
                      alt={integration.name}
                      width={100}
                      height={40}
                      className="object-contain"
                    />
                  </Link>
                ) : (
                  <Image
                    src={integration.logo}
                    alt={integration.name}
                    width={100}
                    height={40}
                    className="object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
