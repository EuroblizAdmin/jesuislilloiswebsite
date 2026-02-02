import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutPreview } from "@/components/about-preview"
import { ExpeditionPreview } from "@/components/expedition/expedition-preview"
import { BlogPreview } from "@/components/blog/blog-preview"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'
import type { Expedition, BlogPostWithAuthor, Author } from '@/lib/types'

export default async function Home() {
  const reader = createReader(process.cwd(), keystaticConfig)

  // Fetch Expeditions
  const expeditionsData = await reader.collections.expeditions.all()
  const expeditions: Expedition[] = expeditionsData.map(exp => ({
    slug: exp.slug,
    ...exp.entry,
  }))

  // Fetch Posts & Authors
  const postsData = await reader.collections.posts.all()
  const authorsData = await reader.collections.authors.all()

  const authorsMap = new Map<string, Author>()
  authorsData.forEach(author => {
    authorsMap.set(author.slug, {
      slug: author.slug,
      ...author.entry,
    })
  })

  const posts: BlogPostWithAuthor[] = postsData.map(post => {
    const authorSlug = post.entry.author
    const author = authorSlug ? authorsMap.get(authorSlug) : null

    // Fallback author if missing
    const finalAuthor: Author = author || {
      slug: "unknown",
      name: "Unknown Author",
      avatar: null,
      bio_en: "",
      bio_fr: "",
    }

    // Destructure to remove non-serializable content functions and raw author slug
    const { content_en, content_fr, author: _, ...postFields } = post.entry

    return {
      slug: post.slug,
      ...postFields,
      content_en: [], // Content not needed for preview
      content_fr: [],
      author: finalAuthor,
    }
  })

  // Sort posts by date (newest first)
  posts.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutPreview />
      <ExpeditionPreview expeditions={expeditions} />
      <BlogPreview posts={posts} />
      {/* <ContactSection /> */}
      <Footer />
    </main>
  )
}
