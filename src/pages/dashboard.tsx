import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import MainLayout from "../components/MainLayout";

const Dashboard: NextPage = () => {
  useSession({ required: true });

  return (
    <MainLayout>
      <main className="flex justify-center p-10">
        <Link
          href="/card/add"
          className="p-6 bg-blue-600 hover:bg-blue-800 rounded-md transition text-xl text-white uppercase"
        >
          Add Card
        </Link>
      </main>
    </MainLayout>
  )
}

export default Dashboard;