import React from 'react';
import styles from '../styles/components/button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  return (
    <button className={styles.buttonPrimary} {...props}>
      {children}
    </button>
  );
};

export default Button;
