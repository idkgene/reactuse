import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

export default function IsomorphicLayoutEffect() {
  useIsomorphicLayoutEffect(() => {
    console.log('Isomorphic layout effect triggered');
  }, [])
  
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useIsomorphicLayoutEffect"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useIsomorphicLayoutEffect
        </h2>
        <p>Check console for effect trigger</p>
      </div>
    </>
  )
}
