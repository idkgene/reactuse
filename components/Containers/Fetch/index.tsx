import { useFetch } from "../../../hooks/@Network/useFetch";
import styles from "./index.module.css";

export default function FetchShowcase() {
  const {
    data: axiosData,
    loading: axiosLoading,
    error: axiosError,
    refetch: axiosRefetch,
  } = useFetch("https://jsonplaceholder.typicode.com/posts/1", {
    library: "axios",
  });

  const {
    data: kyData,
    loading: kyLoading,
    error: kyError,
    refetch: kyRefetch,
  } = useFetch("https://jsonplaceholder.typicode.com/posts/1", {
    library: "ky",
  });

  const {
    data: fetchData,
    loading: fetchLoading,
    error: fetchError,
    refetch: fetchRefetch,
  } = useFetch("https://jsonplaceholder.typicode.com/posts/1", {
    library: "fetch",
  });

  const {
    data: reactQueryData,
    loading: reactQueryLoading,
    error: reactQueryError,
    refetch: reactQueryRefetch,
  } = useFetch("https://jsonplaceholder.typicode.com/posts/1", {
    library: "react-query",
    queryKey: ["post"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) =>
        res.json()
      ),
  });

  return (
    <>
      <div className={styles.container}>
        <h2 id="useFetch">useFetch</h2>
        <div>
          <h2>Axios</h2>
          {axiosLoading ? (
            <p>Loading...</p>
          ) : axiosError ? (
            <p>Error: {axiosError.message}</p>
          ) : (
            <pre>{JSON.stringify(axiosData, null, 2)}</pre>
          )}
          <button onClick={axiosRefetch}>Refetch</button>

          <h2>Ky</h2>
          {kyLoading ? (
            <p>Loading...</p>
          ) : kyError ? (
            <p>Error: {kyError.message}</p>
          ) : (
            <pre>{JSON.stringify(kyData, null, 2)}</pre>
          )}
          <button onClick={kyRefetch}>Refetch</button>

          <h2>Fetch</h2>
          {fetchLoading ? (
            <p>Loading...</p>
          ) : fetchError ? (
            <p>Error: {fetchError.message}</p>
          ) : (
            <pre>{JSON.stringify(fetchData, null, 2)}</pre>
          )}
          <button onClick={fetchRefetch}>Refetch</button>

          <h2>React Query</h2>
          {reactQueryLoading ? (
            <p>Loading...</p>
          ) : reactQueryError ? (
            <p>Error: {reactQueryError.message}</p>
          ) : (
            <pre>{JSON.stringify(reactQueryData, null, 2)}</pre>
          )}
          <button onClick={reactQueryRefetch}>Refetch</button>
        </div>
      </div>
    </>
  );
}
