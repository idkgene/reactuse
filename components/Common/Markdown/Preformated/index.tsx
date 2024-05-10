import React from "react";

type PreformatedProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLPreElement>;

const MarkdownPreformated = React.forwardRef<HTMLPreElement, PreformatedProps>(
  ({ children, ...props }, ref) => {
    return (
      <pre ref={ref} {...props}>
        {children}
      </pre>
    );
  }
);

export { MarkdownPreformated };
