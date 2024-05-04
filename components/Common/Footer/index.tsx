import * as React from "react";
import Image from "next/image";
import GithubIcon from "../public/github.svg";
import TelegramIcon from "../public/telegram.svg";

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
