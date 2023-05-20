import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({
  onClick,
  disabled,
  children,
  className = "",
  type = "button",
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        className,
        "relative whitespace-nowrap rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white no-underline transition",
        {
          "cursor-not-allowed opacity-40": disabled,
          "hover:bg-blue-800": !disabled && !loading,
        }
      )}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      <div className={clsx({ "opacity-0": loading })}>{children}</div>
      {loading && (
        <Spinner className="absolute top-0 bottom-0 left-0 right-0 m-auto" />
      )}
    </button>
  );
};

export default Button;
