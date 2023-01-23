import { api } from "../utils/api";
import WordCard from "./WordCard";

const WordList = () => {
  const wordsResponse = api.learn.getWords.useQuery();

  if (wordsResponse.isLoading) {
    return <div>Word List Loading...</div>
  }

  const words = wordsResponse.data;
  if (!words) {
    return <div>Something went wrong fetching words</div>
  }

  return (
    <section className="flex flex-col items-center my-5">
      <h2 className="mb-2">Word List</h2>
      <div className="flex flex-wrap gap-2">
        {words.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>
    </section>
  );
}

export default WordList;