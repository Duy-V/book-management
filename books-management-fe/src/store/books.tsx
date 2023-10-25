import { create } from "zustand";
import { TBook } from "../types/book";
type booksState = {
  books: TBook[] | null
}
type booksActions = {
  setBooks:(books: TBook[]) => void
}
const useBooksStore = create<booksState & booksActions >((set) => ({
  books: null,
  setBooks: (books: TBook[]) => {
    set({ books: books });
  },
}));
export default useBooksStore;