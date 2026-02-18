import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: process.env.NEXT_PUBLIC_GITHUB_OWNER!,
      name: process.env.NEXT_PUBLIC_GITHUB_REPO!,
    },
  },
  ui: {
    brand: {
      name: 'Travel Blog CMS',
    },
  },

  collections: {
    // Blog Posts Collection
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title_en',
      path: 'content/posts/*/',
      format: { data: 'yaml' },
      schema: {
        // English Content
        title_en: fields.slug({ name: { label: 'Title (English)' } }),
        description_en: fields.text({
          label: 'Description (English)',
          multiline: true,
        }),
        content_en: fields.document({
          label: 'Content (English)',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/posts',
            publicPath: '/images/posts/',
          },
        }),

        // French Content
        title_fr: fields.text({ label: 'Title (French)' }),
        description_fr: fields.text({
          label: 'Description (French)',
          multiline: true,
        }),
        content_fr: fields.document({
          label: 'Content (French)',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/posts',
            publicPath: '/images/posts/',
          },
        }),

        // Metadata
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Destination', value: 'Destination' },
            { label: 'Culinary', value: 'Culinary' },
            { label: 'Lifestyle', value: 'Lifestyle' },
            { label: 'Tips & Hacks', value: 'Tips & Hacks' },
          ],
          defaultValue: 'Destination',
        }),

        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),

        author: fields.relationship({
          label: 'Author',
          collection: 'authors',
        }),

        date: fields.date({ label: 'Publication Date' }),
        readTime: fields.integer({ label: 'Read Time (minutes)' }),
        featured: fields.checkbox({ label: 'Featured Post' }),
      },
    }),

    // Authors Collection
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'content/authors/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Author Name' } }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        bio_en: fields.text({
          label: 'Bio (English)',
          multiline: true,
        }),
        bio_fr: fields.text({
          label: 'Bio (French)',
          multiline: true,
        }),
      },
    }),

    // Expeditions Collection
    expeditions: collection({
      label: 'Expeditions',
      slugField: 'title_en',
      path: 'content/expeditions/*/',
      format: { data: 'yaml' },
      schema: {
        // Basic Info
        title_en: fields.slug({ name: { label: 'Title (English)' } }),
        title_fr: fields.text({ label: 'Title (French)' }),
        tagline_en: fields.text({ label: 'Tagline (English)' }),
        tagline_fr: fields.text({ label: 'Tagline (French)' }),

        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'public/images/expeditions',
          publicPath: '/images/expeditions/',
        }),

        description_en: fields.text({
          label: 'Description (English)',
          multiline: true,
        }),
        description_fr: fields.text({
          label: 'Description (French)',
          multiline: true,
        }),

        /*
        longDescription_en: fields.document({
          label: 'Long Description (English)',
          formatting: true,
        }),
        longDescription_fr: fields.document({
          label: 'Long Description (French)',
          formatting: true,
        }),

        // Expedition Details
        duration: fields.text({ label: 'Duration (e.g., "7-10 days")' }),
        groupSize: fields.text({ label: 'Group Size (e.g., "4-12 people")' }),
        difficulty: fields.select({
          label: 'Difficulty',
          options: [
            { label: 'Easy', value: 'Easy' },
            { label: 'Moderate', value: 'Moderate' },
            { label: 'Challenging', value: 'Challenging' },
          ],
          defaultValue: 'Moderate',
        }),
        */

        /*
        // What's Included
        included: fields.array(
          fields.object({
            item_en: fields.text({ label: 'Item (English)' }),
            item_fr: fields.text({ label: 'Item (French)' }),
          }),
          {
            label: "What's Included",
            itemLabel: (props) => props.fields.item_en.value || 'New Item',
          }
        ),

        // Itinerary
        itinerary: fields.array(
          fields.object({
            day: fields.integer({ label: 'Day Number' }),
            title_en: fields.text({ label: 'Title (English)' }),
            title_fr: fields.text({ label: 'Title (French)' }),
            description_en: fields.text({ label: 'Description (English)', multiline: true }),
            description_fr: fields.text({ label: 'Description (French)', multiline: true }),
          }),
          {
            label: 'Itinerary',
            itemLabel: (props) => `Day ${props.fields.day.value}: ${props.fields.title_en.value}` || 'New Day',
          }
        ),
        */

        // Testimonials
        testimonials: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            rating: fields.integer({ label: 'Rating (1-5)', validation: { min: 1, max: 5 } }),
            text_en: fields.text({ label: 'Testimonial (English)', multiline: true }),
            text_fr: fields.text({ label: 'Testimonial (French)', multiline: true }),
          }),
          {
            label: 'Testimonials',
            itemLabel: (props) => props.fields.name.value || 'New Testimonial',
          }
        ),

        /*
        // Pricing Tiers
        pricing_basic: fields.text({ label: 'Basic Price (e.g., "$1,299")' }),
        pricing_standard: fields.text({ label: 'Standard Price (e.g., "$1,899")' }),
        pricing_premium: fields.text({ label: 'Premium Price (e.g., "$2,499")' }),
        */
      },
    }),

    // Gallery Collection
    gallery: collection({
      label: 'Gallery',
      slugField: 'title_en',
      path: 'content/gallery/*/',
      format: { data: 'yaml' },
      schema: {
        title_en: fields.slug({ name: { label: 'Title (English)' } }),
        title_fr: fields.text({ label: 'Title (French)' }),

        src: fields.image({
          label: 'Image',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery/',
        }),

        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Adventure', value: 'Adventure' },
            { label: 'Nature', value: 'Nature' },
            { label: 'Culture', value: 'Culture' },
            { label: 'Urban', value: 'Urban' },
          ],
          defaultValue: 'Adventure',
        }),

        location_en: fields.text({ label: 'Location (English)' }),
        location_fr: fields.text({ label: 'Location (French)' }),
      },
    }),
  },
});
