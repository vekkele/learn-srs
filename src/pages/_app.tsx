import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import Head from "next/head";
import PageWrapper from "../components/PageWrapper";
import colors from "tailwindcss/colors";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Learn With SRS</title>
        <meta name="description" content="Generated by create-t3-app" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content={colors.slate[900]} key="theme-color-dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content={colors.slate[50]} key="theme-color-light" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
