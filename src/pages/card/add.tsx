import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { api } from "../../utils/api";

const AddPage: NextPage = () => {
  const [word, setWord] = useState("");
  const [translations, setTranslations] = useState<string[]>([""]);
  const mutation = api.learn.addWord.useMutation();
  const router = useRouter();

  const filledTranslations = translations.reduce<string[]>((prev, t) => {
    const trimmed = t.trim();
    return trimmed.length === 0 ? prev : [...prev, trimmed];
  }, []);
  const canSubmit = filledTranslations.length !== 0 && !!word;

  const removeTranslation = (i: number) => {
    setTranslations((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
  };

  const changeTranslation = (value: string, i: number) => {
    setTranslations((prev) => {
      let changed = [...prev.slice(0, i), value, ...prev.slice(i + 1)];
      if (i === translations.length - 1) {
        changed = [...changed, ""];
      }

      return changed;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await mutation.mutateAsync({ word, translations: filledTranslations });
      router.back();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="p-12">
      <form
        className="flex max-w-sm flex-col"
        onSubmit={(e) => void onSubmit(e)}
      >
        <TextField
          label="Word"
          name="word"
          className="mb-6"
          placeholder="Enter a word you want to learn"
          onChange={(e) => setWord(e.target.value)}
          required
        />
        <h3 className="mb-2 font-bold">Translations</h3>
        {translations.map((translation, i) => (
          <div key={i} className="mb-4 flex items-center">
            <TextField
              name="translation"
              value={translation}
              placeholder="Enter a word translation"
              onChange={(e) => changeTranslation(e.target.value, i)}
            />
            {translations.length > 1 && (
              <button
                className="ml-2 rounded-md bg-red-500 py-1 px-3 text-white"
                type="button"
                onClick={() => removeTranslation(i)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div>
          <Button
            className="mr-3"
            onClick={() => void router.push("/dashboard")}
          >
            Cancel
          </Button>
          <Button disabled={!canSubmit} type="submit">
            Save
          </Button>
        </div>
      </form>
    </main>
  );
};

export default AddPage;
