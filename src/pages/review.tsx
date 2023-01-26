import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage
} from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { prisma } from "../server/db";
import ReviewQueue from "../types/ReviewQueue";
import { api } from "../utils/api";
import { checkAuthedSession } from "../utils/auth";

type ReviewPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const getInputColor = (correct: boolean | null) => {
  if (correct === null) {
    return 'bg-white';
  }

  return correct ? 'bg-green-600' : 'bg-red-600'
}

const ReviewPage: NextPage<ReviewPageProps> = ({ words }) => {
  const [queue, setQueue] = useState(() => ReviewQueue.from(words))
  const [correct, setCorrect] = useState<null | boolean>(null);
  const [guess, setGuess] = useState("");
  const [infoVisible, setInfoVisible] = useState(false);
  const router = useRouter();
  const mutation = api.learn.updateStage.useMutation();
  const answered = correct !== null;
  const word = queue.next;
  const toggleInfoVisible = () => setInfoVisible(visible => !visible);

  useEffect(() => {
    if (queue.isEmpty) {
      router.push('/dashboard').catch(e => {
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
      })
    }

    setQueue(v => new ReviewQueue(correct ? v.handleCorrect() : v.handleIncorrect()))
    setCorrect(null);
    setGuess("");
  }

  return (
    <main className="flex flex-col h-full grow">
      <section className="flex justify-center items-center h-[50vh] w-full bg-purple-600">
        <h1 className="text-7xl text-white uppercase">{word?.word}</h1>
      </section>
      <section className="flex items-start grow">
        <div className="flex flex-col items-center w-full">
          <div className="relative w-3/4 -translate-y-1/2">
            <input
              type="text"
              name="guess"
              readOnly={answered}
              className={`w-full px-2 py-4 text-xl rounded-xl text-center ${getInputColor(correct)}`}
              value={guess}
              placeholder="Enter one of translations"
              onChange={(e) => setGuess(e.target.value)}
            />

            <button className="absolute w-12 h-12 rounded-full top-0 bottom-0 ml-2 my-auto bg-slate-600 text-white" onClick={check}>{'>>'}</button>
          </div>

          <Button disabled={!answered} onClick={toggleInfoVisible}>Show Info</Button>
          {infoVisible && (
            <section className="bg-slate-400 py-4 px-6 my-3 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Translations</h2>
              {word?.translations.map(t => (
                <h2 key={t.translation}>{t.translation}</h2>
              ))}
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { redirect, session } = await checkAuthedSession(ctx);
  if (redirect) {
    return { redirect };
  }

  const words = await prisma.word.findMany({
    where: {
      userId: session.user.id,
      nextLearn: {
        lte: new Date()
      }
    },
    include: {
      stage: {
        select: {
          level: true,
        }
      },
      translations: {
        select: {
          translation: true,
        }
      },
    }
  });

  return {
    props: {
      words
    }
  }
}

export default ReviewPage;