import { forwardRef, type InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => (
  <input
    ref={ref}
    className={`flex-1 px-4 py-2 border-none outline-none bg-transparent text-lg placeholder-gray-400 ${className}`}
    {...props}
  />
))

Input.displayName = 'Input'

