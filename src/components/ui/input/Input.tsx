import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password';
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`block w-full px-2 py-1 border border-dark-border rounded-md text-xs text-accent-bg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${className || ''}`}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
