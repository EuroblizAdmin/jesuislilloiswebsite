"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { CalendarIcon, Clock, CheckCircle2, User, Mail, Phone, MessageSquare } from "lucide-react"

import { cn } from "@/lib/utils"

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
]

export default function BookAppointmentPage() {
  const { t } = useLanguage()
  const [date, setDate] = useState<Date>()
  const [selectedService, setSelectedService] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const services = [
    { value: "adventure-tours", label: t.bookingPage.form.service.options.adventure, price: "$1,299 - $2,499" },
    { value: "cultural-expeditions", label: t.bookingPage.form.service.options.cultural, price: "$999 - $1,999" },
    { value: "photography-tours", label: t.bookingPage.form.service.options.photography, price: "$1,199 - $2,299" },
    { value: "trekking-expeditions", label: t.bookingPage.form.service.options.trekking, price: "$1,499 - $2,999" },
    { value: "coastal-tours", label: t.bookingPage.form.service.options.coastal, price: "$1,099 - $2,199" },
    { value: "expedition-planning", label: t.bookingPage.form.service.options.planning, price: "From $299" },
  ]

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: "1",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({
      ...formData,
      service: selectedService,
      date: date,
      time: selectedTime,
    })
    setIsSubmitted(true)
  }

  const selectedServiceDetails = services.find(s => s.value === selectedService)

  if (isSubmitted) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 max-w-2xl">
          <Card className="text-center shadow-2xl border-primary/20">
            <CardContent className="pt-12 pb-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {t.bookingPage.success.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t.bookingPage.success.message}
              </p>
              <div className="bg-muted/30 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-bold text-lg mb-4">{t.bookingPage.success.summary}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.bookingPage.summary.service}:</span>
                    <span className="font-medium">{selectedServiceDetails?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.bookingPage.summary.date}:</span>
                    <span className="font-medium">{date ? format(date, "PPP") : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.bookingPage.summary.time}:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.bookingPage.summary.guests}:</span>
                    <span className="font-medium">{formData.guests}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.location.href = "/"} variant="outline">
                  {t.bookingPage.success.home}
                </Button>
                <Button onClick={() => window.location.href = "/expedition"}>
                  {t.bookingPage.success.services}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070"
          alt="Book Appointment"
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
              {t.bookingPage.hero.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {t.bookingPage.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-3xl">{t.bookingPage.form.title}</CardTitle>
                  <CardDescription>
                    {t.bookingPage.form.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Service Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-base flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {t.bookingPage.form.service.label} *
                      </Label>
                      <Select value={selectedService} onValueChange={setSelectedService} required>
                        <SelectTrigger id="service" className="h-12">
                          <SelectValue placeholder={t.bookingPage.form.service.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              <div className="flex flex-col">
                                <span>{service.label}</span>
                                <span className="text-xs text-muted-foreground">{service.price}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date and Time */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-base flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-primary" />
                          {t.bookingPage.form.date.label} *
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full h-12 justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : t.bookingPage.form.date.placeholder}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-base flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          {t.bookingPage.form.time.label} *
                        </Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime} required>
                          <SelectTrigger id="time" className="h-12">
                            <SelectValue placeholder={t.bookingPage.form.time.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4 pt-4 border-t border-border">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        {t.bookingPage.form.personal}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">{t.bookingPage.form.firstName} *</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="h-12"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">{t.bookingPage.form.lastName} *</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {t.bookingPage.form.email} *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="h-12"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {t.bookingPage.form.phone} *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="guests">{t.bookingPage.form.guests.label} *</Label>
                        <Select value={formData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                          <SelectTrigger id="guests" className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? t.bookingPage.form.guests.singular : t.bookingPage.form.guests.plural}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          {t.bookingPage.form.message.label}
                        </Label>
                        <Textarea
                          id="message"
                          placeholder={t.bookingPage.form.message.placeholder}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="min-h-32"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" size="lg" className="w-full h-12 text-base">
                      {t.bookingPage.form.submit}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      {t.bookingPage.form.disclaimer}
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Summary & Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Booking Summary */}
              <Card className="shadow-lg  top-24">
                <CardHeader>
                  <CardTitle>{t.bookingPage.summary.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedService ? (
                    <>
                      <div className="pb-4 border-b border-border">
                        <p className="text-sm text-muted-foreground mb-1">{t.bookingPage.summary.service}</p>
                        <p className="font-bold text-lg">{selectedServiceDetails?.label}</p>
                        <p className="text-sm text-primary">{selectedServiceDetails?.price}</p>
                      </div>

                      {date && (
                        <div className="pb-4 border-b border-border">
                          <p className="text-sm text-muted-foreground mb-1">{t.bookingPage.summary.date}</p>
                          <p className="font-medium">{format(date, "PPPP")}</p>
                        </div>
                      )}

                      {selectedTime && (
                        <div className="pb-4 border-b border-border">
                          <p className="text-sm text-muted-foreground mb-1">{t.bookingPage.summary.time}</p>
                          <p className="font-medium">{selectedTime}</p>
                        </div>
                      )}

                      {formData.guests && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{t.bookingPage.summary.guests}</p>
                          <p className="font-medium">{formData.guests} {formData.guests === "1" ? t.bookingPage.form.guests.singular : t.bookingPage.form.guests.plural}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      {t.bookingPage.summary.notSelected}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{t.bookingPage.help.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    {t.bookingPage.help.text}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>info@horizone.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
