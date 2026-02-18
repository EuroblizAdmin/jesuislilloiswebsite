import { notFound } from "next/navigation"
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'
import { BlogPostClient } from "@/components/blog/blog-post-client"
import type { BlogPostWithAuthor } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const posts = await reader.collections.posts.all()
  return posts.map(post => ({ slug: post.slug }))
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const reader = createReader(process.cwd(), keystaticConfig)
  const postData = await reader.collections.posts.read(params.slug)

  if (!postData) {
    return notFound()
  }

  // Get author data
  const authorData = await reader.collections.authors.read(postData.author || '')

  // Load document content (they are async functions)
  const content_en = await postData.content_en()
  const content_fr = await postData.content_fr()

  const { author: _, content_en: __, content_fr: ___, ...postFields } = postData

  const post: BlogPostWithAuthor = {
    slug: params.slug,
    ...postFields,
    content_en,
    content_fr,
    author: authorData ? {
      slug: postData.author || '',
      name: authorData.name,
      avatar: authorData.avatar,
      bio_en: authorData.bio_en,
      bio_fr: authorData.bio_fr,
    } : {
      slug: 'unknown',
      name: 'Unknown Author',
      avatar: null,
      bio_en: '',
      bio_fr: '',
    }
  }

  return <BlogPostClient post={post} />
}
