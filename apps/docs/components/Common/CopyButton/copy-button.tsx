import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

function CopyButton({ value }: { value: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={copy}
      className="focus-visible:ring-ring border-input bg-background text-foreground hover:bg-muted hover:text-foreground relative z-10 inline-flex size-7 items-center justify-center whitespace-nowrap rounded-md border text-sm font-medium opacity-100 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5"
      aria-label="Copy code"
    >
      {isCopied ? (
        <CheckIcon className="size-4" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </button>
  );
}

export default CopyButton;
