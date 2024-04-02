import React from 'react'

interface AlertProps {
  id: string
  message: string
}

const Alert: React.FC<AlertProps> = ({ id, message }) => (
  <div
    id={id}
    className="mt-6 gap-4 rounded-lg border flex items-center py-2 px-4 contrast-more:border-current contrast-more:dark:border-current border-orange-100 bg-orange-50 text-orange-800 dark:border-orange-400/30 dark:bg-orange-400/30 dark:text-orange-300 border-solid"
  >
    <div className="text-xl pl-1 px-1 select-none">💡</div>
    <div className="w-full min-w-0 leading-7">
      <p className="mt-6 leading-7 first:mt-0">{message}</p>
    </div>
  </div>
)

export default Alert
