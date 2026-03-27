import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Readly - Online Bookstore',
  description:
    'Discover your next favorite book at Readly. Browse thousands of titles, manage your cart, and place orders with ease.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
