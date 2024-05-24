'use client'

import CodeBlock from '@/components/Common/Markdown/Shiki'
import { Pagination } from '@/components/Common/Pagination'
import { MdBlockquote } from '@/components/Common/Markdown/Blockquote'
import { MdCodeHighlight } from '@/components/Common/Markdown/CodeHighlight'

export default function BestPracticePage() {
  const destructing = `
import { useMouse } from '@vueuse/core'

// "x" and "y" are refs
const { x, y } = useMouse()

console.log(x.value)

const mouse = useMouse()

console.log(mouse.x.value)
`

  const exmpl = `
import { reactive } from 'vue'
import { useMouse } from '@vueuse/core'

const mouse = reactive(useMouse())

// "x" and "y" will be auto unwrapped, no '.value' needed
console.log(mouse.x)`

  const cleanupExmpl = `
// will cleanup automatically
useEventListener('mousemove', () => {})
`

  const disposeSideEffects = `
const stop = useEventListener('mousemove', () => {})

// ...

// unregister the event listener manually
stop()`

  const effectScope = `
import { effectScope } from 'vue'

const scope = effectScope()

scope.run(() => {
  // ...

  useEventListener('mousemove', () => {})
  onClickOutside(el, () => {})
  watch(source, () => {})
})

// all composables called inside 'scope.run' will be disposed
scope.stop()`

  const nonReactArg = `
const isDark = useDark()
const title = useTitle('Hello')

console.log(document.title) // "Hello"

watch(isDark, () => {
  title.value = isDark.value ? '🌙 Good evening!' : '☀️ Good morning!'
})
`

  const refArg = `
const isDark = useDark()
const title = computed(() => isDark.value ? '🌙 Good evening!' : '☀️ Good morning!')

useTitle(title)`

  const next = {
    href: '/docs/guide/best-practice',
    title: 'Best Practice',
  }
  return (
    <>
      <h1 className="text-base font-semibold relative outline-none md:text-[32px] md:leading-[40px] md:-tracking-[.02em]">
        Best Practice
      </h1>
      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Destructuring
      </h2>
      <p className="my-4 mx-0 leading-[28px]">
        Most of the functions in VueUse return an object of refs that you can
        use ES6&apos;s object destructure syntax on to take what you need. For
        example:
      </p>
      <CodeBlock code={destructing} lang="ts" theme="vitesse-dark" />

      <p className="my-4 mx-0 leading-[28px]">
        If you prefer to use them as object properties, you can unwrap the refs
        by using <MdCodeHighlight>reactive()</MdCodeHighlight>. For example:
      </p>

      <CodeBlock code={exmpl} lang="ts" theme="vitesse-dark" />

      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Side-effect Clean Up
      </h2>

      <p className="my-4 mx-0 leading-[28px]">
        Similar to Vue&apos;s <MdCodeHighlight>watch</MdCodeHighlight> and{' '}
        <MdCodeHighlight>computed</MdCodeHighlight> that will be disposed when
        the component is unmounted, VueUse&apos;s functions also clean up the
        side-effects automatically.
      </p>

      <p className="my-4 mx-0 leading-[28px]">
        For example, <MdCodeHighlight>useEventListener</MdCodeHighlight> will
        call <MdCodeHighlight>removeEventListener</MdCodeHighlight> when the
        component is unmounted.
      </p>

      <CodeBlock code={cleanupExmpl} lang="ts" theme="vitesse-dark" />

      <p className="my-4 mx-0 leading-[28px]">
        All VueUse functions follow this convention.
      </p>

      <p className="my-4 mx-0 leading-[28px]">
        To manually dispose the side-effects, some functions return a stop
        handler just like the <MdCodeHighlight>watch</MdCodeHighlight> function.
        For example:
      </p>

      <CodeBlock code={disposeSideEffects} lang="ts" theme="vitesse-dark" />

      <p className="my-4 mx-0 leading-[28px]">
        Not all functions return a <MdCodeHighlight>stop</MdCodeHighlight>{' '}
        handler so a more general solution is to use the{' '}
        <MdCodeHighlight>effectScope</MdCodeHighlight> API from Vue.
      </p>

      <CodeBlock code={effectScope} lang="ts" theme="vitesse-dark" />

      <p className="my-4 mx-0 leading-[28px]">
        You can learn more about <MdCodeHighlight>effectScope</MdCodeHighlight>{' '}
        in this RFC.
      </p>

      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Reactive Arguments
      </h2>

      <p className="my-4 mx-0 leading-[28px]">
        In Vue, we use the <MdCodeHighlight>setup()</MdCodeHighlight>unction to
        construct the &ldquo;connections&rdquo; between data and logic. To make
        it flexible, most of the VueUse functions also accept refs for the
        arguments because refs are reactive.
      </p>

      <p className="my-4 mx-0 leading-[28px]">
        Take <MdCodeHighlight>useTitle</MdCodeHighlight> as an example:
      </p>

      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Non-reactive Argument
      </h2>

      <p className="my-4 mx-0 leading-[28px]">
        The <MdCodeHighlight>useTitle</MdCodeHighlight> composable helps you get
        and set the current page&apos;s document.title property.
      </p>

      <CodeBlock code={nonReactArg} lang="ts" theme="vitesse-dark" />

      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Ref Argument
      </h2>

      <p className="my-4 mx-0 leading-[28px]">
        You can pass a ref into <MdCodeHighlight>useTitle</MdCodeHighlight>{' '}
        instead of using the returned ref.
      </p>

      <CodeBlock code={refArg} lang="ts" theme="vitesse-dark" />

      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Reactive Getter Argument
      </h2>

      <p className="my-4 mx-0 leading-[28px]">
        Since VueUse 9.0, we introduced a new convention for passing a
        &ldquo;Reactive Getter&rdquo; as the argument, which works great with
        reactive objects and Reactivity Transform.
      </p>

      <Pagination next={next} />
    </>
  )
}
