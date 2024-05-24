// components/mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import { Code } from '@/components/Common/Markdown/Code/index'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: (props: any) => {
      const { children } = props
      const codeProps = children.props || {}
      const { className = '', children: codeString = '', ...rest } = codeProps

      // Language extraction from className (e.g., 'language-js')
      const language = className.replace(/language-/, '') || 'javascript'

      return <Code code={codeString} language={language} {...rest} />
    },
  }
}
