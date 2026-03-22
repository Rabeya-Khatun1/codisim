import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string; 
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button 
      {...props}
      className={`
        bg-primary 
        text-slate-900 
        font-bold 
        px-6 
        py-3 
        rounded-xl 
        hover:opacity-90 
        active:scale-95 
        transition-all 
        duration-200 
        shadow-lg 
        shadow-primary/20 
        flex 
        items-center 
        justify-center 
        gap-2
        ${className} 
      `}
    >
      {children}
    </button>
  );
}