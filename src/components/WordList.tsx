import clsx from "clsx";
import { useState } from "react";
import type { RouterOutputs } from "../utils/api";
import { api } from "../utils/api";
import type { StageTitle } from "../utils/stage";
import { getStageFromLevel } from "../utils/stage";
import { stages } from "../utils/stage";
import WordItem from "./WordItem";

type Words = RouterOutputs['learn']['getWords'];

const stagedWordsSelector = (words: Words) => words.reduce(
  (stagedWords, word) => {
    const stage = getStageFromLevel(word.stage.level);
    const stageWords = stagedWords[stage] ?? [];

    return { ...stagedWords, [stage]: [...stageWords, word] }
  },
  {} as Partial<Record<StageTitle, Words>>
);

const WordList = () => {
  const stagedWordsResponse = api.learn.getWords.useQuery(undefined, {
    select: stagedWordsSelector,
  });
  const [selectedStage, setSelectedStage] = useState<StageTitle | null>(null);
  const selectedStageWords = selectedStage ? stagedWordsResponse.data?.[selectedStage] : [];

  if (stagedWordsResponse.isLoading) {
    return <div className="my-5">Word List Loading...</div>
  }

  return (
    <section className="flex flex-col items-center my-5">
      <h2 className="mb-2">Word List</h2>
      <div className="grid grid-flow-col auto-cols-fr gap-4 flex-wrap">
        {stages.map(stage => {
          const count = stagedWordsResponse.data?.[stage.title]?.length ?? 0;

          return (
            <div
              key={stage.title}
              onClick={() => setSelectedStage(prev => prev === stage.title ? null : stage.title)}
              className={clsx(
                stage.bg,
                'flex flex-col items-center py-4 px-10 rounded-lg text-white select-none',
                { 'cursor-pointer': count }
              )}
            >
              <h3 className="font-bold text-2xl mb-1">{count}</h3>
              <h5 className="text-md text-neutral-300 capitalize">{stage.title}</h5>
            </div>
          )
        })}
      </div>
      {selectedStage && (
        <section className="w-full mt-3">
          {selectedStageWords?.map((word) => (
            <WordItem key={word.id} word={word} />
          ))}
        </section>
      )}
    </section>
  );
}

export default WordList;