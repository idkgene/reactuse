"use client";
import { useEffect, useRef } from "react";

interface TableOfContentsProps {
  headers: HTMLHeadingElement[];
}

export default function TableOfContents({ headers }: TableOfContentsProps) {
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const link = tocRef.current?.querySelector(
              `[href="#${id}"]`
            ) as HTMLAnchorElement;
            if (link) {
              link.classList.add("active");
            }
          } else {
            const link = tocRef.current?.querySelector(
              `.active[href="#${entry.target.id}"]`
            ) as HTMLAnchorElement;
            if (link) {
              link.classList.remove("active");
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    headers.forEach((header) => {
      observer.observe(header);
    });

    return () => {
      headers.forEach((header) => {
        observer.unobserve(header);
      });
    };
  }, [headers]);

  return (
    <div ref={tocRef} className="table-of-contents">
      {headers.map((header, index) => {
        const slug = header.textContent?.toLowerCase().replace(/\s+/g, "-");
        return (
          <a key={index} href={`#${slug}`}>
            {header.textContent}
          </a>
        );
      })}
    </div>
  );
}
