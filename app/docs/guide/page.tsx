'use client'

import CodeBlock from '@/components/Common/Markdown/Shiki'
import { Pagination } from '@/components/Common/Pagination'
import { MdBlockquote } from '@/components/Common/Markdown/Blockquote'
import { MdCodeHighlight } from '@/components/Common/Markdown/CodeHighlight'

export default function GuidePage() {
  const code = `
  <script src="https://unpkg.com/@vueuse/shared"></script>
  
  <script src="https://unpkg.com/@vueuse/core"></script>
  `

  const nuxtCode = `
  // nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
  ],
})
  `

  const nuxt2Code = `
  // nuxt.config.js
export default {
  buildModules: [
    '@vueuse/nuxt',
  ],
}
  `

  const nuxtApp = `
<script setup lang="ts">
const { x, y } = useMouse()
</script>

<template>
  <div>pos: {{ x }}, {{ y }}</div>
</template>
`

  const usageExmpl = `
<script setup>
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

// tracks mouse position
const { x, y } = useMouse()

// is user prefers dark theme
const isDark = usePreferredDark()

// persist state in localStorage
const store = useLocalStorage(
  'my-storage',
  {
    name: 'Apple',
    color: 'red',
  },
)
</script>
`

  const next = {
    href: '/docs/guide/best-practice',
    title: 'Best Practice',
  }
  return (
    <>
      <h1 className="text-base font-semibold relative outline-none md:text-[32px] md:leading-[40px] md:-tracking-[.02em]">
        Get Started
      </h1>
      <p className="my-4 mx-0 leading-[28px]">
        ReactUse is a collection of utility functions based on React Hooks API.
        We assume that you are already familiar with the basic ideas of React
        Custom Hooks API before you continue.
      </p>
      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Installation
      </h2>
      <MdBlockquote>
        🎩 From v4.0, it works for Vue 2 & 3{' '}
        <strong>within a single package</strong> by the power of{' '}
        <a href="#">vue-demi</a>
      </MdBlockquote>
      <CodeBlock code="npm i @reactuse/core" lang="bash" theme="vitesse-dark" />
      <p className="my-4 mx-0 leading-[28px]">Addons | Nuxt</p>
      <MdBlockquote>
        From v6.0, VueUse requires <MdCodeHighlight>vue</MdCodeHighlight> {`>=`}{' '}
        v3.2 or <MdCodeHighlight>@vue/composition-api</MdCodeHighlight> {`>=`}=
        v1.1
      </MdBlockquote>
      <h3 className="break-words relative font-semibold outline-none mt-8 -tracking-[.01em] text-[20px] leading-[28px]">
        CDN
      </h3>
      <CodeBlock code={code} lang="html" theme="vitesse-dark" />
      <p className="my-4 mx-0 leading-[28px]">
        It will be exposed to global as{' '}
        <MdCodeHighlight>window.VueUse</MdCodeHighlight>
      </p>
      <h3 className="break-words relative font-semibold outline-none mt-8 -tracking-[.01em] text-[20px] leading-[28px]">
        Nuxt
      </h3>
      <p className="my-4 mx-0 leading-[28px]">
        From v7.2.0, we shipped a Nuxt module to enable auto importing for Nuxt
        3 and Nuxt Bridge.
      </p>
      <CodeBlock
        code="npm i -D @vueuse/nuxt @vueuse/core"
        lang="bash"
        theme="vitesse-dark"
      />

      <p className="my-4 mx-0 leading-[28px]">Nuxt 3 </p>

      <CodeBlock code={nuxtCode} lang="ts" theme="vitesse-dark" />

      <p className="my-4 mx-0 leading-[28px]">Nuxt 2</p>

      <CodeBlock code={nuxt2Code} lang="ts" theme="vitesse-dark" />

      <p className="my-4 mx-0 leading-[28px]">
        And then use VueUse function anywhere in your Nuxt app. For example:
      </p>

      <CodeBlock code={nuxtApp} lang="ts" theme="vitesse-dark" />

      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Usage Example
      </h2>

      <p className="my-4 mx-0 leading-[28px]">
        Simply importing the functions you need from{' '}
        <MdCodeHighlight>@vueuse/core</MdCodeHighlight>
      </p>

      <CodeBlock code={usageExmpl} lang="ts" theme="vitesse-dark" />

      <p className="my-4 mx-0 leading-[28px]">
        Refer to functions list for more details.
      </p>

      <Pagination next={next} />
    </>
  )
}
