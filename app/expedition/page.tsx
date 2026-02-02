import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'
import { ExpeditionsListClient } from "@/components/expedition/expeditions-list-client"
import type { Expedition } from '@/lib/types'

export default async function ExpeditionPage() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const expeditionsData = await reader.collections.expeditions.all()

  const expeditions: Expedition[] = expeditionsData.map(exp => ({
    slug: exp.slug,
    title_en: exp.entry.title_en,
    title_fr: exp.entry.title_fr,
    tagline_en: exp.entry.tagline_en,
    tagline_fr: exp.entry.tagline_fr,
    description_en: exp.entry.description_en,
    description_fr: exp.entry.description_fr,
    heroImage: exp.entry.heroImage,
    testimonials: exp.entry.testimonials,
  }))

  return <ExpeditionsListClient expeditions={expeditions} />
}