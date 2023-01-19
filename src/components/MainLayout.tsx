import type { ReactNode } from "react";
import AuthHeader from "./AuthHeader";
import PageWrapper from "./PageWrapper";

type MainLayoutProps = {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <PageWrapper>
      <AuthHeader />
      {children}
    </PageWrapper>
  );
}

export default MainLayout;