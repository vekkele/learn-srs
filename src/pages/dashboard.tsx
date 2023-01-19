import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import Button from "../components/Button";

const Dashboard: NextPage = () => {
  const { data: session } = useSession({ required: true });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-[#260f33]">
      <div>Dashboard</div>
      <div>{session?.user?.name}</div>
      <Button
        onClick={() => void signOut({ callbackUrl: "/" })}>
        Sign Out
      </Button>
    </main>
  )
}

export default Dashboard;