import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";

const AuthHeader = () => {
  const { data: session } = useSession();

  const handleSignIn = () =>
    void signIn(undefined, { callbackUrl: "/dashboard" });
  const handleSignOut = () => void signOut({ callbackUrl: "/" });

  return (
    <header className="flex items-center justify-end px-4 py-3">
      {session ? (
        <Button onClick={handleSignOut}>Sign Out</Button>
      ) : (
        <Button onClick={handleSignIn}>Sign in</Button>
      )}
    </header>
  );
};

export default AuthHeader;
