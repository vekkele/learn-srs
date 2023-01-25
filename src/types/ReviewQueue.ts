import type { RouterOutputs } from "../utils/api";

export type FullWord = RouterOutputs['learn']['getWords'][number];

export interface ReviewingWord extends FullWord {
  incorrectAnswers: number;
}

export default class ReviewQueue {
  constructor(
    private readonly words: ReviewingWord[]
  ) { }

  static from(words: FullWord[]) {
    return new ReviewQueue(words.map(w => ({ ...w, incorrectAnswers: 0 })))
  }

  get next() {
    return this.words[0];
  }

  get isEmpty() {
    return this.words.length === 0;
  }

  checkCorrect = (guess: string) => {
    const word = this.next;
    if (!word) return false;

    const normalizedGuess = guess.trim().toLowerCase();

    return word.translations.some(
      t => t.translation.toLowerCase() === normalizedGuess
    );
  }

  handleCorrect = () => {
    return this.words.slice(1);
  }

  handleIncorrect = () => {
    const [word, ...rest] = this.words;
    if (!word) return this.words;

    return [...rest, { ...word, incorrectAnswers: word.incorrectAnswers + 1 }];
  }
}