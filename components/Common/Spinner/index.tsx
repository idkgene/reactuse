export default function Spinner() {
  return (
    <>
      <div className="spinner_wrapper">
        <div className="spinner">
          <div className="spinner">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="spinner_bar" />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
