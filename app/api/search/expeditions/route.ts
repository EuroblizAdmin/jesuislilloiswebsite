import { NextRequest, NextResponse } from 'next/server'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const rawLang = searchParams.get('lang')
  const language = (rawLang === 'fr' ? 'fr' : 'en')

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  try {
    const reader = createReader(process.cwd(), keystaticConfig)
    const expeditionsData = await reader.collections.expeditions.all()

    const searchQuery = query.toLowerCase()
    const titleField = language === 'fr' ? 'title_fr' : 'title_en'

    const results = expeditionsData
      .map(exp => ({
        slug: exp.slug,
        ...exp.entry,
      }))
      .filter(exp => {
        const title = exp[titleField]
        return title && title.toLowerCase().includes(searchQuery)
      })
      .map(exp => ({
        slug: exp.slug,
        title: language === 'fr' ? exp.title_fr : exp.title_en,
        description: language === 'fr' ? exp.description_fr : exp.description_en,
        heroImage: exp.heroImage,
      }))

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
