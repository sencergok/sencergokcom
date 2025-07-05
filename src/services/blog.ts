import { getClient } from '@/lib/contentful'
import type { BlogPostEntry, BlogCategoryEntry } from '@/types/contentful'

// Get all published blog posts with proper error handling
export async function getBlogPosts(limit?: number): Promise<BlogPostEntry[]> {
  try {
    const client = getClient()
    
    if (!client) {
      console.warn('Contentful client not available')
      return []
    }

    const response = await client.getEntries({
      content_type: 'blogPost',
      order: ['-sys.createdAt'] as const,
      limit: limit || 100,
      include: 2, // Include linked assets
    })

    // Validate and filter valid entries
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.items.filter((item): item is any => {
      return !!(item?.fields?.title && item?.fields?.slug && item?.sys?.id)
    }) as unknown as BlogPostEntry[]
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// Get a single blog post by slug with better validation
export async function getBlogPostBySlug(slug: string): Promise<BlogPostEntry | null> {
  try {
    if (!slug) {
      console.warn('No slug provided to getBlogPostBySlug')
      return null
    }

    const client = getClient()
    
    if (!client) {
      console.warn('Contentful client not available')
      return null
    }

    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2, // Include linked assets
    })

    const post = response.items[0]
    
    // Validate post structure
    if (!post?.fields?.title || !post?.fields?.slug || !post?.sys?.id) {
      console.warn(`Invalid blog post structure for slug: ${slug}`)
      return null
    }

    return post as unknown as BlogPostEntry
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}

// Get featured blog posts
export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPostEntry[]> {
  try {
    const client = getClient()
    
    if (!client) {
      console.warn('Contentful client not available')
      return []
    }

    const response = await client.getEntries({
      content_type: 'blogPost',
      order: ['-sys.createdAt'] as const,
      limit,
      include: 2,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.items.filter((item): item is any => {
      return !!(item?.fields?.title && item?.fields?.slug && item?.sys?.id)
    }) as unknown as BlogPostEntry[]
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return []
  }
}

// Get blog posts by tag with validation
export async function getBlogPostsByTag(tag: string): Promise<BlogPostEntry[]> {
  try {
    if (!tag) {
      console.warn('No tag provided to getBlogPostsByTag')
      return []
    }

    const client = getClient()
    
    if (!client) {
      console.warn('Contentful client not available')
      return []
    }

    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.tags[in]': [tag],
      order: ['-sys.createdAt'] as const,
      include: 2,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.items.filter((item): item is any => {
      return !!(item?.fields?.title && item?.fields?.slug && item?.sys?.id)
    }) as unknown as BlogPostEntry[]
  } catch (error) {
    console.error(`Error fetching blog posts by tag ${tag}:`, error)
    return []
  }
}

// Get all blog categories
export async function getBlogCategories(): Promise<BlogCategoryEntry[]> {
  try {
    const client = getClient()
    
    if (!client) {
      console.warn('Contentful client not available')
      return []
    }

    const response = await client.getEntries({
      content_type: 'blogCategory',
      order: ['fields.name'] as const,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.items.filter((item): item is any => {
      return !!(item?.fields?.name && item?.fields?.slug && item?.sys?.id)
    }) as unknown as BlogCategoryEntry[]
  } catch (error) {
    console.error('Error fetching blog categories:', error)
    return []
  }
}

// Get all unique tags from blog posts with caching
let cachedTags: string[] | null = null
let tagsLastFetched: number = 0
const TAGS_CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getBlogTags(): Promise<string[]> {
  try {
    // Return cached tags if still valid
    const now = Date.now()
    if (cachedTags && (now - tagsLastFetched) < TAGS_CACHE_DURATION) {
      return cachedTags
    }

    const posts = await getBlogPosts()
    const allTags = posts
      .flatMap(post => post.fields.tags || [])
      .filter((tag): tag is string => typeof tag === 'string' && tag.length > 0)
    
    const uniqueTags = [...new Set(allTags)].sort()
    
    // Cache the results
    cachedTags = uniqueTags
    tagsLastFetched = now
    
    return uniqueTags
  } catch (error) {
    console.error('Error fetching blog tags:', error)
    return []
  }
}

// Clear tags cache (useful for manual refresh)
export function clearTagsCache(): void {
  cachedTags = null
  tagsLastFetched = 0
} 