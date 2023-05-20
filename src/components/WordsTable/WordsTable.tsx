import { useState } from "react";
import { useTranslation } from "next-i18next";
import { api } from "../../utils/api";
import type { StageTitle } from "../../utils/stage";
import { getStageFromLevel, stageMap, stages } from "../../utils/stage";
import StageCard from "./StageCard";
import type { Word } from "./types";
import WordItem from "./WordItem";
import clsx from "clsx";

type WordsByStages = Partial<Record<StageTitle, Word[]>>;

const wordsSelector = (words: Word[]) =>
  words.reduce<WordsByStages>((stagedWords, word) => {
    const stage = getStageFromLevel(word.stage.level);
    const stageWords = stagedWords[stage] ?? [];

    return { ...stagedWords, [stage]: [...stageWords, word] };
  }, {});

const WordsTable = () => {
  const { t } = useTranslation();
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
    return <div className="mt-10">{t("loading")}</div>;
  }

  if (isError) {
    return <div className="mt-10">{t("generalError")}</div>;
  }

  return (
    <section className="my-5 flex w-full flex-col items-center">
      <div
        className={clsx(
          "flex w-full snap-x snap-mandatory gap-2 overflow-x-scroll whitespace-nowrap px-2",
          "sm:grid sm:auto-cols-fr sm:grid-flow-col",
          "md:gap-4 md:px-0"
        )}
      >
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
          className="mx-auto mt-3 w-[98%] rounded-lg py-2 px-4 md:w-full"
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
