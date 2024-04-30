import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/providers/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Talkdev',
    template: '%s | Talkdev',
  },
  description:
    'This application is a clone of Twitch, made with didactic purposes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className={inter.variable}>
        <body className="antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="talkdev-theme"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster theme="light" richColors position="bottom-center" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
