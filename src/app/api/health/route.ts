import { NextResponse } from 'next/server'

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL
  const payloadSecret = process.env.PAYLOAD_SECRET
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

  // Parse DATABASE_URL to extract host (without exposing password)
  let dbHost = 'unknown'
  let dbPort = 'unknown'
  let dbUser = 'unknown'
  if (databaseUrl) {
    try {
      const url = new URL(databaseUrl)
      dbHost = url.hostname
      dbPort = url.port || '5432'
      dbUser = url.username
    } catch {
      dbHost = 'invalid URL format'
    }
  }

  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    envVars: {
      DATABASE_URL: databaseUrl
        ? `Set (${databaseUrl.length} chars)`
        : 'NOT SET',
      PAYLOAD_SECRET: payloadSecret
        ? `Set (${payloadSecret.length} chars)`
        : 'NOT SET',
      NEXT_PUBLIC_SERVER_URL: serverUrl || 'NOT SET',
    },
    database: {
      host: dbHost,
      port: dbPort,
      user: dbUser,
      expectedHost: 'db.lrtdyoninaapdrdktzto.supabase.co',
      hostMatch: dbHost === 'db.lrtdyoninaapdrdktzto.supabase.co',
    },
    checks: {
      databaseUrlValid: databaseUrl ? databaseUrl.startsWith('postgres') : false,
      payloadSecretLength: payloadSecret ? payloadSecret.length >= 32 : false,
    }
  }

  return NextResponse.json(diagnostics)
}
