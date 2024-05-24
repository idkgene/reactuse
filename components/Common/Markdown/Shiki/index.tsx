import React, { useEffect, useRef } from 'react'
import { codeToHtml } from 'shiki'

type CodeBlockProps = {
  code: string
  lang: string
  theme?: string
  lineNumbers?: boolean
  highlight?: string
  className?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  lang,
  theme = 'vitesse-dark',
  lineNumbers = false,
  highlight = '',
  className = '',
}) => {
  const codeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const highlightCode = async () => {
      const html = await codeToHtml(code, { lang, theme })
      codeRef.current!.innerHTML = html

      if (lineNumbers) {
        const lines = codeRef.current!.querySelectorAll('.line')
        lines.forEach((line, index) => {
          const lineNumber = document.createElement('span')
          lineNumber.classList.add('line-number')
          lineNumber.textContent = (index + 1).toString()
          line.insertBefore(lineNumber, line.firstChild)
        })
      }

      if (highlight) {
        const highlightLines = highlight.split(',').map(Number)
        const lines = codeRef.current!.querySelectorAll('.line')
        highlightLines.forEach((lineNumber) => {
          const line = lines[lineNumber - 1]
          if (line) {
            line.classList.add('highlight')
          }
        })
      }
    }

    highlightCode()
  }, [code, lang, theme, lineNumbers, highlight])

  return <div className={`${className}`} ref={codeRef}></div>
}

export default CodeBlock
