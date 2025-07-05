import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Security: Verify the request is coming from Contentful
function verifyWebhookSecret(request: NextRequest): boolean {
  const webhookSecret = process.env.CONTENTFUL_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.warn('CONTENTFUL_WEBHOOK_SECRET not configured')
    return false
  }

  const providedSecret = request.headers.get('x-contentful-webhook-secret')
  return providedSecret === webhookSecret
}

// Main revalidation handler
export async function POST(request: NextRequest) {
  try {
    // Security check
    if (!verifyWebhookSecret(request)) {
      return NextResponse.json(
        { message: 'Invalid webhook secret' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { sys } = body

    // Log webhook data for debugging
    console.log('Received webhook:', {
      contentType: sys?.contentType?.sys?.id,
      entryId: sys?.id,
      environment: sys?.environment?.sys?.id,
      action: request.headers.get('x-contentful-topic')
    })

    // Get the content type and action
    const contentType = sys?.contentType?.sys?.id
    const action = request.headers.get('x-contentful-topic') || 'unknown'

    // Revalidate based on content type
    switch (contentType) {
      case 'project':
        // Revalidate projects-related pages
        await revalidateProjects()
        break
      
      case 'blogPost':
        // Revalidate blog-related pages
        await revalidateBlog()
        break
      
      case 'about':
        // Revalidate about section
        await revalidateAbout()
        break
      
      case 'hero':
        // Revalidate hero section
        await revalidateHero()
        break
      
      case 'contact':
        // Revalidate contact information
        await revalidateContact()
        break
      
      default:
        // Revalidate everything for unknown content types
        await revalidateAll()
        break
    }

    return NextResponse.json({
      message: 'Revalidation triggered successfully',
      contentType,
      action,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { 
        message: 'Revalidation failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Manual revalidation via GET (for testing)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')
    const path = searchParams.get('path')
    const secret = searchParams.get('secret')

    // Security check for manual revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({ 
        message: `Tag "${tag}" revalidated successfully` 
      })
    }

    if (path) {
      revalidatePath(path)
      return NextResponse.json({ 
        message: `Path "${path}" revalidated successfully` 
      })
    }

    // Revalidate homepage by default
    revalidatePath('/')
    return NextResponse.json({ 
      message: 'Homepage revalidated successfully' 
    })

  } catch (error) {
    console.error('Manual revalidation error:', error)
    return NextResponse.json(
      { 
        message: 'Manual revalidation failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Revalidation functions
async function revalidateProjects() {
  revalidateTag('projects')
  revalidatePath('/')
  revalidatePath('/projects')
  console.log('Projects revalidated')
}

async function revalidateBlog() {
  revalidateTag('blog')
  revalidatePath('/blog')
  revalidatePath('/') // Ana sayfa da blog preview içeriyor
  console.log('Blog content revalidated')
}

async function revalidateAbout() {
  revalidateTag('about')
  revalidatePath('/')
  console.log('About section revalidated')
}

async function revalidateHero() {
  revalidateTag('hero')
  revalidatePath('/')
  console.log('Hero section revalidated')
}

async function revalidateContact() {
  revalidateTag('contact')
  revalidatePath('/')
  console.log('Contact section revalidated')
}

async function revalidateAll() {
  revalidateTag('projects')
  revalidateTag('blog')
  revalidateTag('about')
  revalidateTag('hero')
  revalidateTag('contact')
  revalidatePath('/')
  revalidatePath('/blog')
  console.log('All content revalidated')
} 