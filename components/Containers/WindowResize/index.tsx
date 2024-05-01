import useWindowResize from "../../../hooks/useWindowResize";
import styles from "./index.module.css";

export default function WindowResizeShowcase() {
  const windowSize = useWindowResize();

  return (
    <>
      <div className={styles.container}>
        <h2 id="useWindowResize">useWindowResize</h2>
        <div>
          <p>Inner Width: {windowSize.innerWidth}</p>
          <p>Inner Height: {windowSize.innerHeight}</p>
          <p>Outer Width: {windowSize.outerWidth}</p>
          <p>Outer Height: {windowSize.outerHeight}</p>
        </div>
      </div>
    </>
  );
}
