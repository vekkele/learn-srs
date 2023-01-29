import clsx from "clsx";
import { useState } from "react";
import type { RouterOutputs } from "../utils/api";
import { api } from "../utils/api";
import type { StageTitle } from "../utils/stage";
import { getStageFromLevel, stageMap, stages } from "../utils/stage";
import WordItem from "./WordItem";

type Words = RouterOutputs['learn']['getWords'];
type WordsByStages = Partial<Record<StageTitle, Words>>;

const wordsSelector = (words: Words) => words.reduce<WordsByStages>(
  (stagedWords, word) => {
    const stage = getStageFromLevel(word.stage.level);
    const stageWords = stagedWords[stage] ?? [];

    return { ...stagedWords, [stage]: [...stageWords, word] }
  },
  {}
);

const WordList = () => {
  const [selectedStage, setSelectedStage] = useState<StageTitle | null>(null);
  const { data: words, isLoading } = api.learn.getWords.useQuery(undefined, {
    select: wordsSelector,
  });
  const selectedStageWords = selectedStage ? words?.[selectedStage] ?? [] : [];

  if (isLoading) {
    return <div className="mt-10">Loading...</div>
  }

  if (!words) {
    return <div className="mt-10">Something went wrong</div>
  }

  return (
    <section className="flex flex-col items-center my-5">
      <div className="grid grid-flow-col auto-cols-fr gap-4">
        {stages.map(stage => {
          const count = words[stage.title]?.length ?? 0;

          return (
            <div
              key={stage.title}
              onClick={() => setSelectedStage(prev => prev === stage.title ? null : stage.title)}
              style={{ backgroundColor: stage.color }}
              className={clsx(
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
      {selectedStage && selectedStageWords.length !== 0 && (
        <section
          style={{ backgroundColor: stageMap.get(selectedStage)?.color }}
          className='w-full mt-3 py-2 px-4 rounded-lg'
        >
          {selectedStageWords?.map((word) => (
            <WordItem key={word.id} word={word} />
          ))}
        </section>
      )}
    </section>
  );
}

export default WordList;