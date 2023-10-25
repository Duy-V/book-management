import { create } from "zustand";
import { TBook } from "../types/book";
type bookState = {
  selectedBook: TBook | null
}
type bookActions = {
  setSelectedBook:(book: TBook) => void
}
const useBookStore = create<bookState & bookActions >((set) => ({
  selectedBook: null,
  setSelectedBook: (book: TBook) => {
    set({ selectedBook: book });
  },
}));
export default useBookStore;