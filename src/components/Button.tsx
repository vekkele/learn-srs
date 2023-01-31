import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

const Button = ({
  onClick,
  disabled,
  children,
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        className,
        disabled ? "cursor-not-allowed opacity-40" : "hover:bg-blue-800",
        "rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white no-underline transition"
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
