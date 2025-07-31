import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function GET() {
  try {
    // Test Supabase connection first
    const supabase = createClient()
    
    // Test basic connectivity by querying a table we know exists
    const { data: users, error: supabaseError } = await supabase
      .from('User')
      .select('id')
      .limit(1)
    
    if (supabaseError) {
      throw new Error(`Supabase error: ${supabaseError.message}`)
    }

    // Test Prisma connection (if we get this far)
    let prismaStatus = 'Not tested'
    try {
      const { prisma } = await import('@/lib/prisma')
      const userCount = await prisma.user.count()
      prismaStatus = `Working - ${userCount} users found`
    } catch (prismaError) {
      prismaStatus = `Error: ${prismaError instanceof Error ? prismaError.message : 'Unknown error'}`
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection is working!',
      data: {
        supabase: {
          status: 'Connected',
          usersFound: users?.length || 0
        },
        prisma: {
          status: prismaStatus
        }
      }
    })
  } catch (error) {
    console.error('Connection error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}