"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    alert(t.contact.success)
      // Reset form
      ; (e.target as HTMLFormElement).reset()
  }

  return (
    <section className="container mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto max-w-2xl rounded-2xl bg-card p-8 shadow-lg border border-border">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-3">{t.contact.title}</h2>
          <p className="text-muted-foreground">
            {t.contact.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">{t.contact.name}</Label>
            <Input id="name" name="name" placeholder={t.contact.placeholder.name} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">{t.contact.email}</Label>
            <Input id="email" name="email" type="email" placeholder={t.contact.placeholder.email} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">{t.contact.message}</Label>
            <Textarea
              id="message"
              name="message"
              placeholder={t.contact.placeholder.message}
              className="min-h-[150px]"
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              t.contact.sending
            ) : (
              <>
                {t.contact.send}
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}
