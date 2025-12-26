import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    step: 'starting',
  }

  try {
    diagnostics.step = 'importing config'
    diagnostics.configLoaded = !!config

    diagnostics.step = 'calling getPayload'
    const payload = await getPayload({ config })

    diagnostics.step = 'payload initialized'
    diagnostics.payloadInitialized = true
    diagnostics.collections = payload.collections ? Object.keys(payload.collections) : []

    // Try a simple query
    diagnostics.step = 'testing database connection'
    const usersCount = await payload.count({ collection: 'users' })
    diagnostics.usersCount = usersCount.totalDocs
    diagnostics.databaseConnected = true

    return NextResponse.json({
      success: true,
      ...diagnostics,
    })
  } catch (error) {
    const err = error as Error
    return NextResponse.json({
      success: false,
      ...diagnostics,
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack?.split('\n').slice(0, 10),
      },
    }, { status: 500 })
  }
}
