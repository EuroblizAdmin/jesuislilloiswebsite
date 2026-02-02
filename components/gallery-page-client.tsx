"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { GalleryItem } from "@/lib/types"

interface GalleryPageClientProps {
  images: GalleryItem[]
}

export function GalleryPageClient({ images: galleryImages }: GalleryPageClientProps) {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const categories = [
    { id: "All", label: t.galleryPage.categories.all },
    { id: "Adventure", label: t.galleryPage.categories.adventure },
    { id: "Nature", label: t.galleryPage.categories.nature },
    { id: "Culture", label: t.galleryPage.categories.culture },
    { id: "Urban", label: t.galleryPage.categories.urban },
  ]

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

  const handlePrevious = () => {
    if (selectedImage === null) return
    const currentIndex = filteredImages.findIndex(img => img.slug === selectedImage)
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
    setSelectedImage(filteredImages[prevIndex].slug)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    const currentIndex = filteredImages.findIndex(img => img.slug === selectedImage)
    const nextIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1
    setSelectedImage(filteredImages[nextIndex].slug)
  }

  const currentImage = filteredImages.find(img => img.slug === selectedImage)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2074"
          alt="Gallery"
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
              {t.galleryPage.hero.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {t.galleryPage.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted/30 border-b border-border sticky top-16 z-30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-background text-foreground hover:bg-muted"
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => {
              const title = image[`title_${language}` as keyof GalleryItem] as string
              const location = image[`location_${language}` as keyof GalleryItem] as string

              return (
                <div
                  key={image.slug}
                  className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
                  onClick={() => setSelectedImage(image.slug)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <img
                    src={image.src}
                    alt={title}
                    className="object-cover transition-transform duration-500 group-hover:scale-110 absolute inset-0 w-full h-full"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-bold mb-1">{title}</h3>
                      <p className="text-sm text-white/80 mb-2">{location}</p>
                      <span className="inline-block px-3 py-1 bg-primary/80 rounded-full text-xs">
                        {image.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground">No images found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen Modal */}
      {selectedImage !== null && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image Container */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4">
            <img
              src={currentImage.src}
              alt={currentImage[`title_${language}` as keyof GalleryItem] as string}
              className="object-contain absolute inset-0 w-full h-full"
            />
          </div>

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold text-white mb-2">
                {currentImage[`title_${language}` as keyof GalleryItem] as string}
              </h2>
              <p className="text-lg text-white/80 mb-3">
                {currentImage[`location_${language}` as keyof GalleryItem] as string}
              </p>
              <span className="inline-block px-4 py-2 bg-primary rounded-full text-white text-sm">
                {currentImage.category}
              </span>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            {filteredImages.findIndex(img => img.slug === selectedImage) + 1} / {filteredImages.length}
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
