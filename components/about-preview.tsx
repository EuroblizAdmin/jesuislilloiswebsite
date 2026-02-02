"use client"


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Users, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function AboutPreview() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 lg:order-1">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                {t.home.about.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {t.home.about.title}
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full mb-6" />
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.home.about.p1}
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.home.about.p2}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">{t.home.about.features.explorer}</h4>
                <p className="text-xs text-muted-foreground">{t.home.about.features.explorerDesc}</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">{t.home.about.features.community}</h4>
                <p className="text-xs text-muted-foreground">{t.home.about.features.communityDesc}</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">{t.home.about.features.guide}</h4>
                <p className="text-xs text-muted-foreground">{t.home.about.features.guideDesc}</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button size="lg" asChild>
                <Link href="/about">
                  {t.home.about.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="relative lg:order-2">
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/personal_img/Picture3.png"
                alt="Travel Explorer"
                className="object-cover hover:scale-105 transition-transform duration-700 absolute inset-0 w-full h-full"
              />
            </div>

            {/* Floating Stats Card */}
            {/* <div className="absolute -bottom-8 -left-8 bg-white dark:bg-card rounded-2xl shadow-2xl p-6 border border-border max-w-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">50+</div>
                  <div className="text-xs text-muted-foreground">{t.home.about.stats.countries}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">200+</div>
                  <div className="text-xs text-muted-foreground">{t.home.about.stats.cities}</div>
                </div>
                <div className="text-center col-span-2">
                  <div className="text-3xl font-bold text-primary mb-1">1000+</div>
                  <div className="text-xs text-muted-foreground">{t.home.about.stats.stories}</div>
                </div>
              </div>
            </div> */}

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
