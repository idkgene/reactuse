import { renderHook } from '@testing-library/react'
import { useDocumentTitle } from '@hooks/@Browser/useDocumentTitle'

describe('useDocumentTitle', () => {
  afterEach(() => {
    document.title = ''
  })

  it('should set the document title', () => {
    renderHook(() => useDocumentTitle('Test Title'))
    expect(document.title).toBe('Test Title')
  })

  it('should use the initial title if provided and title is empty', () => {
    renderHook(() => useDocumentTitle('', { initialTitle: 'Initial Title' }))
    expect(document.title).toBe('Initial Title')
  })

  it('should format the title using the provided formatter', () => {
    const formatter = (title: string) => `Formatted: ${title}`
    renderHook(() => useDocumentTitle('Test Title', { formatter }))
    expect(document.title).toBe('Formatted: Test Title')
  })

  it('should not set the document title if both title and initialTitle are empty', () => {
    document.title = 'Previous Title'
    renderHook(() => useDocumentTitle(''))
    expect(document.title).toBe('Previous Title')
  })
})
