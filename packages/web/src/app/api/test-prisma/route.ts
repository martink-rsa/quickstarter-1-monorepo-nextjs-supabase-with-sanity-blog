import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection with a simple count query
    const userCount = await prisma.user.count()
    const roleCount = await prisma.role.count()
    
    return NextResponse.json({
      success: true,
      message: 'Prisma is working with Supabase!',
      data: {
        userCount,
        roleCount
      }
    })
  } catch (error) {
    console.error('Prisma error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}