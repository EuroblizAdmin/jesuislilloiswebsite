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

  // Resume auto-play after inactivity
  useEffect(() => {
    if (isAutoPlaying) return

    const timeout = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 7000) // Resume after 10 seconds of no manual interaction

    return () => clearTimeout(timeout)
  }, [isAutoPlaying])

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAutoPlaying(false)
    if (featuredPosts.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length)
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
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
    <section 
      className="pt-10 pb-10 bg-muted/30"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
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
        <div className="relative group/carousel">
          {/* Main Carousel */}
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
            {featuredPosts.map((post, index) => {
              const title = language === 'en' ? post.title_en : post.title_fr
              const description = language === 'en' ? post.description_en : post.description_fr

              return (
              <div
                key={post.slug}
                suppressHydrationWarning
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentIndex
                  ? "opacity-100 scale-100 translate-x-0"
                  : index < currentIndex
                    ? "opacity-0 scale-105 -translate-x-full"
                    : "opacity-0 scale-105 translate-x-full"
                  }`}
              >
                {/* Background Image */}
                <img
                  src={post.image ? (post.image.startsWith("/placeholder") ? "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070" : post.image) : "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"}
                  alt={title}
                  className="object-cover absolute inset-0 w-full h-full transition-transform duration-[10000ms] ease-linear hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-8 md:p-12 lg:p-16">
                    <div className="max-w-3xl">
                      {/* Category Badge */}
                      <span className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        {post.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        {title}
                      </h3>

                      {/* Description */}
                      <div className="text-lg md:text-xl text-white/80 mb-8 line-clamp-2 max-w-2xl">
                        {description}
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-6 mb-8 text-white/70">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.author.avatar ? (post.author.avatar.startsWith("/placeholder") ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" : post.author.avatar) : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100"}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full border-2 border-white/20"
                          />
                          <span className="font-semibold text-white">{post.author.name}</span>
                        </div>
                        <div className="h-4 w-px bg-white/20 hidden sm:block" />
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{post.readTime} {t.hero.readTime}</span>
                        </div>
                        <div className="h-4 w-px bg-white/20 hidden sm:block" />
                        <span>{post.date}</span>
                      </div>

                      {/* Read More Button */}
                      <Button
                        size="lg"
                        className="bg-white text-foreground hover:bg-primary hover:text-white rounded-full px-8 h-14 font-bold transition-all"
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

            {/* Desktop Navigation Arrows (Inside but refined) */}
            <div className="hidden md:block">
              <Button
                variant="outline"
                size="icon"
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 rounded-full h-14 w-14 bg-black/20 backdrop-blur-md border-white/20 text-white hover:bg-primary hover:border-primary transition-all opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0 duration-300"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full h-14 w-14 bg-black/20 backdrop-blur-md border-white/20 text-white hover:bg-primary hover:border-primary transition-all opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0 duration-300"
                onClick={handleNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-10 left-1/2 hidden md:flex gap-3 z-10">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-500 ${index === currentIndex
                    ? "w-10 h-2 bg-white rounded-full"
                    : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/70"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all shadow-md"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all shadow-md"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
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
        <div className="text-center mt-10">
          <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold group" asChild>
            <Link href="/blog">
              View All Stories
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
