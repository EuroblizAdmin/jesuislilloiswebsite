import { notFound } from "next/navigation"
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'
import { ExpeditionPageClient } from "@/components/expedition/expedition-page-client"
import type { Expedition } from '@/lib/types'

export async function generateStaticParams() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const expeditions = await reader.collections.expeditions.all()
  return expeditions.map(exp => ({ id: exp.slug }))
}

export default async function ServiceDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const reader = createReader(process.cwd(), keystaticConfig)
  const expedition = await reader.collections.expeditions.read(params.id)

  if (!expedition) {
    return notFound()
  }

  // const { longDescription_en: _, longDescription_fr: __, ...expeditionFields } = expedition

  const expeditionData: Expedition = {
    slug: params.id,
    ...expedition,
  }

  return <ExpeditionPageClient expedition={expeditionData} />
}
