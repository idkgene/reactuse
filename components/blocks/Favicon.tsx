import { Input } from '@ui-components/input'
import { useState } from 'react'

export default function FaviconShowcase() {
  const [faviconUrl, setFaviconUrl] = useState<string>(
    'https://www.w3schools.com/favicon.ico',
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFaviconUrl(event.target.value)
  }

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useFavicon"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useFavicon
        </h2>
        <Input
          type="text"
          placeholder="Enter a new favicon URL"
          value={faviconUrl}
          onChange={handleInputChange}
          id="useFavicon"
        />
      </div>
    </>
  )
}
