'use client'

import { ReactNode } from 'react'

import { AuthProvider } from './all/AuthProvider'
import { ReactQueryProvider } from './all/ReactQueryProvider'
import { ThemeProvider } from './all/ThemeProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ReactQueryProvider>
        <AuthProvider> {children}</AuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  )
}
