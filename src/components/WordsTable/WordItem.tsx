import type { Word } from "./types";

interface WordItemProps {
  word: Word;
}

const dateFormat = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

const WordItem = ({ word }: WordItemProps) => {
  const translations = word.translations.map((t) => t.translation).join(", ");

  return (
    <article className="flex text-white">
      <h3 className="mr-4 w-28 flex-grow text-lg font-bold capitalize">
        {word.word}
      </h3>
      <h5 className="w-52 flex-grow-[4] text-base capitalize text-neutral-300">
        {translations}
      </h5>
      <h6 className="ml-2 w-36">{dateFormat.format(word.nextLearn)}</h6>
    </article>
  );
};

export default WordItem;
