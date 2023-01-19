import type { NextPage } from "next";
import Router from "next/router";
import Button from "../../components/Button";

const AddPage: NextPage = () => {
  return (
    <main className="p-12">
      <form
        className="flex flex-col"
      >
        <label>
          <p>Word</p>
          <input className="mb-6" type="text" name="word" id="word-input" />
        </label>
        <label>
          <p>Translation</p>
          <input className="mb-6" type="text" name="translation" id="translation-input" />
        </label>
        <div>
          <Button
            type="button"
            className="mr-3"
            onClick={() => void Router.push('/dashboard')}
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