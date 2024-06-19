import { useClipboardItems } from "./useClipboardItems"

export default function ClipboardItemsDemo() {
  const { content, copied, copy } = useClipboardItems()

  const handleCopy = async () => {
    navigator.clipboard.read
  }

  return (
    <>
    <div>
       <h1>This is a demo of the useClipboardItems hook</h1>
        <div className="p-12 border rounded-lg">
          
        </div>
    </div>
    </>
  )
}