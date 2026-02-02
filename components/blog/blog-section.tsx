"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { BlogCard } from "./blog-card"
import { BlogCardSkeleton } from "./blog-card-skeleton"
import type { CategoryFilter, SortOption, BlogPostWithAuthor } from "@/lib/types"
import { useLanguage } from "@/contexts/language-context"

interface BlogSectionProps {
  posts: BlogPostWithAuthor[]
}

export function BlogSection({ posts: blogPosts }: BlogSectionProps) {
  const [category, setCategory] = useState<CategoryFilter>("All")
  const [sortBy, setSortBy] = useState<SortOption>("Newest")
  const [displayCount, setDisplayCount] = useState(9)
  const [isLoading, setIsLoading] = useState(false)
  const { t, language } = useLanguage()

  const filteredAndSortedPosts = useMemo(() => {
    let posts =
      category === "All"
        ? blogPosts
        : blogPosts.filter((post) => post.category === category)

    posts = posts.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return sortBy === "Newest" ? dateB - dateA : dateA - dateB
    })

    return posts
  }, [category, sortBy])

  const displayedPosts = filteredAndSortedPosts.slice(0, displayCount)
  const hasMore = displayCount < filteredAndSortedPosts.length

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount((prev) => prev + 6)
      setIsLoading(false)
    }, 800)
  }

  return (
    <section className="container mx-auto max-w-7xl px-6 pt-16 pb-26">
      {/* Header */}
      <div className="mb-8 space-y-3">
        <h2 className="text-3xl font-bold">{t.blog.title}</h2>
        <p className="text-muted-foreground">
          {t.blog.description}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Mobile Category Buttons */}
        <div className="flex flex-wrap gap-2 sm:hidden">
          <Button
            variant={category === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory("All")}
            className="flex-1 min-w-[calc(33.333%-0.5rem)]"
          >
            {t.blog.all}
          </Button>
          <Button
            variant={category === "Destination" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory("Destination")}
            className="flex-1 min-w-[calc(33.333%-0.5rem)]"
          >
            {t.blog.destination}
          </Button>
          <Button
            variant={category === "Culinary" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory("Culinary")}
            className="flex-1 min-w-[calc(33.333%-0.5rem)]"
          >
            {t.blog.culinary}
          </Button>
          <Button
            variant={category === "Lifestyle" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory("Lifestyle")}
            className="flex-1 min-w-[calc(33.333%-0.5rem)]"
          >
            {t.blog.lifestyle}
          </Button>
          <Button
            variant={category === "Tips & Hacks" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory("Tips & Hacks")}
            className="flex-1 min-w-[calc(50%-0.25rem)]"
          >
            {t.blog.tipsHacks}
          </Button>
        </div>

        {/* Desktop Category Tabs */}
        <Tabs
          value={category}
          onValueChange={(value) => setCategory(value as CategoryFilter)}
          className="hidden sm:block"
        >
          <TabsList className="h-11 p-1.5 gap-1">
            <TabsTrigger value="All" className="px-6 py-2.5">{t.blog.all}</TabsTrigger>
            <TabsTrigger value="Destination" className="px-6 py-2.5">{t.blog.destination}</TabsTrigger>
            <TabsTrigger value="Culinary" className="px-6 py-2.5">{t.blog.culinary}</TabsTrigger>
            <TabsTrigger value="Lifestyle" className="px-6 py-2.5">{t.blog.lifestyle}</TabsTrigger>
            <TabsTrigger value="Tips & Hacks" className="px-6 py-2.5">{t.blog.tipsHacks}</TabsTrigger>
          </TabsList>
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              {t.blog.sortBy}: {sortBy === "Newest" ? t.blog.newest : t.blog.oldest}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy("Newest")}>{t.blog.newest}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("Oldest")}>{t.blog.oldest}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
        {isLoading && Array.from({ length: 3 }).map((_, i) => <BlogCardSkeleton key={`skeleton-${i}`} />)}
      </div>

      {/* Load More */}
      {hasMore && !isLoading && (
        <div className="mt-10 flex justify-center">
          <Button onClick={handleLoadMore} size="lg" variant="outline">
            {t.blog.loadMore}
          </Button>
        </div>
      )}

      {/* Pagination (Alternative) */}
      {!hasMore && filteredAndSortedPosts.length > 9 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(filteredAndSortedPosts.length / 9) }, (_, i) => (
            <Button key={i} variant={i === 0 ? "default" : "outline"} size="sm" className="h-10 w-10">
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </section>
  )
}
