import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 font-ubuntu rounded-lg transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}