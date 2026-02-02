"use client"

import Link from "next/link"
import { Twitter } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-foreground text-background">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/jesuislillois.png"
                alt="Je Suis Lillois"
                className="h-14 w-auto"
              />
            </Link>
            {/* <p className="text-pretty text-sm text-background/80 leading-relaxed">
              {t.footer.mission}
            </p> */}
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="mb-4 font-semibold">{t.footer.explore}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-background/80 transition-colors hover:text-background">
                  {t.navbar.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-background/80 transition-colors hover:text-background">
                  {t.navbar.aboutMe}
                </Link>
              </li>
              <li>
                <Link href="/expedition" className="text-background/80 transition-colors hover:text-background">
                  {t.navbar.expedition}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-background/80 transition-colors hover:text-background">
                  {t.navbar.gallery}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resource Links */}
          <div>
            <h4 className="mb-4 font-semibold">{t.footer.resources}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/blog" className="text-background/80 transition-colors hover:text-background">
                  {t.navbar.blog}
                </Link>
              </li>
              {/* <li>
                <Link href="/book-appointment" className="text-background/80 transition-colors hover:text-background">
                  {t.navbar.bookAppointment}
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-background/20 pt-8 items-center">
          <p className="text-sm text-background/80 text-center md:text-left">{t.footer.copyright}</p>
          <div className="flex items-center justify-center gap-2">
            <Link href="#" className="text-background/80 transition-colors hover:text-background">
              {t.footer.privacyPolicy}
            </Link>
            <span className="text-background/60">•</span>
            <Link href="#" className="text-background/80 transition-colors hover:text-background">
              {t.footer.termsOfService}
            </Link>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-3">
            {/* LinkedIn */}
            <Link
              href="#"
              className="rounded-full bg-background/10 p-2 text-background transition-colors hover:bg-background/20"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
            {/* X (Twitter) */}
            <Link
              href="#"
              className="rounded-full bg-background/10 p-2 text-background transition-colors hover:bg-background/20"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            {/* <Link
              href="#"
              className="rounded-full bg-background/10 p-2 text-background transition-colors hover:bg-background/20"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="rounded-full bg-background/10 p-2 text-background transition-colors hover:bg-background/20"
            >
              <Facebook className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="rounded-full bg-background/10 p-2 text-background transition-colors hover:bg-background/20"
            >
              <Youtube className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="rounded-full bg-background/10 p-2 text-background transition-colors hover:bg-background/20"
            >
              <Music className="h-4 w-4" />
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
