"use client"

import { useState, useEffect } from "react"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BlogPostWithAuthor } from "@/lib/types"

interface BlogPreviewProps {
  posts: BlogPostWithAuthor[]
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const { t, language } = useLanguage()
  const featuredPosts = posts.slice(0, 3)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    if (featuredPosts.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPosts.length)
    }, 5000) // Auto-slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredPosts.length])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    if (featuredPosts.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length)
    }
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    if (featuredPosts.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % featuredPosts.length)
    }
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  if (featuredPosts.length === 0) {
    return null
  }

  return (
    <section className="pt-10 pb-10 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest Stories
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most recent adventures and travel insights
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {featuredPosts.map((post, index) => {
              const title = language === 'en' ? post.title_en : post.title_fr
              const description = language === 'en' ? post.description_en : post.description_fr

              return (
              <div
                key={post.slug}
                suppressHydrationWarning
                className={`absolute inset-0 transition-all duration-700 ${index === currentIndex
                  ? "opacity-100 translate-x-0"
                  : index < currentIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                  }`}
              >
                {/* Background Image */}
                <img
                  src={post.image ? (post.image.startsWith("/placeholder") ? "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070" : post.image) : "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"}
                  alt={title}
                  className="object-cover absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-8 md:p-12 lg:p-16">
                    <div className="max-w-3xl">
                      {/* Category Badge */}
                      <span className="inline-block px-4 py-2 bg-primary text-white rounded-full text-sm font-medium mb-4">
                        {post.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        {title}
                      </h3>

                      {/* Description */}
                      <div className="text-lg text-white/90 mb-6 line-clamp-2">
                        {description}
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-6 mb-6 text-white/80">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.author.avatar ? (post.author.avatar.startsWith("/placeholder") ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" : post.author.avatar) : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100"}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <span className="font-medium">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} {t.hero.readTime}</span>
                        </div>
                        <span>{post.date}</span>
                      </div>

                      {/* Read More Button */}
                      <Button
                        size="lg"
                        className="bg-white text-foreground hover:bg-white/90"
                        asChild
                      >
                        <Link href={`/blog/${post.slug}`}>
                          Read Full Story
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )})}

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all ${index === currentIndex
                    ? "w-12 h-3 bg-white rounded-full"
                    : "w-3 h-3 bg-white/50 rounded-full hover:bg-white/70"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails Preview */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 mt-6">
            {featuredPosts.map((post, index) => {
              const title = language === 'en' ? post.title_en : post.title_fr

              return (
              <button
                key={post.slug}
                onClick={() => handleDotClick(index)}
                className={`relative h-32 rounded-lg overflow-hidden transition-all ${index === currentIndex
                  ? "ring-4 ring-primary scale-105"
                  : "opacity-60 hover:opacity-100"
                  }`}
              >
                <img
                  src={post.image ? (post.image.startsWith("/placeholder") ? "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070" : post.image) : "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"}
                  alt={title}
                  className="object-cover absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium line-clamp-2">{title}</p>
                </div>
              </button>
            )})}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/blog">
              View All Stories
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
