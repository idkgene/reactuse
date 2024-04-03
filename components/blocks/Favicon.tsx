import Alert from '@ui-components/alert'

export default function FaviconShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useFavicon"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useFavicon
        </h2>
        <Alert
          id="useFavicon"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
