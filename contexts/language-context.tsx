"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { en, fr, type Translations } from "@/lib/i18n"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Translations> = {
  en,
  fr,
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Load language from localStorage on mount
  useEffect(() => {
    setMounted(true)
    try {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
        setLanguageState(savedLanguage)
      }
    } catch (e) {
      console.warn("Failed to access localStorage:", e)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("language", lang)
    } catch (e) {
      console.warn("Failed to save language to localStorage:", e)
    }
  }

  const value = {
    language: mounted ? language : "en",
    setLanguage,
    t: translations[mounted ? language : "en"],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
