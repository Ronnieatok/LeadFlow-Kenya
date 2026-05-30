import type { Metadata } from 'next'
import './globals.css'

declare module '*.css'

export const metadata: Metadata = {
  title: 'LeadFlow Kenya - WhatsApp Lead Manager for Real Estate Agents',
  description: 'Stop losing property leads on WhatsApp. Capture every inquiry, follow up automatically, and close 30% more deals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
