import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, phone } = body

    // Validate
    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Email and phone required' },
        { status: 400 }
      )
    }

    // Create lead object
    const lead = {
      email,
      phone,
      timestamp: new Date().toISOString(),
      source: 'landing-page'
    }

    // For now, just return success
    // In production, this would save to Supabase
    console.log('New lead:', lead)

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully'
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500 }
    )
  }
}
