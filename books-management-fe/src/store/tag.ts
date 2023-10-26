import { create } from "zustand";
import { TTag } from "../types/tag";
type tagState = {
  selectedTag: TTag | null;
};
type tagAction = {
  setSelectedTag: (tag: TTag) => void;
};
const useTagStore = create<tagState & tagAction>((set) => ({
  selectedTag: null,
  setSelectedTag: (tag: TTag) => {
    set({ selectedTag: tag });
  },
}));
export default useTagStore;
