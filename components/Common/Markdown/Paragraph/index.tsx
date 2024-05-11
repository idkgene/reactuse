import React from 'react'

type ParagraphProps = {
    children: React.ReactNode
} & React.HTMLAttributes<HTMLParagraphElement>

const MarkdownParagraph = React.forwardRef<
    HTMLParagraphElement,
    ParagraphProps
>(({ children, ...props }, ref) => {
    return (
        <p ref={ref} {...props} className="mt-0 mb-4">
            {children}
        </p>
    )
})

MarkdownParagraph.displayName = 'MarkdownParagraph'

export { MarkdownParagraph }
