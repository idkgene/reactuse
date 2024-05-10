import React from "react";

type SpanProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

const MarkdownSpan = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ children, ...props }, ref) => {
    return (
      <span ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

export { MarkdownSpan };
