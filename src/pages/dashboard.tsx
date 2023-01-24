import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AuthHeader from "../components/AuthHeader";
import WordList from "../components/WordList";

const Dashboard: NextPage = () => {
  useSession({ required: true });

  const linkClass = "p-6 bg-blue-600 hover:bg-blue-800 rounded-md transition text-xl text-white uppercase";

  return (
    <>
      <AuthHeader />
      <main className="flex flex-col items-center p-10">
        <div className="flex justify-center gap-3">
          <Link
            href="/card/add"
            className={linkClass}
          >
            Add Card
          </Link>

          <Link
            href="/review"
            className={linkClass}
          >
            Review
          </Link>
        </div>

        <WordList />
      </main>
    </>
  )
}

export default Dashboard;