import clsx from "clsx";
import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import AuthHeader from "../components/AuthHeader";
import ReviewForecast from "../components/ReviewForecast";
import WordsTable from "../components/WordsTable";
import { api } from "../utils/api";
import { checkAuthedSession } from "../utils/auth";
import { getServerTranslations } from "../utils/i18n";

const buttonClass = clsx(
  "py-5 px-4 bg-blue-600 hover:bg-blue-800 rounded-xl transition text-2xl text-white capitalize"
);

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const Dashboard: NextPage = () => {
  const { t } = useTranslation("dashboard");
  const { data: reviewsCount } = api.learn.getReviewsCount.useQuery();
  const { data: forecast } = api.learn.getReviewForecast.useQuery({ timezone });

  return (
    <>
      <AuthHeader />
      <main className="flex max-w-7xl flex-col items-center self-center md:m-10">
        <section className="flex w-full flex-col items-center justify-center md:flex-row md:items-start">
          <section className="mb-6 grid auto-cols-fr grid-flow-row gap-5 sm:grid-flow-col md:mr-auto">
            <Link
              href="/card/add"
              className={clsx(buttonClass, "flex flex-col items-center")}
            >
              {t("addWord")}
            </Link>

            <Link
              href="/review"
              className={clsx(buttonClass, "flex items-center justify-between")}
            >
              <h2>{t("reviews")}</h2>
              <h3 className="ml-4 rounded-full bg-blue-400 px-3 text-sm">
                {reviewsCount}
              </h3>
            </Link>
          </section>

          {forecast && <ReviewForecast forecast={forecast} />}
        </section>

        <WordsTable />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { redirect } = await checkAuthedSession(ctx);
  if (redirect) {
    return { redirect };
  }

  return {
    props: {
      ...(await getServerTranslations(ctx.locale, ["auth", "dashboard"])),
    },
  };
};

export default Dashboard;
