import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "../components/Button";

const Dashboard: NextPage = () => {
  useSession({ required: true });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-[#260f33]">
      <header className="flex items-center justify-end px-4 py-3">
        <Button
          onClick={() => void signOut({ callbackUrl: "/" })}>
          Sign Out
        </Button>
      </header>
      <main className="flex justify-center p-10">
        <Link
          href="/card/add"
          className="p-6 bg-blue-600 hover:bg-blue-800 rounded-md transition text-xl text-white uppercase"
        >
          Add Card
        </Link>
      </main>
    </div>
  )
}

export default Dashboard;