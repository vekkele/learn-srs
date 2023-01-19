import type { ReactNode } from "react"

type PageWrapperProps = {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-[#260f33]">
      {children}
    </div>
  );
}

export default PageWrapper;