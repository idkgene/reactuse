import { useIsomorphicLayoutEffect } from "@hooks/useIsomorphicLayoutEffect";

export default function IsomorphicLayoutEffect() {
  useIsomorphicLayoutEffect(() => {
    console.log("Isomorphic layout effect triggered");
  }, []);

  return (
    <>
      <div>
        <h2 id="useIsomorphicLayoutEffect">useIsomorphicLayoutEffect</h2>
        <p>Check console for effect trigger</p>
      </div>
    </>
  );
}
