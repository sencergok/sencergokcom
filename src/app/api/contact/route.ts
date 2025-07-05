import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

// Supabase client'ı oluştur
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY! // Service key kullan (RLS bypass için)

const supabase = createClient(supabaseUrl, supabaseKey)

// Rate limiting için basit cache
const rateLimitCache = new Map<string, { count: number; resetTime: number }>()

// Rate limiting kontrolü
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const resetTime = now + 60 * 60 * 1000 // 1 saat
  const maxRequests = 10 // Saatte maksimum 10 mesaj
  
  const current = rateLimitCache.get(ip)
  
  if (!current) {
    rateLimitCache.set(ip, { count: 1, resetTime })
    return true
  }
  
  if (now > current.resetTime) {
    rateLimitCache.set(ip, { count: 1, resetTime })
    return true
  }
  
  if (current.count >= maxRequests) {
    return false
  }
  
  current.count++
  return true
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  return emailRegex.test(email)
}

// Input sanitization
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export async function POST(request: NextRequest) {
  try {
    // IP adresini al
    const headersList = headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const ip = forwardedFor?.split(',')[0] || realIp || '127.0.0.1'
    
    // Rate limiting kontrolü
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          error: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      )
    }

    // Request body'yi al
    const body = await request.json()
    const { name, email, subject, message } = body

    // Input validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { 
          error: 'Tüm alanlar zorunludur.',
          code: 'MISSING_FIELDS'
        },
        { status: 400 }
      )
    }

    // Email validation
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { 
          error: 'Geçerli bir email adresi girin.',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      )
    }

    // Input length validation
    if (name.length > 255 || email.length > 255 || subject.length > 500 || message.length > 5000) {
      return NextResponse.json(
        { 
          error: 'Girilen veriler çok uzun.',
          code: 'INPUT_TOO_LONG'
        },
        { status: 400 }
      )
    }

    // Input sanitization
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
      ip_address: ip,
      user_agent: headersList.get('user-agent') || 'Unknown'
    }

    // Supabase'e kaydet
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([sanitizedData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          error: 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
          code: 'DATABASE_ERROR'
        },
        { status: 500 }
      )
    }

    // Başarılı yanıt
    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.',
      data: {
        id: data?.[0]?.id,
        created_at: data?.[0]?.created_at
      }
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        error: 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}

// GET endpoint for health check
export async function GET() {
  try {
    // Supabase bağlantısını test et
    const { data, error } = await supabase
      .from('contact_messages')
      .select('count', { count: 'exact' })

    if (error) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Database connection failed',
          error: error.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Contact API is working',
      database_status: 'connected',
      total_messages: data?.[0]?.count || 0
    })

  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'API health check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 