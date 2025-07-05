import { Asset } from 'contentful'
import { Document } from '@contentful/rich-text-types'

// Base interface for all Contentful entries
export interface ContentfulEntry {
  id: string
  createdAt: string
  updatedAt: string
}

// Project content type (supports both raw Contentful and transformed data)
export interface ProjectEntry extends ContentfulEntry {
  title: string
  slug: string
  description: string
  category: string
  features: string[] | string // Support both array and comma-separated string
  technologies: string[] | string // Support both array and comma-separated string
  appStoreUrl?: string
  githubUrl?: string
  demoUrl?: string
  images: Asset[] | ContentfulAsset[] // Support both raw and transformed assets
  thumbnail?: Asset | ContentfulAsset // Support both raw and transformed asset
  rating?: number
  downloads?: string
  releaseDate: string
  featured: boolean // Required field - indicates if project is featured/highlighted
  emoji?: string
  gradient?: {
    from: string
    to: string
  }
  stats?: {
    users?: string
    rating?: number
    downloads?: string
  }
}

// About section content type
export interface AboutEntry extends ContentfulEntry {
  title: string
  subtitle: string
  description: string
  skills: SkillGroup[]
  achievements: Achievement[]
  personalityTraits: PersonalityTrait[]
  funFacts: string[]
}

// Skill group interface
export interface SkillGroup {
  category: string
  icon: string
  color: string
  bgColor: string
  skills: Skill[]
}

export interface Skill {
  name: string
  level: number
}

// Achievement interface
export interface Achievement {
  icon: string
  title: string
  description: string
  value: string
  color: string
  bgColor: string
}

// Personality trait interface
export interface PersonalityTrait {
  icon: string
  title: string
  description: string
}

// Hero section content type
export interface HeroEntry extends ContentfulEntry {
  title: string
  subtitle: string
  description: string
  statusBadge: string
  skills: string[]
  funFacts: string[]
  stats: HeroStat[]
  ctaButtons: CTAButton[]
}

export interface HeroStat {
  value: string
  label: string
  color: string
}

export interface CTAButton {
  text: string
  href: string
  variant: 'primary' | 'secondary'
  icon?: string
}

// Contact information content type
export interface ContactEntry extends ContentfulEntry {
  email: string
  phone?: string
  location: string
  responseTime: string
  availability: {
    status: 'available' | 'busy' | 'unavailable'
    message: string
  }
  socialLinks: SocialLink[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  description: string
}

// Blog Post Types
export interface BlogPostFields {
  title: string
  slug: string
  content: Document
  featuredImage?: Asset
  tags?: string[]
  readingTime?: number
  seoTitle?: string
  seoDescription?: string
  author?: string
}

export interface BlogPostEntry {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
    contentType: {
      sys: {
        id: 'blogPost'
      }
    }
  }
  fields: BlogPostFields
}

// Blog Category Types  
export interface BlogCategoryFields {
  name: string
  slug: string
  description?: string
  color?: string
}

export interface BlogCategoryEntry {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'blogCategory'
      }
    }
  }
  fields: BlogCategoryFields
}

// Generic asset helper
export interface ContentfulAsset {
  url: string
  title: string
  description?: string
  width?: number
  height?: number
  size?: number
  contentType?: string
}

// Helper function to transform Contentful assets
export function transformAsset(asset: Asset): ContentfulAsset {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const file = asset.fields.file as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const details = file?.details as any
  
  return {
    url: file?.url ? `https:${file.url}` : '',
    title: (asset.fields.title as string) || '',
    description: (asset.fields.description as string) || undefined,
    width: details?.image?.width,
    height: details?.image?.height,
    size: details?.size,
    contentType: (file?.contentType as string) || undefined,
  }
}

// Query interfaces for filtering
export interface ProjectsQuery {
  limit?: number
  skip?: number
  category?: string
  featured?: boolean
  order?: string[]
}

export interface ContentfulResponse<T> {
  items: T[]
  total: number
  skip: number
  limit: number
} 