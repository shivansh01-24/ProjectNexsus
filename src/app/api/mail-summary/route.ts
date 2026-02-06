import { NextResponse } from 'next/server'

// Simple keyword-based extraction summarizer (Zero Cost AI)
function summarizeText(text: string): string {
  if (!text) return ''
  
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text]
  if (sentences.length <= 3) return text

  // Score sentences based on length and keywords
  const keywords = ['important', 'meeting', 'urgent', 'deadline', 'schedule', 'required', 'action', 'event', 'date', 'time']
  
  const scoredSentences = sentences.map((sentence) => {
    let score = 0
    const lower = sentence.toLowerCase()
    
    // Keyword match
    keywords.forEach(word => {
      if (lower.includes(word)) score += 2
    })
    
    // Position bias (first and last sentences are often important)
    if (sentences.indexOf(sentence) === 0) score += 1.5
    if (sentences.indexOf(sentence) === sentences.length - 1) score += 1

    return { sentence, score }
  })

  // Sort by score and pick top 3
  scoredSentences.sort((a, b) => b.score - a.score)
  const topSentences = scoredSentences.slice(0, 3)

  // Reorder them to appear in original order
  topSentences.sort((a, b) => sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence))

  return topSentences.map(s => s.sentence).join(' ')
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const summary = summarizeText(text)

    return NextResponse.json({ summary })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
