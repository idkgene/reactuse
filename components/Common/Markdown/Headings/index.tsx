import React from 'react'

type HeadingProps = {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    children: React.ReactNode
} & React.HTMLAttributes<HTMLHeadingElement>

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ as: Component = 'h2', children, ...props }, ref) => {
        return (
            <Component ref={ref} {...props}>
                {children}
            </Component>
        )
    }
)

Heading.displayName = 'Heading'

const MarkdownHeading1 = React.forwardRef<
    HTMLHeadingElement,
    Omit<HeadingProps, 'as'>
>((props, ref) => {
    return (
        <Heading
            as="h1"
            className="my-[.67em] font-semibold pb-[.3em] text-[2em] border-b border-solid border-[#21262d] mt-6 mb-4 leading-tight"
            ref={ref}
            {...props}
        />
    )
})

MarkdownHeading1.displayName = 'MarkdownHeading1'

const MarkdownHeading2 = React.forwardRef<
    HTMLHeadingElement,
    Omit<HeadingProps, 'as'>
>((props, ref) => {
    return (
        <Heading
            as="h2"
            className="font-semibold pb-[.3em] text-[1.5em] border-b border-solid border-[#21262d] mt-6 mb-4 leading-tight"
            ref={ref}
            {...props}
        />
    )
})

MarkdownHeading2.displayName = 'MarkdownHeading2'

const MarkdownHeading3 = React.forwardRef<
    HTMLHeadingElement,
    Omit<HeadingProps, 'as'>
>((props, ref) => {
    return (
        <Heading
            as="h3"
            className="font-semibold text-[1.25em] mt-6 mb-4 leading-tight"
            ref={ref}
            {...props}
        />
    )
})

MarkdownHeading3.displayName = 'MarkdownHeading3'

const MarkdownHeading4 = React.forwardRef<
    HTMLHeadingElement,
    Omit<HeadingProps, 'as'>
>((props, ref) => {
    return (
        <Heading
            as="h4"
            className="font-semibold text-[1em] mt-6 mb-4 leading-tight"
            ref={ref}
            {...props}
        />
    )
})

MarkdownHeading4.displayName = 'MarkdownHeading4'

const MarkdownHeading5 = React.forwardRef<
    HTMLHeadingElement,
    Omit<HeadingProps, 'as'>
>((props, ref) => {
    return (
        <Heading
            as="h5"
            className="font-semibold text-[.875em] mt-6 mb-4 leading-tight"
            ref={ref}
            {...props}
        />
    )
})

MarkdownHeading5.displayName = 'MarkdownHeading5'

const MarkdownHeading6 = React.forwardRef<
    HTMLHeadingElement,
    Omit<HeadingProps, 'as'>
>((props, ref) => {
    return (
        <Heading
            as="h6"
            className="font-semibold text-[.85em] text-[#848d97] mt-6 mb-4 leading-tight"
            ref={ref}
            {...props}
        />
    )
})

MarkdownHeading6.displayName = 'MarkdownHeading6'

export {
    Heading,
    MarkdownHeading1,
    MarkdownHeading2,
    MarkdownHeading3,
    MarkdownHeading4,
    MarkdownHeading5,
    MarkdownHeading6,
}
