import type { ReactNode } from "react";
import LanguageSwitch from "./LanguageSwitch";
import clsx from "clsx";

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div
      className={clsx(
        "relative flex min-h-screen flex-col items-stretch",
        "bg-slate-50 text-neutral-900",
        "dark:bg-slate-900 dark:text-white"
      )}
    >
      {children}
      <LanguageSwitch className="absolute bottom-3 right-4" />
    </div>
  );
};

export default PageWrapper;
