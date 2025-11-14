import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export type CertificationType = 'soc2' | 'iso27001' | 'gdpr' | 'hipaa'

export interface ComplianceBadgeProps {
  certification: CertificationType
  verified?: boolean
  date?: string
  className?: string
}

const certificationData: Record<CertificationType, { name: string; icon: string }> = {
  soc2: { name: 'SOC 2', icon: '/images/certifications/soc2.svg' },
  iso27001: { name: 'ISO 27001', icon: '/images/certifications/iso27001.svg' },
  gdpr: { name: 'GDPR', icon: '/images/certifications/gdpr.svg' },
  hipaa: { name: 'HIPAA', icon: '/images/certifications/hipaa.svg' },
}

export function ComplianceBadge({
  certification,
  verified = false,
  date,
  className,
}: ComplianceBadgeProps) {
  const data = certificationData[certification]

  return (
    <div className={cn('flex items-center gap-2 rounded-lg border p-3', className)}>
      <Image
        src={data.icon}
        alt={data.name}
        width={32}
        height={32}
        className="object-contain"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{data.name}</span>
        {verified && (
          <Badge variant="secondary" className="w-fit text-xs">
            Verified
          </Badge>
        )}
        {date && <span className="text-xs text-muted-foreground">{date}</span>}
      </div>
    </div>
  )
}
