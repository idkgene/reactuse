import React, { type InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: string;
  label?: string;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'error';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      error,
      label,
      size = 'default',
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'flex w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const sizeClasses = {
      default: 'h-10',
      sm: 'h-8 px-2 py-1 text-xs',
      lg: 'h-12 px-4 py-3 text-base',
    };

    const variantClasses = {
      default:
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring',
      error:
        'border-red-500 bg-red-50 ring-offset-red-50 placeholder:text-red-400 focus-visible:ring-red-500',
    };

    const inputClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    return (
      <div className="flex flex-col space-y-1">
        {label ? (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        ) : null}
        <input className={inputClasses} ref={ref} {...props} />
        {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
