import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Button from "./Button";

const AuthHeader = () => {
  const { data: session } = useSession();
  const { t } = useTranslation("auth");

  const handleSignIn = () =>
    void signIn(undefined, { callbackUrl: "/dashboard" });
  const handleSignOut = () => void signOut({ callbackUrl: "/" });

  return (
    <header className="flex items-center justify-end px-4 py-3">
      {session ? (
        <Button onClick={handleSignOut}>{t("signOut")}</Button>
      ) : (
        <Button onClick={handleSignIn}>{t("signIn")}</Button>
      )}
    </header>
  );
};

export default AuthHeader;
