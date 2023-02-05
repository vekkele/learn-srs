import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import { getServerAuthSession } from "../server/auth";

export type AuthedSession = Session & Required<Pick<Session, "user">>;

const isAuthed = (session: Session | null): session is AuthedSession => {
  return !!session?.user;
};

export const checkAuthedSession = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  type Result = GetServerSidePropsResult<unknown>;

  if (!isAuthed(session)) {
    return {
      redirect: {
        destination: `/api/auth/signin?error=SessionRequired&callbackUrl=${ctx.resolvedUrl}`,
        permanent: false,
      },
    } satisfies Result;
  }

  return { props: { session } } satisfies Result;
};
