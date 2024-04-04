import clsx from 'clsx'
import React from 'react'

interface AlertProps {
  id: string
  type?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'default'
  icon?: React.ReactNode
  message: string
}

const Alert: React.FC<AlertProps> = ({
  id,
  type = 'default',
  icon,
  message,
}) => {
  const getIconAndStyles = (
    type: AlertProps['type'],
  ): { icon: React.ReactNode; styles: string } => {
    switch (type) {
      case 'primary':
        return {
          icon: '💠',
          styles:
            'border-blue-100 bg-blue-50 text-blue-800 dark:border-blue-400/30 dark:bg-blue-400/30 dark:text-blue-300',
        }
      case 'secondary':
        return {
          icon: '🔘',
          styles:
            'border-gray-100 bg-gray-50 text-gray-800 dark:border-gray-400/30 dark:bg-gray-400/30 dark:text-gray-300',
        }
      case 'success':
        return {
          icon: '✅',
          styles:
            'border-green-100 bg-green-50 text-green-800 dark:border-green-400/30 dark:bg-green-400/30 dark:text-green-300',
        }
      case 'danger':
        return {
          icon: '❌',
          styles:
            'border-red-100 bg-red-50 text-red-800 dark:border-red-400/30 dark:bg-red-400/30 dark:text-red-300',
        }
      case 'warning':
        return {
          icon: '⚠️',
          styles:
            'border-yellow-100 bg-yellow-50 text-yellow-800 dark:border-yellow-400/30 dark:bg-yellow-400/30 dark:text-yellow-300',
        }
      case 'info':
        return {
          icon: 'ℹ️',
          styles:
            'border-cyan-100 bg-cyan-50 text-cyan-800 dark:border-cyan-400/30 dark:bg-cyan-400/30 dark:text-cyan-300',
        }
      case 'light':
        return {
          icon: '☀️',
          styles:
            'border-white bg-white text-gray-800 dark:border-gray-400/30 dark:bg-gray-400/30 dark:text-gray-300',
        }
      case 'dark':
        return { icon: '🌙', styles: 'border-gray-800 bg-gray-800 text-white' }
      default:
        return {
          icon: '💡',
          styles:
            'border-orange-100 bg-orange-50 text-orange-800 dark:border-orange-400/30 dark:bg-orange-400/30 dark:text-orange-300',
        }
    }
  }

  const { icon: defaultIcon, styles } = getIconAndStyles(type)

  return (
    <div
      id={id}
      className={clsx(
        'mt-6 gap-4 rounded-lg border flex items-center py-2 px-4 contrast-more:border-current contrast-more:dark:border-current',
        styles,
      )}
    >
      {(icon || defaultIcon) && (
        <span className="mr-2">{icon || defaultIcon}</span>
      )}
      {message}
    </div>
  )
}

export default Alert
