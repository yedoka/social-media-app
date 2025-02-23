import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'; 
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;      
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  type = 'button',
  className,
  onClick, 
  children, 
  disabled = false 
}) => {
  return (
    <button 
      type={type} 
      className={`bg-primary text-primary-text font-semibold text-sm py-2 px-8 rounded-md transition-colors hover:bg-blue-700 ${className || ''}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
