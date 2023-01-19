import type { ButtonHTMLAttributes } from "react";

const Button = ({ onClick, children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`${className} rounded-lg bg-blue-600 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-800`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;