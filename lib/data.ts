import type { BlogPostWithAuthor } from "./types"

// Mock data for homepage preview - matching the 3 posts from content folder
export const blogPosts: BlogPostWithAuthor[] = [
  {
    slug: "exploring-the-himalayas",
    title_en: "Exploring the Himalayas",
    title_fr: "Explorer l'Himalaya",
    description_en:
      "Discover the breathtaking beauty and spiritual essence of the Himalayan mountains through an unforgettable trekking adventure. The Himalayas have always held a special place in the hearts of adventurers and spiritual seekers alike.",
    description_fr:
      "Découvrez la beauté à couper le souffle et l'essence spirituelle des montagnes de l'Himalaya à travers une aventure de trekking inoubliable.",
    content_en: [],
    content_fr: [],
    category: "Destination",
    image: "/person-sitting-on-red-rock-formations-at-sunset-hi.jpg",
    author: {
      slug: "theodore-reginald",
      name: "Theodore Reginald",
      avatar: "/professional-male-travel-writer-avatar.jpg",
      bio_en: "Professional travel writer",
      bio_fr: "Écrivain de voyage professionnel",
    },
    date: "2024-12-15",
    readTime: 8,
    featured: true,
  },
  {
    slug: "coastal-adventures-greece",
    title_en: "Coastal Adventures Greece",
    title_fr: "Aventures Côtières en Grèce",
    description_en:
      "Experience the crystal-clear waters and charming villages of the Greek islands on this unforgettable coastal adventure. Each island has its own unique character, from the iconic white-washed buildings of Santorini to hidden coves of lesser-known gems.",
    description_fr:
      "Découvrez les eaux cristallines et les villages charmants des îles grecques lors de cette aventure côtière inoubliable.",
    content_en: [],
    content_fr: [],
    category: "Lifestyle",
    image: "/serene-beach-sunset-scenic-coastal-landscape.jpg",
    author: {
      slug: "seraphina-isabella",
      name: "Seraphina Isabella",
      avatar: "/professional-female-travel-blogger-avatar.jpg",
      bio_en: "Travel blogger and photographer",
      bio_fr: "Blogueuse de voyage et photographe",
    },
    date: "2024-12-20",
    readTime: 5,
    featured: true,
  },
  {
    slug: "culinary-journey-japan",
    title_en: "Culinary Journey Japan",
    title_fr: "Voyage Culinaire au Japon",
    description_en:
      "Explore the rich flavors and ancient traditions of Japanese cuisine, from street food stalls to Michelin-starred restaurants. From the bustling fish markets of Tokyo to the quiet tea houses of Kyoto, every meal is an opportunity to experience the country's deep respect for ingredients.",
    description_fr:
      "Explorez les saveurs riches et les traditions anciennes de la cuisine japonaise, des stands de nourriture de rue aux restaurants étoilés Michelin.",
    content_en: [],
    content_fr: [],
    category: "Culinary",
    image: "/gourmet-restaurant-food-plating-fine-dining-cuisin.jpg",
    author: {
      slug: "maximilian-bartholomew",
      name: "Maximilian Bartholomew",
      avatar: "/stylish-male-fashion-blogger-avatar.jpg",
      bio_en: "Fashion and lifestyle blogger",
      bio_fr: "Blogueur mode et lifestyle",
    },
    date: "2024-12-10",
    readTime: 6,
    featured: false,
  },
]
