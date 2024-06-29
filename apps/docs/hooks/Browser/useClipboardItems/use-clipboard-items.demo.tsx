import { useClipboardItems } from './use-clipboard-items';

export default function ClipboardItemsDemo() {
  const { content, copied, copy } = useClipboardItems();

  const handleCopy = async () => {
    navigator.clipboard.read;
  };

  return (
    <div>
      <h1>This is a demo of the useClipboardItems hook</h1>
      <div className="rounded-lg border p-12" />
    </div>
  );
}
