import { NextResponse } from 'next/server'

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL
  const payloadSecret = process.env.PAYLOAD_SECRET
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    envVars: {
      DATABASE_URL: databaseUrl
        ? `Set (${databaseUrl.length} chars, starts with: ${databaseUrl.substring(0, 15)}...)`
        : 'NOT SET',
      PAYLOAD_SECRET: payloadSecret
        ? `Set (${payloadSecret.length} chars)`
        : 'NOT SET',
      NEXT_PUBLIC_SERVER_URL: serverUrl || 'NOT SET',
    },
    checks: {
      databaseUrlValid: databaseUrl ? databaseUrl.startsWith('postgres') : false,
      payloadSecretLength: payloadSecret ? payloadSecret.length >= 32 : false,
    }
  }

  return NextResponse.json(diagnostics)
}
