import { Pre, CodeBlock } from 'fumadocs-ui/components/codeblock';

interface CodeViewProps {
  highlightedCode: string | null;
  error: string | null;
}

function CodeView({ highlightedCode, error }: CodeViewProps): JSX.Element {
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!highlightedCode) {
    return <p>Loading...</p>;
  }

  return (
    <CodeBlock className="!my-0 !rounded-sm !border-none">
      <Pre>
        <div
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          className="shiki-wrapper"
        />
      </Pre>
    </CodeBlock>
  );
}

export { CodeView };
