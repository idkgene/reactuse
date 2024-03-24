import { useEffect } from 'react'

interface StyleEntry {
  element: HTMLStyleElement
  href: string
}

interface StylesheetEntry {
  element: HTMLLinkElement
  href: string
}

export const useFoucFix = (): void =>
  useEffect(() => {
    console.debug(
      'WARNING: Still using FOUC temp fix on route change. Has the Next.js bug not been fixed? See https://github.com/vercel/next.js/issues/17464',
    )

    // Gather all server-side rendered stylesheet entries.
    let stylesheets: StylesheetEntry[] = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][data-n-p]'),
    ).map((element) => ({
      element,
      href: element.getAttribute('href') || '',
    }))

    // Remove the `data-n-p` attribute to prevent Next.js from removing it early.
    stylesheets.forEach(({ element }) => element.removeAttribute('data-n-p'))

    const hrefs: string[] = []

    const mutationHandler = (mutations: MutationRecord[]) => {
      // Gather all <style data-n-href="/..."> elements.
      const entries: StyleEntry[] = mutations
        .filter(({ target }) => {
          const el = target as Node
          return el.nodeName === 'STYLE' && el instanceof HTMLStyleElement && el.hasAttribute('data-n-href')
        })
        .map(({ target }) => ({
          element: target as HTMLStyleElement,
          href: (target as HTMLStyleElement).getAttribute('data-n-href') || '',
        }))

      // Cycle through them and either:
      // - Remove the `data-n-href` attribute to prevent Next.js from removing it early.
      // - Remove the element if it's already present.
      entries.forEach(({ element, href }) => {
        const exists = hrefs.includes(href)

        if (exists) {
          element.remove()
        } else {
          element.setAttribute('data-fouc-fix-n-href', href)
          element.removeAttribute('data-n-href')
          hrefs.push(href)
        }
      })

      // Cycle through the server-side rendered stylesheets and remove the ones that
      // are already present as inline <style> tags added by Next.js, so that we don't have duplicate styles.
      stylesheets = stylesheets.reduce((entries, entry) => {
        const { element, href } = entry
        const exists = hrefs.includes(href)

        if (exists) {
          element.remove()
        } else {
          entries.push(entry)
        }

        return entries
      }, [] as StylesheetEntry[])
    }

    const observer = new MutationObserver(mutationHandler)

    observer.observe(document.head, {
      subtree: true,
      attributeFilter: ['media'],
    })

    return () => observer.disconnect()
  }, [])