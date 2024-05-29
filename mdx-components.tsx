import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import Code from './components/Common/Markdown/Shiki'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children, id }) => (
      <h1
        className="text-base font-semibold relative outline-none md:text-[32px] md:leading-[40px] md:-tracking-[.02em]"
        id={id}
      >
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2
        className="text-2xl font-semibold relative outline-none mb-4 mt-2.5 pt-6 -tracking-[.02em]"
        id={id}
      >
        {children}
      </h2>
    ),
    p: ({ children }) => <p className="my-4 mx-0 leading-[28px]">{children}</p>,

    code: ({ children }) => (
      <code className="text-[.875rem] text-[#729772] rounded py-[3px] px-1.5 bg-[rgba(101,117,133,.16] transition-colors">
        {children}
      </code>
    ),

    blockquote: ({ children }) => (
      <blockquote className="mt-4 border-l-2 border-solid border-[#e2e2e3] dark:border-[#2e2e32] pl-4 m-0 text-base text-[rgba(60,60,67,.78)] dark:text-[rgba(235,235,245,.6)] transition-colors leading-[28px] break-words">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <table
        role="grid"
        tabIndex={-1}
        aria-describedby=""
        className="min-w-full h-auto table-auto w-full"
      >
        {children}
      </table>
    ),
    thead: ({ children }) => (
      <thead className="[&>tr]:first:rounded-lg">{children}</thead>
    ),
    tr: ({ children }) => (
      <tr
        className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
        role="group"
      >
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th
        tabIndex={-1}
        role="column"
        className="group px-3 h-10 text-left rtl:text-right align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg rtl:first:rounded-r-lg rtl:first:rounded-l-[unset] last:rounded-r-lg rtl:last:rounded-l-lg rtl:last:rounded-r-[unset] data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
      >
        {children}
      </th>
    ),
    tbody: ({ children }) => <tbody role="rowgroup">{children}</tbody>,
    td: ({ children }) => (
      <td
        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-data-[odd=true]:before:bg-default-100 group-data-[odd=true]:before:opacity-100 group-data-[odd=true]:before:-z-10 first:before:rounded-l-lg rtl:first:before:rounded-r-lg rtl:first:before:rounded-l-[unset] last:before:rounded-r-lg rtl:last:before:rounded-l-lg rtl:last:before:rounded-r-[unset]"
        role="row"
        tabIndex={-1}
      >
        {children}
      </td>
    ),
    img: (props) => (
      <Image
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    // a: ({ children }) => (
    //   <Link className="font-medium underline transition-colors text-[#44bd87] underline-offset-2">
    //     {children}
    //   </Link>
    // ),
  }
}
