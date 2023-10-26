import { create } from "zustand";
import { TBook } from "../types/book";
import { TTag } from "../types/tag";
type tagsState = {
  tags: TTag[] | null
}
type tagsAction = {
  setTags:(books: TBook[]) => void
}
const useTagsStore = create<tagsState & tagsAction >((set) => ({ 
  tags: null,
  setTags: (tags: TTag[]) => {
    set({ tags: tags });
  },
}));
export default useTagsStore;