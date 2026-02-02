"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogSection } from "./blog-section"
import { useLanguage } from "@/contexts/language-context"
import type { BlogPostWithAuthor } from "@/lib/types"

interface BlogPageClientProps {
  posts: BlogPostWithAuthor[]
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069"
          alt="Blog"
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
              {t.blogPage.hero.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {t.blogPage.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection posts={posts} />

      <Footer />
    </main>
  )
}
