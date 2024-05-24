import { Pagination } from '@/components/Common/Pagination'
import React from 'react'

const ComponentPage = () => {
  const next = {
    href: '/docs/guide/contributing',
    title: 'Contributing',
  }

  const prev = {
    href: '/docs/guide/components',
    title: 'Components',
  }
  return (
    <>
      <h1 className="text-base font-semibold relative outline-none md:text-[32px] md:leading-[40px] md:-tracking-[.02em]">
        Components
      </h1>{' '}
      <p className="my-4 mx-0 leading-[28px]">
        In v5.0, we introduced a new package,{' '}
        <code className="text-[.875em] text-[#729772] rounded-[4px] py-[3px] px-1.5 bg-[rgba(101,117,133,.16)] transition-colors">
          @vueuse/components
        </code>{' '}
        providing renderless component versions of composable functions.
      </p>
      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Install
      </h2>
      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Usage
      </h2>
      <p className="my-4 mx-0 leading-[28px]">
        For example of{' '}
        <code className="text-[.875em] text-[#729772] rounded-[4px] py-[3px] px-1.5 bg-[rgba(101,117,133,.16)] transition-colors">
          onClickOutside
        </code>{' '}
        instead of binding the component ref for functions to consume:
      </p>
      <p className="my-4 mx-0 leading-[28px]">
        We can now use the renderless component which the binding is done
        automatically:
      </p>
      <h2 className="text-2xl font-semibold relative outline-none mb-4 mt-[10px] pt-6 -tracking-[.02em]">
        Return Value
      </h2>
      <p className="my-4 mx-0 leading-[28px]">
        You can access return values with{' '}
        <code className="text-[.875em] text-[#729772] rounded-[4px] py-[3px] px-1.5 bg-[rgba(101,117,133,.16)] transition-colors">
          v-slot
        </code>{' '}
        :
      </p>
      <p className="my-4 mx-0 leading-[28px]">
        Refer to each function&apos;s documentation for the detailed usage of
        component style.
      </p>
      <Pagination previous={prev} next={next} />
    </>
  )
}

export default ComponentPage
