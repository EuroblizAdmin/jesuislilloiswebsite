"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Calendar, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { DocumentRenderer } from '@keystatic/core/renderer'
import type { BlogPostWithAuthor, Author } from '@/lib/types'

interface BlogPostClientProps {
  post: BlogPostWithAuthor
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const { t, language } = useLanguage()
  const title = language === 'en' ? post.title_en : post.title_fr
  const description = language === 'en' ? post.description_en : post.description_fr
  const content = language === 'en' ? post.content_en : post.content_fr

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/30 z-10" />
        <img
          src={post.image || "/placeholder.svg"}
          alt={title}
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 sm:pb-20">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="flex flex-wrap items-center gap-3 mb-4 animate-fade-in-up">
              <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm py-1">
                {post.category}
              </Badge>
              <div className="flex items-center gap-2 text-white/90 text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} {t.blogPostPage.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {title}
            </h1>

            <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 bg-card/10 backdrop-blur-md p-2 pr-4 rounded-full border border-white/10">
                <Avatar className="h-10 w-10 border-2 border-white/20">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{post.author.name}</span>
                  <span className="text-xs text-white/80">{t.blogPostPage.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <article className="container mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="-ml-3 text-muted-foreground hover:text-foreground">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.blogPostPage.back}
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            {t.blogPostPage.share}
          </Button>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl max-w-none">
          <div className="lead text-xl text-muted-foreground mb-8 font-medium italic border-l-4 border-primary pl-4">
            {description}
          </div>
          <DocumentRenderer document={content} />
        </div>

        <Separator className="my-12" />

        {/* Author Bio */}
        <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-xl border border-border/50">
          <Avatar className="h-16 w-16 border border-border">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback className="text-lg">{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-lg">{post.author.name}</h3>
            <p className="text-muted-foreground text-sm">
              {post.author[`bio_${language}` as keyof Author] || t.blogPostPage.writtenBy}
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
