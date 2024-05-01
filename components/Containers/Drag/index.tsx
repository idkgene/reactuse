import { useDrag } from "../../../hooks/useDrag";
import styles from "./index.module.css";

export default function DragShowcase() {
  const { isDragging, dragRef, position } = useDrag();
  return (
    <>
      <div className={styles.container}>
        <h2 id="useDrag">useDrag</h2>
        <div
          ref={dragRef}
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            cursor: isDragging ? "grabbing" : "grab",
            border: "1px solid black",
            padding: "10px",
            backgroundColor: isDragging ? "lightblue" : "lightgray",
          }}
        >
          Drag me!
        </div>
      </div>
    </>
  );
}
