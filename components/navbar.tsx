"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"

import { Search, Globe, Check, Menu, X, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"

interface SearchResult {
  slug: string
  title: string
  description: string
  heroImage: string | null
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10)
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Don't close if clicking on a link (let the navigation happen first)
      if (target.tagName === 'A' || target.closest('a')) {
        return
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setShowSearchResults(false)
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(target)) {
        // We can handle mobile search close separately if needed, 
        // but typically mobile menu overlay handles outside clicks for the whole menu.
        // If we want to strictly close search results on inside-menu click:
        // setShowSearchResults(false) - but be careful not to close on input click.
        // actually for now, let's keep it simple.
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounced search function
  const debouncedSearch = useCallback(
    async (query: string, lang: string) => {
      if (!query.trim()) {
        setSearchResults([])
        setShowSearchResults(false)
        return
      }

      setIsSearching(true)
      try {
        const response = await fetch(`/api/search/expeditions?q=${encodeURIComponent(query)}&lang=${lang}`)
        if (!response.ok) throw new Error('Search failed')
        const data = await response.json()
        setSearchResults(data.results || [])
        setShowSearchResults(data.results && data.results.length > 0)
      } catch (error) {
        console.error('Search error:', error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    },
    []
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedSearch(searchQuery, language)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, language, debouncedSearch])

  const handleSearchClick = () => {
    // Defer state cleanup to allow Link navigation to initiate first
    setTimeout(() => {
      setSearchQuery("")
      setShowSearchResults(false)
      setIsMobileMenuOpen(false)
    }, 0)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/jesuislillois.png"
            alt="Je Suis Lillois"
            className="h-13 w-auto"
            style={{ filter: 'invert(1) brightness(0)' }}
          />
        </Link>

        {/* Center Navigation Menu */}
        <nav className="hidden md:flex items-center gap-6 xl:gap-8">
          <Link href="/" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary whitespace-nowrap">
            {t.navbar.home}
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary whitespace-nowrap">
            {t.navbar.aboutMe}
          </Link>
          <Link href="/expedition" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary whitespace-nowrap">
            {t.navbar.expedition}
          </Link>
          <Link href="/gallery" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary whitespace-nowrap">
            {t.navbar.gallery}
          </Link>
          <Link href="/blog" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary whitespace-nowrap">
            {t.navbar.blog}
          </Link>
          {/* <Link href="/book-appointment" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary whitespace-nowrap">
            {t.navbar.bookAppointment}
          </Link> */}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{language.toUpperCase()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")} className="flex items-center justify-between">
                <span>English</span>
                {language === "en" && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("fr")} className="flex items-center justify-between">
                <span>Français</span>
                {language === "fr" && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Bar */}
          <div className="relative hidden lg:block" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t.navbar.searchPlaceholder}
              className="w-52 bg-secondary/50 pl-10 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
            />

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="p-2 border-b border-border">
                  <p className="text-xs text-muted-foreground font-medium">
                    {searchResults.length} {searchResults.length === 1 ? 'expedition' : 'expeditions'} found
                  </p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {searchResults.map((result) => (
                    <Link
                      key={result.slug}
                      href={`/expedition/${result.slug}`}
                      onClick={handleSearchClick}
                      className="block p-3 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={result.heroImage || "/placeholder.svg"}
                          alt={result.title}
                          className="w-12 h-12 rounded object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground truncate">{result.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{result.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="p-2 border-t border-border">
                  <Link
                    href="/expedition"
                    onClick={() => {
                      setTimeout(() => {
                        setShowSearchResults(false)
                        setIsMobileMenuOpen(false)
                      }, 0)
                    }}
                    className="text-xs text-primary hover:underline flex items-center justify-center gap-1"
                  >
                    View all expeditions
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}

            {/* No Results */}
            {showSearchResults && searchQuery && searchResults.length === 0 && !isSearching && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-background border border-border rounded-lg shadow-lg z-50 p-4">
                <p className="text-sm text-muted-foreground text-center">No expeditions found</p>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-70 bg-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Content */}
          <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
            <Link
              href="/"
              className="px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navbar.home}
            </Link>
            <Link
              href="/about"
              className="px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navbar.aboutMe}
            </Link>
            <Link
              href="/expedition"
              className="px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navbar.expedition}
            </Link>
            <Link
              href="/gallery"
              className="px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navbar.gallery}
            </Link>
            <Link
              href="/blog"
              className="px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navbar.blog}
            </Link>
            {/* <Link
              href="/book-appointment"
              className="px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navbar.bookAppointment}
            </Link> */}

            {/* Mobile Language Switcher */}
            <div className="mt-4 pt-4 border-t">
              <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">Language</p>
              <button
                onClick={() => {
                  setLanguage("en")
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full px-4 py-3 text-sm font-medium text-left hover:bg-secondary rounded-md transition-colors flex items-center justify-between ${language === "en" ? "text-primary" : "text-foreground/80"
                  }`}
              >
                <span>English</span>
                {language === "en" && <Check className="h-4 w-4" />}
              </button>
              <button
                onClick={() => {
                  setLanguage("fr")
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full px-4 py-3 text-sm font-medium text-left hover:bg-secondary rounded-md transition-colors flex items-center justify-between ${language === "fr" ? "text-primary" : "text-foreground/80"
                  }`}
              >
                <span>Français</span>
                {language === "fr" && <Check className="h-4 w-4" />}
              </button>
            </div>

            {/* Mobile Search */}
            <div className="mt-4 pt-4 border-t" ref={mobileSearchRef}>
              <div className="relative px-4">
                <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t.navbar.searchPlaceholder}
                  className="w-full bg-secondary/50 pl-10 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                />
              </div>

              {/* Mobile Search Results */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="mt-2 px-4">
                  <div className="bg-background border border-border rounded-lg shadow-lg overflow-hidden">
                    <div className="p-2 border-b border-border">
                      <p className="text-xs text-muted-foreground font-medium">
                        {searchResults.length} {searchResults.length === 1 ? 'expedition' : 'expeditions'} found
                      </p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {searchResults.map((result) => (
                        <Link
                          key={result.slug}
                          href={`/expedition/${result.slug}`}
                          onClick={handleSearchClick}
                          className="block p-3 hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={result.heroImage || "/placeholder.svg"}
                              alt={result.title}
                              className="w-10 h-10 rounded object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-foreground truncate">{result.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{result.description}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="p-2 border-t border-border">
                      <Link
                        href="/expedition"
                        onClick={() => {
                          setTimeout(() => {
                            setShowSearchResults(false)
                            setIsMobileMenuOpen(false)
                          }, 0)
                        }}
                        className="text-xs text-primary hover:underline flex items-center justify-center gap-1"
                      >
                        View all expeditions
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile No Results */}
              {showSearchResults && searchQuery && searchResults.length === 0 && !isSearching && (
                <div className="mt-2 px-4">
                  <div className="bg-background border border-border rounded-lg shadow-lg p-4">
                    <p className="text-sm text-muted-foreground text-center">No expeditions found</p>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
