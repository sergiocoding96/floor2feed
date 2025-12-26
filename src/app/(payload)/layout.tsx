import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './admin.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Floor2Feed Admin',
  description: 'Content management for Floor2Feed blog',
}

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
