import React from 'react';
import { cn } from "../utils";

const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  ...props 
}, ref) => {
  const variantStyles = {
    default: 'bg-purple-500 text-white hover:bg-purple-600',
    outline: 'border border-purple-500 text-purple-500 hover:bg-purple-50',
    ghost: 'hover:bg-gray-100'
  };

  const sizeStyles = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-2 py-1 text-xs',
    lg: 'px-6 py-3 text-md'
  };

  return (
    <button
      ref={ref}
      className={cn(
        'rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button };