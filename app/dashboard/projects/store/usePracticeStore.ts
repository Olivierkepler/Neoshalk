"use client";

import { create } from "zustand";

// 1. Define the types for our new store
type PracticeStore = {
  textToStudy: string | null;
  setTextToStudy: (text: string) => void;
  clearTextToStudy: () => void;
};

// 2. Create the store
export const usePracticeStore = create<PracticeStore>((set) => ({
  // 3. This is the "global variable" in memory.
  // It's null by default and will be gone on refresh.
  textToStudy: null,

  // 4. This is the action the "Study" button will call.
  // It puts the note text into the "mailbox".
  setTextToStudy: (text) => set({ textToStudy: text }),

  // 5. This is the action the PracticeTestModule will call.
  // It empties the "mailbox" so it's ready for the next note.
  clearTextToStudy: () => set({ textToStudy: null }),
}));
