import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { Providers } from '@/components/providers/Providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Festival znanosti- Zagreb',
  description: 'Istražite svijet znanosti i tehnologije',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
