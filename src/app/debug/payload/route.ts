import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    step: 'starting',
    nodeVersion: process.version,
    env: process.env.NODE_ENV,
  }

  try {
    // Step 1: Check environment variables
    diagnostics.step = 'checking env vars'
    diagnostics.envVars = {
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'SET' : 'NOT SET',
    }

    // Step 2: Try to import config
    diagnostics.step = 'importing config'
    const { default: config } = await import('@payload-config')
    diagnostics.configLoaded = !!config
    diagnostics.configType = typeof config

    // Step 3: Import getPayload
    diagnostics.step = 'importing getPayload'
    const { getPayload } = await import('payload')
    diagnostics.getPayloadImported = true

    // Step 4: Initialize Payload
    diagnostics.step = 'calling getPayload'
    const payload = await getPayload({ config })

    diagnostics.step = 'payload initialized'
    diagnostics.payloadInitialized = true
    diagnostics.collections = payload.collections ? Object.keys(payload.collections) : []

    // Step 5: Test database connection
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
        stack: err.stack?.split('\n').slice(0, 15),
      },
    }, { status: 500 })
  }
}
