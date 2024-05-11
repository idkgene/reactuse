'use client'
import React from 'react'
import { Hero } from '@/components/Common/Hero'
import { Benefits } from '@/components/Common/Benefits'
import { BenefitsItem } from '@/components/Common/BenefitItem'

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-32 py-12 lg:py-16 ">
        <Hero />
        <section className="relative py-0 px-6 sm:px-10 lg:px-16">
          <div className="container mx-auto my-auto">
            <Benefits>
              <BenefitsItem
                icon="🎛️"
                heading="Feature Rich"
                paragraph="50+ function for you to choose from"
              />
              <BenefitsItem
                icon="🚀"
                heading="Seamless Integration"
                paragraph="Works with React and Next.js"
              />
              <BenefitsItem
                icon="🦾"
                heading="Type Strong"
                paragraph="Written in TypeScript, with full TS docs"
              />
              <BenefitsItem
                icon="🛠️"
                heading="Flexible"
                paragraph="Passing refs as arguments, fully customizable, configurable event filters and targets"
              />
              <BenefitsItem
                icon="⚡"
                heading="Fully Tree Shakable"
                paragraph="Only take what you want"
              />
              <BenefitsItem
                icon="☁️"
                heading="No bundler required"
                paragraph="Usable via CDN, w/o any bundlers"
              />
              <BenefitsItem
                icon="🔋"
                heading="SSR Friendly"
                paragraph="Works perfectly with server-side rendering/generation"
              />
              <BenefitsItem
                icon="🎪"
                heading="Interactive Demos"
                paragraph="Documentation of functions also come with interactive demos!"
              />
            </Benefits>
          </div>
        </section>
      </main>
    </>
  )
}
