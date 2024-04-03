import useUnmount from '@/hooks/useUnmout';

export default function UnmountShowcase() {
  useUnmount(() => {
    console.log('useUnmount: Component is about to be unmounted!');
  });


  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useUnmount"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useUnmount
        </h2>
        <div>There&apos;s a message in the console indicating that the component is about to be unmounted.</div>
      </div>
    </>
  )
}
