import { useState } from "react";
import { api } from "../../utils/api";
import type { StageTitle } from "../../utils/stage";
import { getStageFromLevel, stageMap, stages } from "../../utils/stage";
import StageCard from "./StageCard";
import type { Word } from "./types";
import WordItem from "./WordItem";

type WordsByStages = Partial<Record<StageTitle, Word[]>>;

const wordsSelector = (words: Word[]) =>
  words.reduce<WordsByStages>((stagedWords, word) => {
    const stage = getStageFromLevel(word.stage.level);
    const stageWords = stagedWords[stage] ?? [];

    return { ...stagedWords, [stage]: [...stageWords, word] };
  }, {});

const WordsTable = () => {
  const [selectedStage, setSelectedStage] = useState<StageTitle | null>(null);
  const {
    data: words,
    isLoading,
    isError,
  } = api.learn.getWords.useQuery(undefined, {
    select: wordsSelector,
  });
  const selectedStageWords = selectedStage ? words?.[selectedStage] ?? [] : [];

  if (isLoading) {
    return <div className="mt-10">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-10">Something went wrong</div>;
  }

  return (
    <section className="my-5 flex flex-col items-center">
      <div className="grid auto-cols-fr grid-flow-col gap-4">
        {stages.map((stage) => {
          const count = words[stage.title]?.length ?? 0;
          const onClick = () => {
            setSelectedStage((prev) =>
              prev === stage.title ? null : stage.title
            );
          };

          return (
            <StageCard
              key={stage.title}
              title={stage.title}
              color={stage.color}
              wordsCount={count}
              onClick={onClick}
            />
          );
        })}
      </div>

      {selectedStage && selectedStageWords.length !== 0 && (
        <section
          style={{ backgroundColor: stageMap.get(selectedStage)?.color }}
          className="mt-3 w-full rounded-lg py-2 px-4"
        >
          {selectedStageWords?.map((word) => (
            <WordItem key={word.id} word={word} />
          ))}
        </section>
      )}
    </section>
  );
};

export default WordsTable;
