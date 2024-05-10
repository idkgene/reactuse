"use client";
import * as React from "react";
import Image from "next/image";
import ReactLogo from "../../../../public/react-icon.svg";
import Link from "next/link";
import styles from "../index.module.css";

export function ReactUseLogo() {
  return (
    <>
      <div className={styles.title}>
        <div>
          <Link href="/" className={styles.logoLink}>
            <Image
              src={ReactLogo}
              alt="React Logo"
              height={32}
              width={32}
              className="mr-2 h-6"
            />

            <span className={styles.logoString}>ReactUse</span>
          </Link>
        </div>
      </div>
    </>
  );
}
