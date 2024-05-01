import { useHover } from "@hooks/useHover";
import { useRef } from "react";
import styles from "./index.module.css";

export default function HoverShowase() {
  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  return (
    <>
      <div className={styles.container}>
        <h2 id="useHover">useHover</h2>
        <div ref={hoverRef}>
          {isHovered ? <p>✅ Hovered</p> : <p>❌ Not Hovered</p>}
        </div>
      </div>
    </>
  );
}
