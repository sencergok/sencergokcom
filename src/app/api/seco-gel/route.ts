import { NextRequest, NextResponse } from 'next/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

const supabase: SupabaseClient | null = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Server misconfigured: Supabase env missing' }, { status: 500 })
    }
    const headersList = await headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const ip = forwardedFor?.split(',')[0] || realIp || '127.0.0.1'

    const body = await request.json().catch(() => ({}))
    const note = typeof body?.note === 'string' ? sanitizeInput(body.note).slice(0, 2000) : null

    const clickedAt = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()

    const row = {
      note: note || null,
      clicked_at: clickedAt,
      ip_address: ip,
      user_agent: headersList.get('user-agent') || 'Unknown'
    }

    const { data, error } = await supabase
      .from('seco_clicks')
      .insert([row])
      .select()

    if (error) {
      console.error('Supabase error (seco-gel insert):', error)
      return NextResponse.json({ error: 'Kayıt sırasında bir hata oluştu.', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data?.[0] ?? null })
  } catch (err) {
    console.error('seco-gel POST error:', err)
    return NextResponse.json({ error: 'Beklenmeyen bir hata oluştu.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ status: 'error', message: 'Server misconfigured: Supabase env missing' }, { status: 500 })
    }
    const { data, error } = await supabase
      .from('seco_clicks')
      .select('count', { count: 'exact' })

    if (error) {
      return NextResponse.json({ status: 'error', message: 'Database connection failed', error: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'ok', total_clicks: data?.[0]?.count || 0 })
  } catch (err) {
    console.error('seco-gel GET health error:', err)
    return NextResponse.json({ status: 'error', message: 'API health check failed' }, { status: 500 })
  }
}


