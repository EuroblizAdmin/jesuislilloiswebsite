"use client"


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Expedition } from "@/lib/types"



interface ExpeditionPreviewProps {
  expeditions: Expedition[]
}

export function ExpeditionPreview({ expeditions }: ExpeditionPreviewProps) {
  const { t, language } = useLanguage()

  // Take only the first 4 expeditions for the preview
  const featuredExpeditions = expeditions.slice(0, 4)

  return (
    <section className="py-20 pb-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
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

        {/* Expeditions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredExpeditions.map((expedition, index) => {
            const title = expedition[`title_${language}` as keyof Expedition] as string
            const description = expedition[`description_${language}` as keyof Expedition] as string

            // Define colors based on index or slug if needed, or use a default gradient
            const gradients = [
              "from-orange-500/80 to-red-500/80",
              "from-blue-500/80 to-cyan-500/80",
              "from-purple-500/80 to-pink-500/80",
              "from-green-500/80 to-emerald-500/80",
            ]
            const color = gradients[index % gradients.length]

            return (
              <Link
                key={expedition.slug}
                href={`/expedition/${expedition.slug}`}
                suppressHydrationWarning
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image */}
                <div className="aspect-[3/4] relative">
                  <img
                    src={expedition.heroImage || "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070"}
                    alt={title}
                    className="object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0 w-full h-full"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Text */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {title}
                  </h3>
                  <div className="text-sm text-white/90 mb-4 line-clamp-3">
                    {description}
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center text-white font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm mr-2">{t.home.expedition.explore}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-300" />
              </Link>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-background rounded-2xl p-8 md:p-12 shadow-lg border border-border">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t.home.expedition.notFoundTitle}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t.home.expedition.notFoundText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/expedition">
                {t.home.expedition.viewAll}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            {/* <Button size="lg" variant="outline" asChild>
              <Link href="/book-appointment">
                {t.home.expedition.book}
              </Link>
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
