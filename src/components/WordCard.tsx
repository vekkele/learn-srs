import type { FullWord } from "../types/ReviewQueue";

interface WordCardProps {
  word: FullWord;
}

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" })

const WordCard = ({ word }: WordCardProps) => {
  return (
    <article className="bg-blue-400/40 px-5 py-4 rounded-md text-white">
      <h3>Word: {word.word}</h3>

      <div>
        <h3>Translations:</h3>
        <div className="flex flex-wrap">
          {word.translations.map(t => (
            <h4 key={t.translation}>{t.translation}</h4>
          ))}
        </div>
      </div>

      <h5>Next Review: {dateFormat.format(word.nextLearn)}</h5>
    </article>
  )
}

export default WordCard;