import styles from './index.module.css'

export default function Spinner() {
  return (
    <>
      <div className="spinner_wrapper">
        <div className={styles.spinner}>
          <div className={styles.spinner}>
            {[...Array(12)].map((_, index) => (
              <div key={index} className={styles.spinner_bar} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
