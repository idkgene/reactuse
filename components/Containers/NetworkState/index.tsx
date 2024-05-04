import { useNetworkState } from "../../../hooks/@Sensors/useNetworkState";
import styles from "./index.module.css";

export default function NetworkState() {
  const networkState = useNetworkState();

  return (
    <>
      <div className={styles.container}>
        <h2 id="useNetworkState">useNetworkState</h2>
        <div>
          <p>Online: {networkState.online ? "Yes" : "No"}</p>
          <p>Speed: {networkState.speed}</p>
          <p>Type: {networkState.type}</p>
        </div>
      </div>
    </>
  );
}
