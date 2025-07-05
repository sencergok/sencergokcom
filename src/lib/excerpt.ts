import { Document } from '@contentful/rich-text-types'

// Function to extract plain text from rich text content
export function extractTextFromRichText(content: Document): string {
  if (!content || !content.content) return ''
  
  let text = ''
  
  function extractText(node: any): void {
    if (node.nodeType === 'text') {
      text += node.value || ''
    } else if (node.content) {
      node.content.forEach(extractText)
    }
  }
  
  content.content.forEach(extractText)
  return text
}

// Function to generate excerpt from rich text content
export function generateExcerpt(content: Document, maxLength: number = 160): string {
  const fullText = extractTextFromRichText(content)
  
  if (!fullText) return ''
  
  // Clean up the text
  const cleanText = fullText
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
  
  if (cleanText.length <= maxLength) {
    return cleanText
  }
  
  // Find the last complete sentence within the limit
  const truncated = cleanText.substring(0, maxLength)
  const lastSentence = truncated.lastIndexOf('.')
  const lastQuestion = truncated.lastIndexOf('?')
  const lastExclamation = truncated.lastIndexOf('!')
  
  const lastPunctuation = Math.max(lastSentence, lastQuestion, lastExclamation)
  
  if (lastPunctuation > maxLength * 0.7) {
    // If we have a sentence ending in the last 30% of the text, use it
    return cleanText.substring(0, lastPunctuation + 1)
  } else {
    // Otherwise, find the last complete word
    const lastSpace = truncated.lastIndexOf(' ')
    if (lastSpace > maxLength * 0.8) {
      return cleanText.substring(0, lastSpace) + '...'
    } else {
      return truncated + '...'
    }
  }
}

// Function to generate excerpt for search (includes more text)
export function generateSearchExcerpt(content: Document, maxLength: number = 300): string {
  return generateExcerpt(content, maxLength)
}

// Function to check if content contains search query
export function contentContainsQuery(content: Document, query: string): boolean {
  const fullText = extractTextFromRichText(content)
  return fullText.toLowerCase().includes(query.toLowerCase())
} 