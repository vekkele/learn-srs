import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

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
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => void signIn(undefined, { callbackUrl: '/dashboard' })}
        >
          Sign in
        </button>
      </div>
    </main>
  );
};

export default Home;
