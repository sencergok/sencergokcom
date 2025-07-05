# Contentful Integration Guide

Bu dokümantasyon Contentful CMS entegrasyonunun nasıl çalıştığını ve nasıl kullanılacağını açıklar.

## 📋 İçindekiler

1. [Kurulum](#kurulum)
2. [Contentful Modelleri](#contentful-modelleri)
3. [Environment Variables](#environment-variables)
4. [Data Fetching Strategies](#data-fetching-strategies)
5. [API Routes](#api-routes)
6. [Error Handling](#error-handling)
7. [Caching](#caching)
8. [Webhooks](#webhooks)
9. [Deployment](#deployment)

## 🚀 Kurulum

### 1. Gerekli Paketler

```bash
npm install contentful @contentful/rich-text-react-renderer
```

### 2. Environment Variables

`.env.local` dosyası oluşturun:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token_here
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_api_token_here
CONTENTFUL_ENVIRONMENT=master

# Optional: For Preview Mode
CONTENTFUL_PREVIEW=false

# Webhook Security
CONTENTFUL_WEBHOOK_SECRET=your_webhook_secret
REVALIDATION_SECRET=your_revalidation_secret
```

### 3. Contentful Space Kurulumu

Contentful dashboard'unuzda aşağıdaki content type'ları oluşturun:

## 📊 Contentful Modelleri

### Project Content Type

```typescript
{
  "name": "project",
  "fields": [
    { "id": "title", "type": "Symbol", "required": true },
    { "id": "slug", "type": "Symbol", "required": true, "unique": true },
    { "id": "description", "type": "Text", "required": true },
    { "id": "category", "type": "Symbol", "required": true },
    { "id": "features", "type": "Array", "items": { "type": "Symbol" } },
    { "id": "technologies", "type": "Array", "items": { "type": "Symbol" } },
    { "id": "appStoreUrl", "type": "Symbol" },
    { "id": "githubUrl", "type": "Symbol" },
    { "id": "images", "type": "Array", "items": { "type": "Link", "linkType": "Asset" } },
    { "id": "thumbnail", "type": "Link", "linkType": "Asset" },
    { "id": "rating", "type": "Number" },
    { "id": "downloads", "type": "Symbol" },
    { "id": "releaseDate", "type": "Date" },
    { "id": "status", "type": "Symbol", "validations": [
      { "in": ["published", "in-development", "deprecated"] }
    ]},
    { "id": "featured", "type": "Boolean" },
    { "id": "emoji", "type": "Symbol" },
    { "id": "gradient", "type": "Object" }
  ]
}
```

### Gradient Object Yapısı

```json
{
  "from": "from-blue-500",
  "to": "to-purple-600"
}
```

## 🔧 Data Fetching Strategies

### 1. Server-Side Rendering (SSR)

```typescript
// pages/projects/[slug].tsx
export async function getServerSideProps({ params }) {
  const project = await getProjectBySlug(params.slug)
  
  if (!project) {
    return { notFound: true }
  }

  return {
    props: { project }
  }
}
```

### 2. Static Site Generation (SSG)

```typescript
// pages/projects/index.tsx
export async function getStaticProps() {
  const projects = await getFeaturedProjects()
  
  return {
    props: { projects },
    revalidate: 3600 // 1 hour
  }
}
```

### 3. Incremental Static Regeneration (ISR)

```typescript
// app/page.tsx (App Router)
export const revalidate = 3600 // 1 hour

async function ProjectsSection() {
  const projects = await getFeaturedProjects()
  return <ProjectsSectionContentful projects={projects} />
}
```

### 4. Client-Side Fetching

```typescript
import { useProjects } from '@/hooks/useContentful'

function ProjectsList() {
  const { data: projects, loading, error } = useProjects({
    category: 'Education',
    featured: true,
    limit: 6
  })

  if (loading) return <Loading />
  if (error) return <Error message={error} />
  
  return <ProjectGrid projects={projects} />
}
```

## 🛠 API Routes

### Projects API

```typescript
// app/api/projects/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')
  
  const projects = await getProjects({
    category,
    featured: featured === 'true',
    limit: 10
  })
  
  return NextResponse.json(projects)
}
```

### Revalidation API

```typescript
// app/api/revalidate/route.ts
export async function POST(request: NextRequest) {
  // Webhook handler for Contentful
  const body = await request.json()
  const contentType = body.sys?.contentType?.sys?.id
  
  switch (contentType) {
    case 'project':
      revalidateTag('projects')
      break
  }
  
  return NextResponse.json({ revalidated: true })
}
```

## ⚡ Caching Strategies

### 1. Next.js Cache

```typescript
// Otomatik caching
const projects = await fetch('/api/projects', {
  next: { 
    revalidate: 3600,
    tags: ['projects'] 
  }
})
```

### 2. Custom Cache Headers

```typescript
export async function GET() {
  const projects = await getProjects()
  
  return NextResponse.json(projects, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}
```

### 3. CDN Caching

```typescript
// Vercel Edge Config
{
  "headers": [
    {
      "source": "/api/projects",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=86400"
        }
      ]
    }
  ]
}
```

## 🎣 Webhooks

### Contentful Webhook Kurulumu

1. Contentful dashboard → Settings → Webhooks
2. Create webhook:
   - URL: `https://yourdomain.com/api/revalidate`
   - Secret header: `x-contentful-webhook-secret`
   - Events: Entry publish, unpublish, delete

### Webhook Handler

```typescript
// app/api/revalidate/route.ts
export async function POST(request: NextRequest) {
  // Security check
  const secret = request.headers.get('x-contentful-webhook-secret')
  if (secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const contentType = body.sys?.contentType?.sys?.id

  // Revalidate based on content type
  if (contentType === 'project') {
    revalidateTag('projects')
    revalidatePath('/')
  }

  return NextResponse.json({ revalidated: true })
}
```

## ❌ Error Handling

### 1. Graceful Degradation

```typescript
export async function getProjects() {
  try {
    return await fetchEntries<ProjectEntry>('project')
  } catch (error) {
    console.error('Contentful error:', error)
    return getFallbackProjects() // Static fallback data
  }
}
```

### 2. Error Boundaries

```typescript
function ProjectsSection() {
  return (
    <ErrorBoundary fallback={<ProjectsError />}>
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsList />
      </Suspense>
    </ErrorBoundary>
  )
}
```

### 3. Retry Logic

```typescript
async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url)
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
```

## 🚀 Deployment

### Vercel Deployment

```json
// vercel.json
{
  "env": {
    "CONTENTFUL_SPACE_ID": "@contentful-space-id",
    "CONTENTFUL_ACCESS_TOKEN": "@contentful-access-token"
  },
  "functions": {
    "app/api/revalidate/route.ts": {
      "maxDuration": 30
    }
  }
}
```

### Environment Variables (Production)

```bash
# Vercel CLI
vercel env add CONTENTFUL_SPACE_ID
vercel env add CONTENTFUL_ACCESS_TOKEN
vercel env add CONTENTFUL_WEBHOOK_SECRET
```

## 📈 Performance Optimization

### 1. Image Optimization

```typescript
import Image from 'next/image'

<Image
  src={project.thumbnail.url}
  alt={project.title}
  width={400}
  height={200}
  priority={featured}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. Prefetching

```typescript
import { usePrefetchContent } from '@/hooks/useContentful'

function ProjectCard({ slug }) {
  const { prefetchProject } = usePrefetchContent()
  
  return (
    <div onMouseEnter={() => prefetchProject(slug)}>
      {/* Card content */}
    </div>
  )
}
```

### 3. Bundle Optimization

```typescript
// Dynamic imports for non-critical components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

## 🔍 Debug & Monitoring

### 1. Debug Mode

```typescript
// lib/contentful.ts
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('Contentful query:', query)
  console.log('Response:', response)
}
```

### 2. Performance Monitoring

```typescript
// Measure fetch times
const start = Date.now()
const projects = await getProjects()
const duration = Date.now() - start

console.log(`Projects fetched in ${duration}ms`)
```

### 3. Error Tracking

```typescript
// services/analytics.ts
export function trackContentfulError(error: Error, context: string) {
  // Send to your analytics service
  analytics.track('contentful_error', {
    error: error.message,
    context,
    timestamp: new Date().toISOString()
  })
}
```

## 🛠 Best Practices

1. **Always use TypeScript** - Type safety önce
2. **Fallback data** - Her zaman static fallback verisi
3. **Error boundaries** - Graceful error handling
4. **Cache strategies** - Uygun caching stratejisi seç
5. **Security** - Webhook secret'ları koru
6. **Performance** - Image optimization ve lazy loading
7. **Monitoring** - Error tracking ve performance monitoring

## 📚 Faydalı Linkler

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Next.js Caching Guide](https://nextjs.org/docs/app/building-your-application/caching)
- [Contentful TypeScript SDK](https://contentful.github.io/contentful.js/)
- [Vercel ISR Documentation](https://vercel.com/docs/concepts/incremental-static-regeneration) 