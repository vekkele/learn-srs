import clsx from "clsx";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import AuthHeader from "../components/AuthHeader";
import WordList from "../components/WordList";
import { api } from "../utils/api";
import { checkAuthedSession } from "../utils/auth";

const buttonClass = clsx(
  "py-5 px-4 bg-blue-600 hover:bg-blue-800 rounded-xl transition text-2xl text-white capitalize"
);

const Dashboard: NextPage = () => {
  const { data: reviewsCount } = api.learn.getReviewsCount.useQuery();

  return (
    <>
      <AuthHeader />
      <main className="flex flex-col items-center p-10">
        <div className="grid grid-flow-col auto-cols-fr gap-5">
          <Link
            href="/card/add"
            className={clsx(
              buttonClass,
              'flex flex-col items-center'
            )}
          >
            Add Word
          </Link>

          <Link
            href="/review"
            className={clsx(
              buttonClass,
              'flex justify-between items-center'
            )}
          >
            <h2>Reviews</h2>
            <h3 className="px-3 ml-4 bg-blue-400 rounded-full text-sm">
              {reviewsCount}
            </h3>
          </Link>
        </div>

        <WordList />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await checkAuthedSession(ctx);
  if (props.redirect) {
    return props;
  }

  return { props: {} };
}

export default Dashboard;