import { fetchEntries } from '@/lib/contentful'
import { ProjectEntry, ProjectsQuery, transformAsset } from '@/types/contentful'

// Content type identifier in Contentful
const CONTENT_TYPE = 'project'

/**
 * Fetch all projects with optional filtering and pagination
 */
export async function getProjects(
  query: ProjectsQuery = {},
  preview = false
): Promise<ProjectEntry[]> {
  try {
    const {
      limit = 20,
      skip = 0,
      category,
      featured,
      order = ['-sys.createdAt']
    } = query

    // Build Contentful query - only add filters that exist
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contentfulQuery: Record<string, any> = {
      limit,
      skip,
      order,
    }

    // Add optional filters only if they're provided and we know fields exist
    if (category) {
      // contentfulQuery['fields.category'] = category
    }

    // Featured field query (now available again)
    if (typeof featured === 'boolean') {
      contentfulQuery['fields.featured'] = featured
    }

    const projects = await fetchEntries<ProjectEntry>(
      CONTENT_TYPE,
      contentfulQuery,
      preview
    )

    // Transform and return projects
    return projects.map(transformProject)
  } catch (error) {
    console.warn('Failed to fetch projects from Contentful:', error)
    // Return fallback data in case of error
    return getFallbackProjects()
  }
}

/**
 * Fetch featured projects (for homepage)
 */
export async function getFeaturedProjects(preview = false): Promise<ProjectEntry[]> {
  return getProjects({ featured: true, limit: 6 }, preview)
}

/**
 * Fetch a single project by slug
 */
export async function getProjectBySlug(
  slug: string,
  preview = false
): Promise<ProjectEntry | null> {
  try {
    const projects = await fetchEntries<ProjectEntry>(
      CONTENT_TYPE,
      { 'fields.slug': slug, limit: 1 },
      preview
    )

    if (projects.length === 0) {
      return null
    }

    return transformProject(projects[0])
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error)
    return null
  }
}

/**
 * Fetch projects by category
 */
export async function getProjectsByCategory(
  category: string,
  preview = false
): Promise<ProjectEntry[]> {
  return getProjects({ category, limit: 10 }, preview)
}

/**
 * Search projects by title or description
 */
export async function searchProjects(
  searchTerm: string,
  preview = false
): Promise<ProjectEntry[]> {
  try {
    const projects = await fetchEntries<ProjectEntry>(
      CONTENT_TYPE,
      {
        'fields.title[match]': searchTerm,
        limit: 10,
      },
      preview
    )

    return projects.map(transformProject)
  } catch (error) {
    console.error(`Error searching projects for "${searchTerm}":`, error)
    return []
  }
}

/**
 * Get project statistics
 */
export async function getProjectStats(preview = false): Promise<{
  total: number
  byCategory: Record<string, number>
  featured: number
}> {
  try {
    const allProjects = await getProjects({ limit: 100 }, preview)
    
    const stats = {
      total: allProjects.length,
      byCategory: {} as Record<string, number>,
      featured: allProjects.filter(p => p.featured).length,
    }

    // Count by category
    allProjects.forEach(project => {
      stats.byCategory[project.category] = (stats.byCategory[project.category] || 0) + 1
    })

    return stats
  } catch (error) {
    console.error('Error getting project stats:', error)
    return { total: 0, byCategory: {}, featured: 0 }
  }
}

/**
 * Transform project data and add computed fields
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformProject(project: any): ProjectEntry {
  return {
    ...project,
    // Transform images (safe handling) - now properly typed
    images: project.images?.length ? project.images.map(transformAsset) : [],
    thumbnail: project.thumbnail ? transformAsset(project.thumbnail) : undefined,
    
    // Add computed fields (safe handling)
    appStoreUrl: project.appStoreUrl || undefined,
    githubUrl: project.githubUrl || undefined,
    
    // Handle features - support both string and array formats (safe)
    features: Array.isArray(project.features) 
      ? project.features 
      : typeof project.features === 'string' 
        ? project.features.split(',').map((f: string) => f.trim()).filter((f: string) => f)
        : ['Demo Feature 1', 'Demo Feature 2'], // Fallback if field doesn't exist
    
    // Handle technologies - support both string and array formats (safe)
    technologies: Array.isArray(project.technologies)
      ? project.technologies
      : typeof project.technologies === 'string'
        ? project.technologies.split(',').map((t: string) => t.trim()).filter((t: string) => t)
        : ['React', 'TypeScript'], // Fallback if field doesn't exist
        
    // Handle featured field (ensure it's boolean)
    featured: Boolean(project.featured),
    
    // Set defaults for missing fields
    rating: project.rating || 4.5,
    downloads: project.downloads || '1K+',
    emoji: project.emoji || '🚀',
    gradient: project.gradient || { from: 'from-blue-500', to: 'to-purple-600' },
    stats: project.stats || {
      rating: project.rating || 4.5,
      downloads: project.downloads || '1K+',
      users: project.downloads || '1K+'
    }
  }
}

/**
 * Fallback projects data (in case Contentful is unavailable)
 */
function getFallbackProjects(): ProjectEntry[] {
  return [
    {
      id: 'fallback-1',
      title: 'KPSS GO: Soru ve Konu Anlatım',
      slug: 'kpss-go',
      description: 'KPSS\'ye hazırlık sürecini eğlenceli hale getiren kapsamlı uygulama!',
      category: 'Education',
      features: ['10.000+ Soru 📝', 'Video Anlatımlar 🎬', 'İstatistik Takibi 📊'],
      technologies: ['Swift', 'iOS', 'Core Data'],
      rating: 4.8,
      downloads: '5K+',
      releaseDate: '2024-01-01',
      featured: true, // Featured project
      emoji: '📚',
      gradient: { from: 'from-blue-500', to: 'to-blue-700' },
      stats: { rating: 4.8, downloads: '5K+', users: '5K+' },
      images: [],
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center',
        title: 'KPSS GO App Screenshot',
        description: 'KPSS hazırlık uygulaması ekran görüntüsü'
      },
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: 'fallback-2', 
      title: 'Medication Tracker Pro',
      slug: 'medication-tracker',
      description: 'İlaç zamanlarınızı asla kaçırmayın! Akıllı hatırlatıcılar ve sağlık takibi.',
      category: 'Health',
      features: ['Akıllı Hatırlatıcı 🔔', 'Sağlık Raporu 📊', 'Doktor Paylaşımı 👨‍⚕️'],
      technologies: ['React Native', 'TypeScript', 'Firebase'],
      rating: 4.6,
      downloads: '3K+',
      releaseDate: '2024-03-15',
      featured: true, // Featured project
      emoji: '💊',
      gradient: { from: 'from-green-500', to: 'to-emerald-600' },
      stats: { rating: 4.6, downloads: '3K+', users: '3K+' },
      images: [],
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
        title: 'Medication Tracker App',
        description: 'İlaç takip uygulaması arayüzü'
      },
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15'
    },
    {
      id: 'fallback-3',
      title: 'Water Remover Tool',
      slug: 'water-remover',
      description: 'Fotoğraflarınızdan su damlaları ve istenmeyen nesneleri kolayca temizleyin.',
      category: 'Utility',
      features: ['AI Teknolojisi 🤖', 'Hızlı İşlem ⚡', 'HD Kalite 📸'],
      technologies: ['Swift', 'Core ML', 'Vision'],
      rating: 4.3,
      downloads: '1.5K+',
      releaseDate: '2024-06-01',
      featured: false, // Not featured
      emoji: '💧',
      gradient: { from: 'from-cyan-500', to: 'to-blue-600' },
      stats: { rating: 4.3, downloads: '1.5K+', users: '1.5K+' },
      images: [],
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center',
        title: 'Photo Editor Tool',
        description: 'Fotoğraf düzenleme uygulaması'
      },
      createdAt: '2024-06-01',
      updatedAt: '2024-06-01'
    }
  ]
}

/**
 * Revalidate projects cache (for ISR)
 */
export async function revalidateProjects(): Promise<boolean> {
  try {
    // This would typically call your revalidation API
    // await fetch('/api/revalidate?tag=projects', { method: 'POST' })
    return true
  } catch (error) {
    console.error('Error revalidating projects:', error)
    return false
  }
} 