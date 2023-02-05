import clsx from "clsx";
import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import AuthHeader from "../components/AuthHeader";
import WordsTable from "../components/WordsTable";
import { api } from "../utils/api";
import { checkAuthedSession } from "../utils/auth";
import { getServerTranslations } from "../utils/i18n";

const buttonClass = clsx(
  "py-5 px-4 bg-blue-600 hover:bg-blue-800 rounded-xl transition text-2xl text-white capitalize"
);

const Dashboard: NextPage = () => {
  const { t } = useTranslation("dashboard");
  const { data: reviewsCount } = api.learn.getReviewsCount.useQuery();

  return (
    <>
      <AuthHeader />
      <main className="flex flex-col items-center p-10">
        <div className="grid auto-cols-fr grid-flow-col gap-5">
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
        </div>

        <WordsTable />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await checkAuthedSession(ctx);
  if (props.redirect) {
    return props;
  }

  return {
    props: {
      ...(await getServerTranslations(ctx.locale, ["auth", "dashboard"])),
    },
  };
};

export default Dashboard;
