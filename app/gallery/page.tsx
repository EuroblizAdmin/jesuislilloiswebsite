import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'
import { GalleryPageClient } from "@/components/gallery-page-client"
import type { GalleryItem } from '@/lib/types'

export default async function GalleryPage() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const galleryData = await reader.collections.gallery.all()

  const images: GalleryItem[] = galleryData.map(item => ({
    slug: item.slug,
    ...item.entry,
  }))

  return <GalleryPageClient images={images} />
}
