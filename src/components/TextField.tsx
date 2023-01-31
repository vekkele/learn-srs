import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextField = ({ label, className, ...props }: TextFieldProps) => {
  return (
    <label className="flex w-full flex-col">
      {label && <span className="mb-2 font-bold">{label}</span>}
      <input
        className={clsx(
          className,
          "rounded-md border border-slate-300 p-2 text-neutral-900"
        )}
        {...props}
      />
    </label>
  );
};

export default TextField;
