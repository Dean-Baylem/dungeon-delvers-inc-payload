import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <main>
      <section>
        <Image
          src="/home/hero-home.webp"
          alt="hero-image-adventurers-overlooking-city"
          width="1440"
          height="600"
          loading="eager"
        ></Image>
        <div>
          <h1>
            <span>Welcome to</span>
            <br />
            Greyhawk
          </h1>
          <blockquote>
            <p>
              “The cruelest irony of life, is that which sustains above all else came closest to
              fulfilling the goals of The Reaper.
              <br />
              <br />
              The redemption of life, is that when the storms were satiated new growth was born.”
            </p>
          </blockquote>
        </div>
      </section>
    </main>
  )
}
