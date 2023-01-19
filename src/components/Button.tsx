import type { HtmlHTMLAttributes } from "react";

const Button = ({ onClick, children }: HtmlHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="rounded-full bg-blue-600 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-800"
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;