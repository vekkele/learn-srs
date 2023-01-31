import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";

const AuthHeader = () => {
  const { data: session } = useSession();

  const authButton = session ? (
    <Button onClick={() => void signOut({ callbackUrl: "/" })}>Sign Out</Button>
  ) : (
    <Button
      onClick={() => void signIn(undefined, { callbackUrl: "/dashboard" })}
    >
      Sign in
    </Button>
  );

  return (
    <header className="flex items-center justify-end px-4 py-3">
      {authButton}
    </header>
  );
};

export default AuthHeader;
