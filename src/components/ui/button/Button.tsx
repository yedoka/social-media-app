import React from 'react';
import './Button.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'; 
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;      
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  type = 'button', 
  className = '', 
  onClick, 
  children, 
  disabled = false 
}) => {
  return (
    <button 
      type={type} 
      className={`button ${className}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
