import { useDocumentReadyState } from '@hooks/useDocumentReadyState'

export default function DocumentReadyShowCase() {
  const readyState = useDocumentReadyState()

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useDocumentReadyState"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useDocumentReadyState
        </h2>
        <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Current ready state: {readyState}
        </p>
        {readyState === 'loading' && <p>⌛ The document is still loading.</p>}
        {readyState === 'interactive' && (
          <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            🕹️ The document has finished parsing but is still loading
            sub-resources.
          </p>
        )}
        {readyState === 'complete' && (
          <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            ✅ The document and all sub-resources have finished loading.
          </p>
        )}
      </div>
    </>
  )
}
