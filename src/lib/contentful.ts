import { createClient, Entry, EntryCollection } from 'contentful'

// Environment variables validation
const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const previewAccessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master'

if (!spaceId || !accessToken) {
  throw new Error('Contentful credentials are missing. Please check your .env.local file.')
}

// Create client instance
const client = createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: environment,
  host: process.env.CONTENTFUL_PREVIEW === 'true' ? 'preview.contentful.com' : 'cdn.contentful.com',
})

// Preview client for draft content
const previewClient = previewAccessToken
  ? createClient({
      space: spaceId,
      accessToken: previewAccessToken,
      environment: environment,
      host: 'preview.contentful.com',
    })
  : null

// Helper function to get client based on preview mode
export const getClient = (preview = false) => {
  if (preview && previewClient) {
    return previewClient
  }
  return client
}

// Generic function to fetch entries with error handling
export async function fetchEntries<T>(
  contentType: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Record<string, any> = {},
  preview = false
): Promise<T[]> {
  try {
    const selectedClient = getClient(preview)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: EntryCollection<any> = await selectedClient.getEntries({
      content_type: contentType,
      include: 10, // Include referenced entries up to 10 levels
      ...query,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.items.map((item: Entry<any>) => ({
      ...item.fields,
      id: item.sys.id,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
    })) as T[]
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error)
    throw new Error(`Failed to fetch ${contentType} from Contentful`)
  }
}

// Specific function to fetch a single entry
export async function fetchEntry<T>(
  contentType: string,
  entryId: string,
  preview = false
): Promise<T | null> {
  try {
    const selectedClient = getClient(preview)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry: Entry<any> = await selectedClient.getEntry(entryId, {
      include: 10,
    })

    if (entry.sys.contentType.sys.id !== contentType) {
      throw new Error(`Entry ${entryId} is not of type ${contentType}`)
    }

    return {
      ...entry.fields,
      id: entry.sys.id,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    } as T
  } catch (error) {
    console.error(`Error fetching entry ${entryId}:`, error)
    return null
  }
}

// Cache-friendly wrapper with revalidation
export async function fetchEntriesWithCache<T>(
  contentType: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Record<string, any> = {}
): Promise<T[]> {
  const cacheKey = `${contentType}_${JSON.stringify(query)}`
  
  try {
    return await fetchEntries<T>(contentType, query)
  } catch (error) {
    console.error(`Cache miss for ${cacheKey}:`, error)
    // Fallback to empty array or cached data if available
    return []
  }
} 