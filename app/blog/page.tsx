import { BlogPageClient } from "@/components/blog/blog-page-client"
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

export default async function BlogPage() {
  const reader = createReader(process.cwd(), keystaticConfig)

  // Fetch posts and authors from Keystatic
  const postsData = await reader.collections.posts.all()
  const authorsData = await reader.collections.authors.all()

  // Create author lookup map
  const authorsMap = new Map(
    authorsData.map(author => [
      author.slug,
      {
        slug: author.slug,
        name: author.entry.name,
        avatar: author.entry.avatar,
        bio_en: author.entry.bio_en,
        bio_fr: author.entry.bio_fr,
      }
    ])
  )

  // Transform posts data to include full author objects
  const posts = await Promise.all(postsData.map(async (post) => {
    const author = authorsMap.get(post.entry.author || '')

    // Load document content (they are async functions)
    const content_en = await post.entry.content_en()
    const content_fr = await post.entry.content_fr()

    const { author: _, content_en: __, content_fr: ___, ...postData } = post.entry

    return {
      slug: post.slug,
      ...postData,
      content_en,
      content_fr,
      author: author || {
        slug: 'unknown',
        name: 'Unknown Author',
        avatar: null,
        bio_en: '',
        bio_fr: '',
      }
    }
  }))

  return (
    <BlogPageClient posts={posts} />
  )
}
