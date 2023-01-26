import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

const Button = ({ onClick, disabled, children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        className,
        disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-800',
        'bg-blue-600 rounded-lg px-5 py-3 font-semibold text-white no-underline transition',
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;