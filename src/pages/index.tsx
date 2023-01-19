import { type NextPage } from "next";
import AuthHeader from "../components/AuthHeader";

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

export default Home;
