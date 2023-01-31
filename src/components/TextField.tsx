import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextField = ({ label, className, ...props }: TextFieldProps) => {
  return (
    <label className="flex flex-col w-full">
      {label && (
        <span className="font-bold mb-2">
          {label}
        </span>
      )}
      <input
        className={clsx(
          className,
          "p-2 rounded-md border border-slate-300 text-neutral-900",
        )}
        {...props}
      />
    </label>
  );
}

export default TextField;