import { create } from "zustand";
import { TBook } from "../types/book";
type loadingState = {
  loading: boolean
}
type loadingActions = {
  setLoading:(loading: boolean) => void
}
const useBookStore = create<loadingState & loadingActions >((set) => ({
  loading: false,
  setLoading: (loading: boolean) => {
    set({ loading: true });
  },
}));
export default useBookStore;