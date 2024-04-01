/**
 * A React hook that applies a temporary fix for the Flash of Unstyled Content (FOUC) issue in Next.js.
 *
 * @module useFoucFix
 * @returns {void}
 *
 * @interface StyleEntry
 * @property {HTMLStyleElement} element - The `<style>` element.
 * @property {string} href - The value of the `data-n-href` attribute.
 *
 * @interface StylesheetEntry
 * @property {HTMLLinkElement} element - The `<link>` element for the stylesheet.
 * @property {string} href - The value of the `href` attribute.
 *
 * @description
 * This hook is a temporary fix for the FOUC issue in Next.js, which occurs when stylesheets are loaded asynchronously,
 * causing a brief period where the page is rendered without styles. The hook works by:
 *
 * 1. Gathering all server-side rendered stylesheet entries (`<link rel="stylesheet" data-n-p>`).
 * 2. Removing the `data-n-p` attribute to prevent Next.js from removing it early.
 * 3. Setting up a MutationObserver to watch for `<style data-n-href="/...">` elements added by Next.js.
 * 4. For each new `<style>` element, either:
 *    - Remove the `data-n-href` attribute to prevent Next.js from removing it early.
 *    - Remove the element if it's already present (to avoid duplicates).
 * 5. For each server-side rendered stylesheet, remove it if it's already present as an inline `<style>` tag (to avoid duplicates).
 *
 * The hook logs a warning to the console, suggesting that it should be removed once the Next.js bug is fixed.
 *
 * @note
 * This hook is a temporary solution and should be removed once the FOUC issue is resolved in Next.js.
 * See https://github.com/vercel/next.js/issues/17464 for more information.
 */

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
    const stylesheets: StylesheetEntry[] = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][data-n-p]'),
    ).map((element) => ({
      element,
      href: element.getAttribute('href') || '',
    }))

    // Create a Set to store the href values for faster lookup.
    const hrefSet = new Set<string>()

    // Remove the `data-n-p` attribute to prevent Next.js from removing it early.
    stylesheets.forEach(({ element }) => element.removeAttribute('data-n-p'))

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

      // Cycle through the entries and either:
      // - Remove the `data-n-href` attribute to prevent Next.js from removing it early.
      // - Remove the element if it's already present.
      entries.forEach(({ element, href }) => {
        if (hrefSet.has(href)) {
          element.remove()
        } else {
          element.setAttribute('data-fouc-fix-n-href', href)
          element.removeAttribute('data-n-href')
          hrefSet.add(href)
        }
      })

      // Cycle through the server-side rendered stylesheets and remove the ones that
      // are already present as inline <style> tags added by Next.js, so that we don't have duplicate styles.
      for (let i = stylesheets.length - 1; i >= 0; i--) {
        const { element, href } = stylesheets[i]
        if (hrefSet.has(href)) {
          element.remove()
          stylesheets.splice(i, 1)
        }
      }
    }

    const observer = new MutationObserver(mutationHandler)

    observer.observe(document.head, {
      subtree: true,
      attributeFilter: ['media'],
    })

    return () => observer.disconnect()
  }, [])