"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { BlogPostWithAuthor } from "@/lib/types"

interface BlogCardProps {
  post: BlogPostWithAuthor
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  const { language } = useLanguage()
  const title = post[`title_${language}` as keyof BlogPostWithAuthor] as string
  const description = post[`description_${language}` as keyof BlogPostWithAuthor] as string

  return (
    <article
      className="card-hover group overflow-hidden rounded-xl bg-card shadow-md"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${index * 100}ms forwards`,
      }}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={post.image || "/placeholder.svg"}
            alt={title}
            className="object-cover transition-transform duration-300 ease-out absolute inset-0 w-full h-full"
          />
          <Badge className="absolute left-4 top-4 bg-secondary/90 text-secondary-foreground backdrop-blur-sm">
            {post.category}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5">
          <h3 className="text-balance text-lg font-semibold leading-tight text-card-foreground line-clamp-2">
            {title}
          </h3>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground line-clamp-3">{description}</p>

          {/* Author Info */}
          <div className="flex items-center gap-2 pt-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{post.author.name}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readTime} mins read</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
