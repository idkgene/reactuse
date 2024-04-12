import useMousePosition from "@hooks/useMousePosition";
import styles from "./index.module.css";

export default function MousePositionShowcase() {
  const position = useMousePosition();

  return (
    <>
      <div className={styles.container}>
        <h2 id="useMousePosition">useMousePosition</h2>
        <div id="useMousePosition">
          <p>
            X: {position.x}, Y: {position.y}
          </p>
        </div>
      </div>
    </>
  );
}
