import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

const Dashboard: NextPage = () => {
  const { data: session } = useSession({ required: true });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-[#260f33]">
      <div>Dashboard</div>
      <div>{session?.user?.name}</div>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => void signOut({ callbackUrl: "/" })}>
        Sign Out
      </button>
    </main>
  )
}

export default Dashboard;