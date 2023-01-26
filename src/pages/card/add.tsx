import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
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
        className="flex flex-col max-w-sm"
        onSubmit={(e) => void onSubmit(e)}
      >
        <TextField
          label="Word"
          name="word"
          className="mb-6"
          placeholder="Enter a word you want to learn"
          onChange={(e) => setWord(e.target.value)}
        />
        <TextField
          name="translation"
          label="Translation"
          className="mb-6"
          placeholder="Enter a word translation"
          onChange={(e) => setTranslation(e.target.value)}
        />
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