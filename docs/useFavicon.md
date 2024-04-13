# `useFavicon`

A concise React module for dynamically updating the favicon of a webpage with a new image URL. 🌟🔍

## Usage

```tsx
import { useFavicon } from "./hooks/useFavicon";

function MyComponent() {
  useFavicon("https://example.com/favicon.ico");

  return (
    <div>
      <h1>My Component</h1>
      {/* Component content */}
    </div>
  );
}
```

## Reference

```tsx
/**
 * Dynamically updates the favicon of a webpage with a new image URL.
 * @param url - The URL of the new favicon image.
 */
import { useEffect } from "react";

export function useFavicon(url: string) {
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");

    if (!link) {
      link = document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
    }

    link.href = url;

    if (document.head) {
      document.head.appendChild(link);
    }
  }, [url]);
}
```

This module efficiently handles the task of updating the favicon of a webpage with a new image URL by utilizing the useEffect hook. It checks for an existing favicon link element, creates one if it doesn't exist, sets the href attribute to the provided URL, and appends it to the document head for immediate effect. 🎨🔍
