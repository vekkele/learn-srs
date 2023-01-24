import type { GetServerSideProps } from "next";
import { type NextPage } from "next";
import AuthHeader from "../components/AuthHeader";
import { getServerAuthSession } from "../server/auth";

const Home: NextPage = () => {
  return (
    <>
      <AuthHeader />
      <main className="flex justify-center pt-12">
        <h1 className="text-3xl text-white">Learn With SRS</h1>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: true,
      },
    };
  }

  return { props: {} };
};

export default Home;
