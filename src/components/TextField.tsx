import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextField = ({ label, className, ...props }: TextFieldProps) => {
  return (
    <label className="flex flex-col">
      {label && (
        <span className="text-gray-900 dark:text-white font-bold mb-2">
          {label}
        </span>
      )}
      <input
        className={clsx(
          className,
          "p-2 rounded-md border border-slate-300",
        )}
        {...props}
      />
    </label>
  );
}

export default TextField;