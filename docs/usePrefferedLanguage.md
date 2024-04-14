# `usePreferredLanguage`

A nifty and convenient React hook that effortlessly retrieves the preferred language code of the user's browser, empowering your components to adapt and deliver localized content seamlessly. 🌐🗣️

## Usage

```tsx
import { usePreferredLanguage } from "./usePreferredLanguage";

const MyComponent = () => {
  const preferredLanguage = usePreferredLanguage();

  return (
    <div>
      <h1>Welcome!</h1>
      {preferredLanguage === "fr" && <p>Bonjour!</p>}
      {preferredLanguage === "es" && <p>¡Hola!</p>}
      {preferredLanguage === "en" && <p>Hello!</p>}
    </div>
  );
};
```

## Reference

```tsx
type LanguageCode = string;

/**
 * A custom hook that returns the preferred language code of the browser.
 * @returns {LanguageCode} The preferred language code of the browser.
 */
const usePreferredLanguage = (): LanguageCode;
```

## Under the Hood

The `usePreferredLanguage` hook utilizes React's `useState` and `useEffect` hooks to manage the preferred language state and handle the language change event. It retrieves the preferred language code from the browser's `navigator.language` property and updates the state accordingly. The hook also listens for the `languagechange` event to detect any changes in the user's preferred language and updates the state in real-time.
