import clsx from "clsx";
import { useMemo, useState } from "react";
import { api } from "../utils/api";
import type { StageTitle } from "../utils/stage";
import { getStageFromLevel } from "../utils/stage";
import { stages } from "../utils/stage";
import WordCard from "./WordCard";

const WordList = () => {
  const wordsResponse = api.learn.getWords.useQuery(undefined, {
    select: (words) => words.map((w) => ({
      ...w, stage: {
        ...w.stage,
        title: getStageFromLevel(w.stage.level)
      }
    }))
  });
  const [selectedStage, setSelectedStage] = useState<StageTitle | null>(null);

  const stagesCount = useMemo(() => {
    const words = wordsResponse.data;

    return stages.map((stage) => {
      return {
        ...stage,
        count: words?.reduce(
          (prev, w) =>
            w.stage.title === stage.title
              ? prev + 1
              : prev,
          0
        ) ?? 0
      }
    });
  }, [wordsResponse.data]);

  const selectedStageWords = useMemo(() =>
    wordsResponse.data?.filter((word) => word.stage.title === selectedStage),
    [selectedStage, wordsResponse.data]
  );

  if (wordsResponse.isLoading) {
    return <div>Word List Loading...</div>
  }

  return (
    <section className="flex flex-col items-center my-5">
      <h2 className="mb-2">Word List</h2>
      <div className="grid grid-flow-col auto-cols-fr gap-4 flex-wrap">
        {stagesCount.map(stage => (
          <div
            key={stage.title}
            onClick={() => setSelectedStage(prev => prev === stage.title ? null : stage.title)}
            className={clsx(
              stage.bg,
              'flex flex-col items-center py-4 px-10 rounded-lg text-white select-none',
              { 'cursor-pointer': stage.count }
            )}
          >
            <h3 className="font-bold text-2xl mb-1">{stage.count}</h3>
            <h5 className="text-md text-neutral-300 capitalize">{stage.title}</h5>
          </div>
        ))}
      </div>
      {selectedStage && (
        <section className="w-full mt-3">
          {selectedStageWords?.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </section>
      )}
    </section>
  );
}

export default WordList;