import { renderHook } from '@testing-library/react'
import { useScript } from '../useScript'

describe('useScript', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should append a script element to the document body', () => {
    const url = 'https://example.com/script.js'
    renderHook(() => useScript(url))

    const scriptElement = document.body.querySelector('script')
    expect(scriptElement).not.toBeNull()
    expect(scriptElement?.src).toBe(url)
    expect(scriptElement?.async).toBe(true)
  })

  it('should remove the script element when the component unmounts', () => {
    const url = 'https://example.com/script.js'
    const { unmount } = renderHook(() => useScript(url))

    unmount()

    const scriptElement = document.body.querySelector('script')
    expect(scriptElement).toBeNull()
  })

  it('should update the script source when the URL changes', () => {
    const url1 = 'https://example.com/script1.js'
    const url2 = 'https://example.com/script2.js'
    const { rerender } = renderHook(({ url }) => useScript(url), {
      initialProps: { url: url1 },
    })

    const scriptElement1 = document.querySelector('script')
    expect(scriptElement1?.src).toBe(url1)

    rerender({ url: url2 })

    const scriptElement2 = document.querySelector('script')
    expect(scriptElement2?.src).toBe(url2)
  })
})
