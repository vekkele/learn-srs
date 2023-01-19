import { type NextPage } from "next";
import MainLayout from "../components/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout >
      <main className="flex justify-center pt-12">
        <h1 className="text-3xl text-white">Learn With SRS</h1>
      </main>
    </MainLayout>
  );
};

export default Home;
