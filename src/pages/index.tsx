import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import Button from "../components/Button";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-900 to-[#260f33]">
      <header className="flex justify-end px-4 py-3">
        <Button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => void signIn(undefined, { callbackUrl: '/dashboard' })}
        >
          Sign in
        </Button>
      </header>
      <main className="flex justify-center pt-12">
        <h1 className="text-3xl text-white">Learn With SRS</h1>
      </main>
    </div>
  );
};

export default Home;
