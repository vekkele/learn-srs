import type { FullWord } from "../types/ReviewQueue";

interface WordCardProps {
  word: FullWord;
}

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" })

const WordItem = ({ word }: WordCardProps) => {
  const translations = word.translations.map(t => t.translation).join(', ');

  return (
    <article className="flex text-white">
      <h3 className="flex-grow w-28 mr-4 font-bold text-lg capitalize">{word.word}</h3>
      <h5 className="flex-grow-[4] w-52 text-base text-neutral-300 capitalize">{translations}</h5>
      <h6 className="w-36 ml-2">{dateFormat.format(word.nextLearn)}</h6>
    </article>
  )
}

export default WordItem;