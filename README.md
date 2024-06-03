<p align="center">
  <img src="./public/banner.svg" alt="banner" width="300">
<br>
  Collection of essential React hooks.
</p>

<p align="center">
<a href="https://www.npmjs.com/package/#" target="__blank"><img src="https://img.shields.io/npm/v/@/core?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/#" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@reactuse/core?color=50a36f&label="></a>
<a href="#" target="__blank"><img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=1e8a7a" alt="Docs & Demos"></a>
<br>
<a href="https://github.com/changeelog/reactuse" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/changeelog/reactuse?style=social"></a> 
</p>

<h2>Features</h2>

- 🚀 Extensive collection of utility hooks
- 🌐 TypeScript support out of the box
- 🎨 Intuitive and consistent API design
- 📦 Modular and tree-shakable
- 🌙 Dark mode support
- 🌍 Localization utilities
- 🧪 Thoroughly tested

<h2>Usage</h2>

```tsx
import { useClipboard } from 'changeelog/reactuse'
import * as React from 'react

const Component = () => {
  const [text, setText] = useState('')
  const { copiedValue, copy, cut, paste } = useCopyToClipboard()

  const handleCopy = async () => {
    const isCopied = await copy(text)
    console.log(isCopied ? 'Copied successfully!' : 'Copy failed')
  }

  const handleCut = async () => {
    const isCut = await cut(text)
    console.log(isCut ? 'Cut successfully!' : 'Cut failed')
  }

  const handlePaste = async () => {
    const pastedText = await paste()
    console.log(pastedText ? `Pasted: ${pastedText}` : 'Paste failed')
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Copied Value: {copiedValue}</p>
      <button onClick={handleCopy}>Copy</button>
      <button onClick={handleCut}>Cut</button>
      <button onClick={handlePaste}>Paste</button>
    </div>
  )
}

export default Component
```

Refer to functions list or documentations for more details.

> \[!NOTE]\
> The repo is in development.