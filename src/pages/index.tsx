import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Button from "../components/Button";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data: sessionData } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-[#260f33]">
      <h1 className="text-3xl text-white">Learn With SRS</h1>

      <div className="flex flex-col items-center gap-2">
        <p>{sessionData?.user?.name}</p>
        <p className="text-2xl text-white">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
        <Button
          onClick={() => void signIn(undefined, { callbackUrl: '/dashboard' })}
        >
          Sign in
        </Button>
      </div>
    </main>
  );
};

export default Home;
