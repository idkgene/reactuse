import * as React from 'react'

export const Footer = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer
      className="max-w-[1152px] mt-8 mx-auto text-center text-[14px] leading-[24px] font-medium text-[#13131f] dark:text-[#fffff599]"
      ref={ref}
      {...props}
    >
      Released under the MIT License.
    </footer>
  )
})

Footer.displayName = 'Footer'
