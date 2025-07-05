'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProjectEntry } from '@/types/contentful'

// Generic hook for fetching data
export function useContentfulData<T>(
  fetcher: () => Promise<T>
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetcher()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Contentful fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [fetcher])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch }
}

// Specific hook for projects
export function useProjects(options: {
  category?: string
  featured?: boolean
  limit?: number
} = {}) {
  const { category, featured, limit = 10 } = options

  const fetcher = useCallback(async (): Promise<ProjectEntry[]> => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (featured !== undefined) params.set('featured', featured.toString())
    params.set('limit', limit.toString())

    const response = await fetch(`/api/projects?${params}`)
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    return response.json()
  }, [category, featured, limit])

  return useContentfulData(fetcher)
}

// Hook for searching projects
export function useProjectSearch(searchTerm: string, debounceMs = 500) {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchTerm, debounceMs])

  const fetcher = useCallback(async (): Promise<ProjectEntry[]> => {
    if (!debouncedTerm.trim()) return []
    
    const response = await fetch(`/api/projects/search?q=${encodeURIComponent(debouncedTerm)}`)
    if (!response.ok) {
      throw new Error('Failed to search projects')
    }
    return response.json()
  }, [debouncedTerm])

  return useContentfulData(fetcher)
}

// Hook for real-time content updates (using SSE or WebSocket)
export function useRealtimeContent() {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    // Set up Server-Sent Events for real-time updates
    const eventSource = new EventSource('/api/sse/content-updates')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setLastUpdated(new Date(data.timestamp))
      
      // Trigger page refresh or invalidate specific queries
      if (data.contentType === 'project') {
        // You could integrate with React Query or SWR here
        window.location.reload()
      }
    }

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return { lastUpdated }
}

// Hook for prefetching content
export function usePrefetchContent() {
  const prefetchProjects = useCallback(async (category?: string) => {
    const params = category ? `?category=${encodeURIComponent(category)}` : ''
    fetch(`/api/projects${params}`)
  }, [])

  const prefetchProject = useCallback(async (slug: string) => {
    fetch(`/api/projects/${slug}`)
  }, [])

  return { prefetchProjects, prefetchProject }
}

// Hook for caching strategies
export function useContentCache() {
  const clearCache = useCallback(async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames.map(name => caches.delete(name))
      )
    }
  }, [])

  const getCacheStatus = useCallback(async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      return cacheNames.length > 0
    }
    return false
  }, [])

  return { clearCache, getCacheStatus }
} 