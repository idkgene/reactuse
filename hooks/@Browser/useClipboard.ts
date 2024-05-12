import { useCallback, useState } from 'react'

type CopyFn = (text: string) => Promise<boolean>

interface UseCopyToClipboardOptions {
  initialValue?: string | null
  copyFn?: CopyFn
}

interface UseCopyToClipboardReturn {
  copiedValue: string | null
  copy: CopyFn
}

export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const { initialValue = null, copyFn } = options
  const [copiedValue, setCopiedValue] = useState<string | null>(initialValue)

  const copy: CopyFn = useCallback(async (text) => {
    if (navigator?.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedValue(text)
        return true
      } catch (error) {
        console.warn('useClipboard: Copy failed', error)
        setCopiedValue(null)
        return false
      }
    } else {
      console.warn('useClipboard: Clipboard not supported')
      return false
    }
  }, [])

  return { copiedValue, copy: copyFn || copy }
}
