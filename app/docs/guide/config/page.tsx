import { Pagination } from '@/components/Common/Pagination'

export default function ConfigPage() {
  const prev = {
    href: '/docs/guide/best-practice',
    title: 'Best Practice',
  }

  const next = {
    href: '/docs/guide/components',
    title: 'Components',
  }
  return (
    <>
      <h1 className="text-base font-semibold relative outline-none md:text-[32px] md:leading-[40px] md:-tracking-[.02em]">
        Configurations
      </h1>
      <p className="my-4 mx-0 leading-[28px]">
        These show the general configurations for most of the functions in
        VueUse.
      </p>{' '}
      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Event Filters
      </h2>
      <p className="my-4 mx-0 leading-[28px]">
        From v4.0, we provide the Event Filters system to give the flexibility
        to control when events will get triggered. For example, you can use
        <code className="text-[.875em] text-[#729772] rounded-[4px] py-[3px] px-1.5 bg-[rgba(101,117,133,.16)] transition-colors">
          throttleFilter
        </code>{' '}
        and{' '}
        <code className="text-[.875em] text-[#729772] rounded-[4px] py-[3px] px-1.5 bg-[rgba(101,117,133,.16)] transition-colors">
          debounceFilter
        </code>{' '}
        to control the event trigger rate:
      </p>
      <p className="my-4 mx-0 leading-[28px]">
        Moreover, you can utilize{' '}
        <code className="text-[.875em] text-[#729772] rounded-[4px] py-[3px] px-1.5 bg-[rgba(101,117,133,.16)] transition-colors">
          pausableFilter
        </code>{' '}
        to temporarily pause some events.
      </p>{' '}
      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Reactive Timing
      </h2>
      <p className="my-4 mx-0 leading-[28px]">
        VueUse&apos;s functions follow Vue&apos;s reactivity system defaults for
        flush timing where possible.
      </p>
      <p className="my-4 mx-0 leading-[28px]">
        For watch-like composables (e.g. pausableWatch, whenever, useStorage
        useRefHistory the default is flush: &apos;pre&apos;. Which means they
        will buffer invalidated effects and flush them asynchronously. This
        avoids unnecessary duplicate invocation when there are multiple state
        mutations happening in the same &ldquo;tick&rdquo;.
      </p>
      <p className="my-4 mx-0 leading-[28px]">
        In the same way as with watch, VueUse allows you to configure the timing
        by passing the flush option:
      </p>
      <p className="my-4 mx-0 leading-[28px]">flush option (default: pre)</p>
      <ul>
        <li className="my-4 mx-0 leading-[28px]">
          &apos;pre&apos;: buffers invalidated effects in the same
          &apos;tick&apos; and flushes them before rendering
        </li>
        <li className="my-4 mx-0 leading-[28px]">
          &apos;post&apos;: async like &apos;pre&apos; but fires after component
          updates so you can access the updated DOM
        </li>
        <li className="my-4 mx-0 leading-[28px]">
          &apos;sync&apos;: forces the effect to always trigger synchronously
        </li>
      </ul>
      <p className="my-4 mx-0 leading-[28px]">
        Note: For computed-like composables (e.g. syncRef controlledComputed),
        when flush timing is configurable, the default is changed to flush:
        &apos;sync&apos; to align them with the way computed refs works in Vue.
      </p>
      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Configurable Global Dependencies
      </h2>
      <p className="my-4 mx-0 leading-[28px]">
        From v4.0, functions that access the browser APIs will provide an option
        fields for you to specify the global dependencies (e.g. window, document
        and navigator). It will use the global instance by default, so for most
        of the time, you don&apos;t need to worry about it. This configure is
        useful when working with iframes and testing environments.
      </p>
      <Pagination previous={prev} next={next} />
    </>
  )
}
