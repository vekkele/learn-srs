import type { ButtonHTMLAttributes } from "react";

const Button = ({ onClick, disabled, children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const disabledStyles = 'opacity-40 cursor-not-allowed';
  const regularStyles = 'hover:bg-blue-800';

  return (
    <button
      className={`${className} ${disabled ? disabledStyles : regularStyles} bg-blue-600 rounded-lg  px-10 py-3 font-semibold text-white no-underline transition `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;