"use client"

import { useEffect, useRef } from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const { t } = useLanguage()
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY
        requestAnimationFrame(() => {
          if (parallaxRef.current) {
            parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
          }
        })
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070"
          alt="Adventure Awaits"
          className="object-cover absolute inset-0 w-full h-full"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative flex h-full items-end justify-center pb-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up space-y-6">


            <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              {t.hero.title}
              <br />
              <span className="text-primary">{t.hero.highlight}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed" style={{ animationDelay: "0.1s" }}>
              {t.hero.subtitle}
            </p>
            
            <div className="pt-6" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" className="text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105" asChild>
                <Link href="/expedition">
                  {t.hero.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
