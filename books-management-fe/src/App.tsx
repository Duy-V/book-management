import { Button } from "@material-tailwind/react";
import BookList from "./components/BookList";
import { useEffect, useState } from "react";
import TagForm from "./components/TagForm";
import BookForm from "./components/BookForm";
import { useLoading } from "./hooks/useLoading";
import { TBook } from "./types/book";
import axiosClient from "./services/axios-client";
import useBookStore from "./store/book";
import useFormModalStore from "./store/form-modal";
import useBooksStore from "./store/books";
import { useItems } from "./hooks/useItems";
import { If, Then } from "react-if";
type FormType = "tag" | "book" | null;

function App() {
  // const {books, setBooks} = useBooksStore();
  // const [books, setBooks] = useState<TBook[]>([]);
  // const [loading, { showLoading, hideLoading }] = useLoading();
  const { selectedBook } = useBookStore();
  const { form, setForm } = useFormModalStore();
  const { books, fetchBooks } = useItems();

  useEffect(() => {
    fetchBooks();
  }, []);
  const handleSelectForm = (form: FormType) => () => {
    setForm(form);
  };

  const handleCloseBookForm = () => {
    setForm(null);
  };

  return (
    <div className="min-h-screen bg-blue-gray-200">
      <div className="container py-8 mx-auto space-y-4">
        <div className="flex gap-4">
          <Button color="blue" onClick={handleSelectForm("tag")}>
            Create New Tag
          </Button>
          <Button color="green" onClick={handleSelectForm("book")}>
            Create New Book
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <BookList books={books} />
          </div>
          <div className="col-span-4 space-y-2">
            <If condition={form === "tag"}>
              <Then>
                <TagForm onCancel={handleSelectForm(null)} />
              </Then>
            </If>
            <If condition={form === "book"}>
              <Then>
                <BookForm
                  onFetchBooks={fetchBooks}
                  onCancel={handleSelectForm(null)}
                  book={selectedBook}
                  onClose={handleCloseBookForm}
                />
              </Then>
            </If>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
