"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Expedition } from "@/lib/types"

interface ExpeditionPageClientProps {
  expedition: Expedition
}

export function ExpeditionPageClient({ expedition }: ExpeditionPageClientProps) {
  const { t, language } = useLanguage()

  const title = expedition[`title_${language}` as keyof Expedition] as string
  const tagline = expedition[`tagline_${language}` as keyof Expedition] as string
  const description = expedition[`description_${language}` as keyof Expedition] as string

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
        <img
          src={expedition.heroImage || "/placeholder.svg"}
          alt={title}
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center bottom-1/2">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-up">
              {title}
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {tagline}
            </p>
            {/* <Button size="lg" className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/book-appointment">{t.serviceDetailPage.bookBtn}</Link>
            </Button> */}
          </div>
        </div>
      </section>



      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12 flex items-center">
            <Button variant="secondary" size="sm" asChild className="-ml-3 text-muted-foreground hover:text-foreground">
              <Link href="/expedition">
                <ArrowLeft className="mr-1 h-4 w-4" />
                {t.serviceDetailPage.back}
              </Link>
            </Button>
          </div>
          <div className="space-y-24">
            {/* Overview */}
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold text-foreground mb-4">{t.serviceDetailPage.overview}</h2>
              <div className="w-20 h-1 bg-primary rounded-full mb-8 mx-auto" />
              <div className="text-xl text-muted-foreground leading-relaxed">
                {description}
              </div>
            </div>


            {/* Testimonials */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-foreground mb-6">{t.serviceDetailPage.reviews}</h2>
              <div className="w-20 h-1 bg-primary rounded-full mb-12 mx-auto" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {expedition.testimonials?.map((testimonial, index) => (
                  <div key={index} className="bg-muted/30 rounded-2xl p-8 shadow-sm flex flex-col h-full">
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(testimonial.rating || 0)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-lg text-foreground mb-6 italic leading-relaxed flex-grow">
                      "{testimonial[`text_${language}` as keyof typeof testimonial]}"
                    </p>
                    <p className="text-base font-semibold text-primary">— {testimonial.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
