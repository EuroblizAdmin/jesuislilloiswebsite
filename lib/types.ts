export interface Author {
  slug: string
  name: string
  avatar: string | null
  bio_en: string
  bio_fr: string
}

export interface BlogPost {
  slug: string
  title_en: string
  title_fr: string
  description_en: string
  description_fr: string
  content_en: unknown // Keystatic document type
  content_fr: unknown
  category: "Destination" | "Culinary" | "Lifestyle" | "Tips & Hacks"
  image: string | null
  author: string | null // Author slug reference (not object)
  date: string | null
  readTime: number | null
  featured: boolean
}

export interface BlogPostWithAuthor extends Omit<BlogPost, 'author'> {
  author: Author
}

export interface Expedition {
  slug: string
  title_en: string
  title_fr: string
  tagline_en: string
  tagline_fr: string
  heroImage: string | null
  description_en: string
  description_fr: string
  testimonials: ReadonlyArray<{
    readonly name: string
    readonly rating: number | null
    readonly text_en: string
    readonly text_fr: string
  }>
}

export interface GalleryItem {
  slug: string
  title_en: string
  title_fr: string
  src: string | null
  category: "Adventure" | "Nature" | "Culture" | "Urban"
  location_en: string
  location_fr: string
}

export type CategoryFilter = "All" | BlogPost["category"]
export type SortOption = "Newest" | "Oldest"
export type GalleryCategoryFilter = "All" | GalleryItem["category"]
