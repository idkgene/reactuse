import * as React from "react";

export const Footer = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer
      className="max-w-[1152px] mx-auto text-center text-[14px] leading-[24px] font-medium text-[rgba(255,255,245,.6)]"
      ref={ref}
      {...props}
    >
      Released under the MIT License.
    </footer>
  );
});

Footer.displayName = "Footer";
