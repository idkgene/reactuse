import { useRect } from "@/hooks/useRect";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

export default function RectShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const rect = useRect(targetRef);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && targetRef.current && rect) {
        const newWidth = e.clientX - rect.left;
        const newHeight = e.clientY - rect.top;

        (targetRef.current as HTMLDivElement).style.width = `${newWidth}px`;
        (targetRef.current as HTMLDivElement).style.height = `${newHeight}px`;
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, rect, targetRef]);

  return (
    <>
      <div className={styles.container}>
        <h2 id="useRect">useRect</h2>
        <div
          ref={targetRef}
          role="presentation"
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "lightgray",
            cursor: "nwse-resize",
            minHeight: "100px",
            minWidth: "100px",
            maxWidth: "350px",
            maxHeight: "350px",
          }}
          onMouseDown={() => setIsResizing(true)}
        ></div>
        <pre className="select-none">{JSON.stringify(rect, null, 2)}</pre>
      </div>
    </>
  );
}
