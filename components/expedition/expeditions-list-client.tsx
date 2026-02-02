"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Compass, Map, Camera, Backpack, Mountain, Palmtree, type LucideIcon } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Expedition } from "@/lib/types"

const iconMap: Record<string, LucideIcon> = {
  "adventure-tours": Mountain,
  "cultural-expeditions": Compass,
  "photography-tours": Camera,
  "trekking-expeditions": Backpack,
  "coastal-tours": Palmtree,
  "expedition-planning": Map,
}

interface ExpeditionsListClientProps {
  expeditions: Expedition[]
}

export function ExpeditionsListClient({ expeditions }: ExpeditionsListClientProps) {
  const { t, language } = useLanguage()

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070"
          alt="Expedition"
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              {t.home.expedition.badge}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {t.home.expedition.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.home.expedition.title}
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.home.expedition.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expeditions.map((expedition, index) => {
              const Icon = iconMap[expedition.slug] || Compass
              const title = expedition[`title_${language}` as keyof Expedition] as string
              const description = expedition[`description_${language}` as keyof Expedition] as string

              return (
                <Link
                  key={expedition.slug}
                  href={`/expedition/${expedition.slug}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={expedition.heroImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021"}
                      alt={title}
                      className="object-cover group-hover:scale-110 transition-transform duration-500 absolute inset-0 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary rounded-lg">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-muted-foreground mb-4 line-clamp-2">
                      {description}
                    </div>
                    {/* Features were hardcoded, omitting for now as they are not in the CMS */}
                    <div className="flex items-center justify-between text-primary font-medium group-hover:translate-x-2 transition-transform">
                      <span>{t.home.expedition.explore}</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.home.expedition.notFoundTitle}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t.home.expedition.notFoundText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Link
              href="/_book-appointment"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t.home.expedition.book}
            </Link> */}
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary border-2 border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              {t.galleryPage.hero.title}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
