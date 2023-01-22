import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import { api } from "../../utils/api";

const AddPage: NextPage = () => {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const mutation = api.learn.addWord.useMutation();
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutation.mutateAsync({ word, translation });
    router.back();
  };

  return (
    <main className="p-12">
      <form
        className="flex flex-col"
        onSubmit={(e) => void onSubmit(e)}
      >
        <label>
          <p>Word</p>
          <input
            id="word-input"
            name="word"
            type="text"
            className="mb-6"
            onChange={(e) => setWord(e.target.value)}
          />
        </label>
        <label>
          <p>Translation</p>
          <input
            id="translation-input"
            name="translation"
            type="text"
            className="mb-6"
            onChange={(e) => setTranslation(e.target.value)}
          />
        </label>
        <div>
          <Button
            type="button"
            className="mr-3"
            onClick={() => void router.push('/dashboard')}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </main>
  )
}

export default AddPage;