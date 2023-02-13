import type { ReactNode } from "react";
import LanguageSwitch from "./LanguageSwitch";

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="relative flex min-h-screen min-w-min flex-col items-stretch bg-slate-50 text-neutral-900 dark:bg-slate-900 dark:text-white">
      {children}
      <LanguageSwitch className="absolute bottom-3 right-4" />
    </div>
  );
};

export default PageWrapper;
