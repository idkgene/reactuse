import { useCallback, useState } from 'react'

type CopyFn = (text: string) => Promise<boolean>

interface UseCopyToClipboardOptions {
  initialValue?: string | null
  copyFn?: CopyFn
  legacy?: boolean
}

interface UseCopyToClipboardReturn {
  copiedValue: string | null
  copy: CopyFn
  cut: CopyFn
  paste: () => Promise<string | null>
}

export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const { initialValue = null, copyFn, legacy = false } = options
  const [copiedValue, setCopiedValue] = useState<string | null>(initialValue)

  const executeCopy = useCallback(
    async (text: string): Promise<boolean> => {
      if (navigator?.clipboard) {
        try {
          await navigator.clipboard.writeText(text)
          setCopiedValue(text)
          return true
        } catch (error) {
          console.warn('useClipboard: Clipboard API copy failed', error)
          setCopiedValue(null)
          return false
        }
      } else if (legacy) {
        try {
          const textarea = document.createElement('textarea')
          textarea.value = text
          textarea.style.position = 'fixed'
          textarea.style.top = '0'
          textarea.style.left = '0'
          textarea.style.opacity = '0'
          document.body.appendChild(textarea)
          textarea.select()
          const successful = document.execCommand('copy')
          document.body.removeChild(textarea)
          if (successful) {
            setCopiedValue(text)
            return true
          } else {
            setCopiedValue(null)
            throw new Error('execCommand copy failed')
          }
        } catch (error) {
          console.warn('useClipboard: Legacy copy failed', error)
          setCopiedValue(null)
          return false
        }
      } else {
        console.warn('useClipboard: Clipboard not supported')
        return false
      }
    },
    [legacy]
  )

  const copy: CopyFn = useCallback(
    async (text: string) => {
      const result = copyFn ? await copyFn(text) : await executeCopy(text)
      if (result) {
        setCopiedValue(text)
      } else {
        setCopiedValue(null)
      }
      return result
    },
    [copyFn, executeCopy]
  )

  const cut: CopyFn = useCallback(
    async (text: string): Promise<boolean> => {
      const copied = await copy(text)
      if (copied) {
        setCopiedValue(text)
        return true
      } else {
        console.warn('useClipboard: Cut failed')
        return false
      }
    },
    [copy]
  )

  const paste = useCallback(async (): Promise<string | null> => {
    if (navigator?.clipboard) {
      try {
        const clipboardText = await navigator.clipboard.readText()
        setCopiedValue(clipboardText)
        return clipboardText
      } catch (error) {
        console.warn('useClipboard: Paste failed', error)
        setCopiedValue(null)
        return null
      }
    } else {
      console.warn('useClipboard: Clipboard not supported for paste operation')
      return null
    }
  }, [])

  return { copiedValue, copy, cut, paste }
}
