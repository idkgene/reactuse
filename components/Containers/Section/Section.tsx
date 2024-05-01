import React from "react";
import styles from "./section.module.css";

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ title, children }, ref) => {
    return (
      <div ref={ref} id={title} className={styles.c}>
        <h2 id={title} className={styles.h}>
          {title}
        </h2>
        {children}
      </div>
    );
  }
);

Section.displayName = "Section";

export default Section;
