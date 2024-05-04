/**
 * @module useFoucFix
 * @returns {void} 
 *
 *  @note
 * This hook is a temporary solution and should be removed once the FOUC issue is resolved in Next.js.
 * See https://github.com/vercel/next.js/issues/17464 for more information.
 */

import { useEffect } from "react";

interface StyleEntry {
  element: HTMLStyleElement;
  href: string;
}

interface StylesheetEntry {
  element: HTMLLinkElement;
  href: string;
}

export const useFoucFix = (): void =>
  useEffect(() => {
    console.debug(
      "WARNING: Still using FOUC temp fix on route change. Has the Next.js bug not been fixed? See https://github.com/vercel/next.js/issues/17464",
    );

    const stylesheets: StylesheetEntry[] = Array.from(
      document.querySelectorAll<HTMLLinkElement>(
        'link[rel="stylesheet"][data-n-p]',
      ),
    ).map((element) => ({
      element,
      href: element.getAttribute("href") || "",
    }));

    const hrefSet = new Set<string>();

    stylesheets.forEach(({ element }) => element.removeAttribute("data-n-p"));

    const mutationHandler = (mutations: MutationRecord[]) => {
      const entries: StyleEntry[] = mutations
        .filter(({ target }) => {
          const el = target as Node;
          return (
            el.nodeName === "STYLE" &&
            el instanceof HTMLStyleElement &&
            el.hasAttribute("data-n-href")
          );
        })
        .map(({ target }) => ({
          element: target as HTMLStyleElement,
          href: (target as HTMLStyleElement).getAttribute("data-n-href") || "",
        }));

      entries.forEach(({ element, href }) => {
        if (hrefSet.has(href)) {
          element.remove();
        } else {
          element.setAttribute("data-fouc-fix-n-href", href);
          element.removeAttribute("data-n-href");
          hrefSet.add(href);
        }
      });

      for (let i = stylesheets.length - 1; i >= 0; i--) {
        const { element, href } = stylesheets[i];
        if (hrefSet.has(href)) {
          element.remove();
          stylesheets.splice(i, 1);
        }
      }
    };

    const observer = new MutationObserver(mutationHandler);

    observer.observe(document.head, {
      subtree: true,
      attributeFilter: ["media"],
    });

    return () => observer.disconnect();
  }, []);
