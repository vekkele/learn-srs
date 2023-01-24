import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextPage
} from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getServerAuthSession } from "../server/auth";
import { prisma } from "../server/db";
import ReviewQueue from "../types/ReviewQueue";

type ReviewPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ReviewPage: NextPage<ReviewPageProps> = ({ words }) => {
  const [queue, setQueue] = useState(() => ReviewQueue.from(words))
  const [correct, setCorrect] = useState<null | boolean>(null);
  const [guess, setGuess] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (queue.isEmpty) {
      router.push('/dashboard').catch(e => {
        console.error(e);
      });
    }
  }, [queue.isEmpty, router]);

  const check = () => {
    if (correct === null) {
      if (!guess.trim()) return;

      const correct = queue.checkCorrect(guess);
      setCorrect(correct);
      return;
    }

    if (correct) {
      //TODO: call api to rise the stage
    }

    setQueue(v => new ReviewQueue(correct ? v.handleCorrect() : v.handleIncorrect()))
    setCorrect(null);
  }


  return (
    <main>
      <div>Try to guess: {queue.next?.word}</div>
      <div>{queue.next?.translations[0]?.translation}</div>
      <div>Incorrect: {queue.next?.incorrectAnswers}</div>

      <input type="text" name="guess" onChange={(e) => setGuess(e.target.value)} />
      {correct !== null && <div>{correct ? "correct" : "incorrect"}</div>}
      <button className="block" onClick={check}>next</button>
    </main>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  const userId = session?.user?.id;
  if (!userId) {
    return {
      redirect: {
        destination: `/api/auth/signin?error=SessionRequired&callbackUrl=${ctx.resolvedUrl}`,
        permanent: false,
      },
    } satisfies GetServerSidePropsResult<unknown>
  }

  const words = await prisma.word.findMany({
    where: {
      userId,
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