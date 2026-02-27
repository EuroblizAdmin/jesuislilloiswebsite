"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Expedition } from "@/lib/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

interface ExpeditionPreviewProps {
  expeditions: Expedition[]
}

export function ExpeditionPreview({ expeditions }: ExpeditionPreviewProps) {
  const { t, language } = useLanguage()
  const [api, setApi] = useState<CarouselApi>()
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Implement auto-play
  useEffect(() => {
    if (!api || !isAutoPlaying) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000) // Resume after 5 seconds of no manual interaction

    return () => clearInterval(interval)
  }, [api, isAutoPlaying])

  // Resume auto-play after inactivity
  useEffect(() => {
    if (isAutoPlaying) return

    const timeout = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 7000) // Resume after 7 seconds of no manual interaction

    return () => clearTimeout(timeout)
  }, [isAutoPlaying])

  const handlePrevious = () => {
    api?.scrollPrev()
    setIsAutoPlaying(false)
  }

  const handleNext = () => {
    api?.scrollNext()
    setIsAutoPlaying(false)
  }

  return (
    <section 
      className="py-20 bg-muted/30 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 tracking-wide">
            {t.home.expedition.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.home.expedition.title}
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.home.expedition.subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative group/carousel">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {expeditions.map((expedition) => {
                const title = expedition[`title_${language}` as keyof Expedition] as string
                const tagline = expedition[`tagline_${language}` as keyof Expedition] as string
                const description = expedition[`description_${language}` as keyof Expedition] as string

                return (
                  <CarouselItem key={expedition.slug} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <div 
                      className="group relative h-[500px] overflow-hidden rounded-3xl bg-background border border-border/50 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                      suppressHydrationWarning
                    >
                      {/* Image Container */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={expedition.heroImage || "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070"}
                          alt={title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlays */}
                        <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
                      </div>

                      {/* Content Container */}
                      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end text-white">
                        <div className="transition-transform duration-500">
                          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                            {tagline || "Discovery"}
                          </span>
                          <h3 className="text-3xl font-bold mb-3 leading-tight">
                            {title}
                          </h3>
                          <div className="text-sm text-white/80 line-clamp-3 mb-6">
                            {description}
                          </div>
                          
                          <Link 
                            href={`/expedition/${expedition.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase group/link"
                          >
                            <span className="relative">
                              {t.home.expedition.explore}
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
                            </span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            
            {/* Desktop Navigation Buttons */}
            <div className="hidden lg:block">
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 rounded-full h-12 w-12 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0 duration-300"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 rounded-full h-12 w-12 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0 duration-300"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </Carousel>
        </div>

        {/* Mobile/Tablet Navigation Buttons */}
        <div className="flex lg:hidden justify-center gap-4 mt-8">
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

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold group" asChild>
            <Link href="/expedition">
              {t.home.expedition.viewAll}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
