interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyles = 'p-4 m-4 mt-2 px-6 py-2 font-semibold rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants: Record<string, string> = {
    primary: 'bg-gray-600 text-white hover:bg-gray-700',
    secondary: 'bg-gray-300 text-black hover:bg-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-gray-100 text-black hover:bg-gray-300'
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
