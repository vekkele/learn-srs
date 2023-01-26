import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextField = ({ label, className, ...props }: TextFieldProps) => {
  return (
    <label className="flex flex-col">
      {label && <span className="text-white mb-2">{label}</span>}
      <input
        className={clsx(
          className,
          "p-2 rounded-md",
        )}
        {...props}
      />
    </label>
  );
}

export default TextField;