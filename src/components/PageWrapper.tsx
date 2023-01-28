import type { ReactNode } from "react"

type PageWrapperProps = {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-neutral-900 dark:text-white">
      {children}
    </div>
  );
}

export default PageWrapper;