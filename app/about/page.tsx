"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import { useLanguage } from "@/contexts/language-context"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section with Image */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2835"
          alt="About Me"
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
              {t.aboutPage.hero.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {t.aboutPage.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image */}
            <div className="space-y-6">
              <div className="relative aspect-3/4 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/personal_img/Picture2.png"
                  alt="Profile"
                  className="object-cover hover:scale-105 transition-transform duration-500 absolute inset-0 w-full h-full"
                />
              </div>

            </div>

            {/* Right Column - Text Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  {t.aboutPage.content.title}
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full mb-6" />
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t.aboutPage.content.p1}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t.aboutPage.content.p2}
                </p>
              </div>

              {/* Stats/Highlights */}
              {/* <div className="grid grid-cols-3 gap-6 py-8 border-y border-border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">{t.aboutPage.content.stats.countries}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">200+</div>
                  <div className="text-sm text-muted-foreground">{t.aboutPage.content.stats.cities}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                  <div className="text-sm text-muted-foreground">{t.aboutPage.content.stats.stories}</div>
                </div>
              </div> */}

              {/* Social Links or CTA */}
              <div className="pt-6">
                <a
                  href="/blog"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {t.aboutPage.content.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Text Left, Image Right */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Mission Text - Left */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">{t.aboutPage.content.mission.title}</h3>
              <div className="w-20 h-1 bg-primary rounded-full mb-6" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.aboutPage.content.mission.p1}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.aboutPage.content.mission.p2}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.aboutPage.content.mission.p3}
              </p>
            </div>

            {/* Image - Right */}
            <div className="relative aspect-3/4 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/personal_img/Picture1.jpg"
                alt="Mission"
                className="object-cover hover:scale-105 transition-transform duration-500 absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission2 Section - Image Left, Text Right */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image - Left */}
            <div className="relative aspect-3/4 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/personal_img/Picture4.png"
                alt="Mission 2"
                className="object-cover hover:scale-105 transition-transform duration-500 absolute inset-0 w-full h-full"
              />
            </div>

            {/* Mission2 Text - Right */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">{t.aboutPage.content.mission2.title}</h3>
              <div className="w-20 h-1 bg-primary rounded-full mb-6" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.aboutPage.content.mission2.p1}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.aboutPage.content.mission2.p2}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.aboutPage.content.mission2.p3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <blockquote className="text-3xl md:text-4xl font-light text-foreground italic leading-relaxed">
            "{t.aboutPage.quote.text}"
          </blockquote>
          <p className="text-lg text-muted-foreground mt-6">— {t.aboutPage.quote.author}</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
