import React from 'react'
import { Crimson_Pro, Cormorant_Garamond, League_Spartan, Aref_Ruqaa_Ink } from 'next/font/google'
import './styles.css'
import { AuthStoreProvider } from '@/providers/auth-provider'

const crimsonPro = Crimson_Pro({
  variable: '--font-body-serif',
  subsets: ['latin'],
})

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

const leagueSpartan = League_Spartan({
  variable: '--font-body-sans',
  subsets: ['latin'],
})

const arefRequaaInk = Aref_Ruqaa_Ink({
  variable: '--font-subheading',
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${arefRequaaInk.variable} ${cormorantGaramond.variable} ${leagueSpartan.variable} antialiased`}
      >
        <AuthStoreProvider>{children}</AuthStoreProvider>
      </body>
    </html>
  )
}
