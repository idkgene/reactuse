"use client";
import * as React from "react";
import Image from "next/image";
import ReactLogo from "../../../public/react-icon.svg";
import Link from "next/link";
import ThemeToggle from "../Toggle";
import { GithubIcon } from "../Icons/Github/icon";
import { TelegramIcon } from "../Icons/Telegram/icon";
import { DiscordIcon } from "../Icons/Discord/icon";
import styles from "./index.module.css";
import { Searchbar } from "./Search";
import { ReactUseLogo } from "./Logo";

export const Navigation = React.forwardRef<HTMLElement>((props, ref) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Link href="/main" className="sr-only">
        Skip to Main
      </Link>
      <header
        className={`${styles.nav} ${isScrolled ? "bg-[#1b1b1f]" : ""}`}
        ref={ref}
        {...props}
      >
        <div className={styles.navbar}>
          <div className={styles.wrapper}>
            <div className={`${styles.container} container`}>
              <ReactUseLogo />
              <div className={styles.content}>
                <div className={styles.contentBody}>
                  <Searchbar />
                  <nav
                    aria-labelledby="main-nav-aria-label"
                    className={styles.navbarMenu}
                    id="navbar-menu"
                  >
                    <span className="sr-only" id="main-nav-aria-label">
                      Main Navigation
                    </span>
                    <Link href="/guide" className={styles.navbarMenuLink}>
                      Guide
                    </Link>
                    <Link href="/hooks" className={styles.navbarMenuLink}>
                      Hooks
                    </Link>
                  </nav>
                  <ThemeToggle />
                  <div className={styles.socials}>
                    <Link href="example.com" className={styles.socialsLink}>
                      <span className={styles.socialsLinkIcon}>
                        {" "}
                        <GithubIcon />
                      </span>
                    </Link>
                    <Link href="example.com" className={styles.socialsLink}>
                      <span className={styles.socialsLinkIcon}>
                        {" "}
                        <DiscordIcon />
                      </span>
                    </Link>
                    <Link href="example.com" className={styles.socialsLink}>
                      <span className={styles.socialsLinkIcon}>
                        {" "}
                        <TelegramIcon fill="rgba(235,235,245,.6)" />
                      </span>
                    </Link>
                  </div>
                  <button
                    type="button"
                    aria-label="Mobile Navigation"
                    aria-expanded="false"
                    aria-controls=""
                    className={styles.mobileNav}
                  >
                    <span className={`${styles.mobileMenuIcon} container`}>
                      <span
                        id="top"
                        className={styles.mobileMenuIconTop}
                      ></span>
                      <span
                        id="mid"
                        className={styles.mobileMenuIconMiddle}
                        style={{ transform: "translate(8px)" }}
                      ></span>
                      <span
                        id="bottom"
                        className={styles.mobileMenuIconBottom}
                        style={{ transform: "translate(4px)" }}
                      ></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.divider}>
            <div
              className={`${styles.dividerLine} ${
                isScrolled ? "bg-[#2e2e32]" : "bg-transparent"
              }`}
            ></div>
          </div>
        </div>
      </header>
    </>
  );
});

Navigation.displayName = "Navigation";
