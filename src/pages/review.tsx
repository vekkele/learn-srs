import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { createTRPCCaller } from "../server/api/root";
import ReviewQueue from "../types/ReviewQueue";
import { api } from "../utils/api";
import { checkAuthedSession } from "../utils/auth";
import { stageMap } from "../utils/stage";
import Button from "../components/Button";
import { useTranslation } from "next-i18next";
import { getServerTranslations } from "../utils/i18n";

type ReviewPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ReviewPage: NextPage<ReviewPageProps> = ({ words }) => {
  const { t } = useTranslation("review");
  const [queue, setQueue] = useState(() => ReviewQueue.from(words));
  const [correct, setCorrect] = useState<null | boolean>(null);
  const [guess, setGuess] = useState("");
  const [infoVisible, setInfoVisible] = useState(false);
  const router = useRouter();
  const mutation = api.learn.updateStage.useMutation();
  const answered = correct !== null;
  const word = queue.next;
  const toggleInfoVisible = () => setInfoVisible((visible) => !visible);
  const stageColor = (word && stageMap.get(word.stage.title))?.color;

  useEffect(() => {
    if (queue.isEmpty) {
      router.push("/dashboard").catch((e) => {
        console.error(e);
      });
    }
  }, [queue.isEmpty, router]);

  const check = () => {
    if (!queue.next) return;

    if (correct === null) {
      if (!guess.trim()) return;

      const correct = queue.checkCorrect(guess);
      setCorrect(correct);
      return;
    }

    if (correct) {
      const word = queue.next;

      mutation.mutate({
        wordId: word.id,
        incorrectAnswers: word.incorrectAnswers,
      });
    }

    setQueue(
      (v) => new ReviewQueue(correct ? v.handleCorrect() : v.handleIncorrect())
    );
    setCorrect(null);
    setGuess("");
  };

  return (
    <>
      <Head>
        <meta name="theme-color" content={stageColor} key="theme-color-light" />
        <meta name="theme-color" content={stageColor} key="theme-color-dark" />
      </Head>
      <main className="flex h-full grow flex-col">
        <section
          style={{ backgroundColor: stageColor }}
          className="flex h-[50vh] w-full items-center justify-center"
        >
          <h1 className="text-7xl uppercase text-white">{word?.word}</h1>
        </section>
        <section className="flex grow items-start">
          <div className="flex w-full flex-col items-center">
            <div className="relative w-3/4 -translate-y-1/2">
              <input
                type="text"
                name="guess"
                readOnly={answered}
                value={guess}
                placeholder={t("translationPlaceholder")}
                onChange={(e) => setGuess(e.target.value)}
                className={clsx(
                  "w-full rounded-xl border px-2 py-4 text-center text-xl text-neutral-900",
                  {
                    "border-slate-300 bg-white": correct === null,
                    "border-green-800 bg-green-600": correct === true,
                    "border-red-800 bg-red-600": correct === false,
                  }
                )}
              />

              <button
                className="absolute top-0 bottom-0 my-auto ml-2 h-12 w-12 rounded-full bg-slate-600 text-white"
                onClick={check}
              >
                {">>"}
              </button>
            </div>

            <Button disabled={!answered} onClick={toggleInfoVisible}>
              {t("showInfo")}
            </Button>
            {infoVisible && (
              <section className="my-3 rounded-lg bg-slate-200 py-4 px-6 dark:bg-slate-800">
                <h2 className="mb-2 text-xl font-bold">{t("translations")}</h2>
                {word?.translations.map((t) => (
                  <h2 key={t.translation}>{t.translation}</h2>
                ))}
              </section>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { redirect } = await checkAuthedSession(ctx);
  if (redirect) {
    return { redirect };
  }

  const trpc = await createTRPCCaller(ctx);
  const words = await trpc.learn.getReviewWords();
  const translations = await getServerTranslations(ctx.locale, ["review"]);

  return { props: { ...translations, words } };
};

export default ReviewPage;
